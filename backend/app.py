from flask import Flask, request
from flask_cors import CORS
from db import get_db_connection

app = Flask(__name__)

CORS(app)


# =========================
# HOME
# =========================

@app.route("/")
def home():
    return "HealthyHabitHub Backend is Running!"


# =========================
# TEST DATABASE
# =========================

@app.route("/api/test-db")
def test_database():

    try:
        connection = get_db_connection()
        cursor = connection.cursor()

        cursor.execute("SELECT COUNT(*) FROM users")

        result = cursor.fetchone()

        cursor.close()
        connection.close()

        return {
            "success": True,
            "message": "Database connected successfully!",
            "user_count": result[0]
        }

    except Exception as e:

        return {
            "success": False,
            "error": str(e)
        }, 500


# =========================
# SIGNUP API
# =========================

@app.route("/api/signup", methods=["POST"])
def signup():

    try:
        data = request.get_json()

        name = data.get("name")
        email = data.get("email")
        password = data.get("password")
        age = data.get("age")
        gender = data.get("gender")

        if not name or not email or not password:
            return {
                "success": False,
                "message": "Name, email and password are required."
            }, 400

        connection = get_db_connection()
        cursor = connection.cursor()

        cursor.execute(
            "SELECT user_id FROM users WHERE email = %s",
            (email,)
        )

        existing_user = cursor.fetchone()

        if existing_user:

            cursor.close()
            connection.close()

            return {
                "success": False,
                "message": "Email already registered."
            }, 409

        query = """
            INSERT INTO users (name, email, password, age, gender)
            VALUES (%s, %s, %s, %s, %s)
        """

        values = (name, email, password, age, gender)

        cursor.execute(query, values)

        connection.commit()

        cursor.close()
        connection.close()

        return {
            "success": True,
            "message": "Signup successful!"
        }, 201

    except Exception as e:

        return {
            "success": False,
            "message": str(e)
        }, 500


# =========================
# LOGIN API
# =========================

@app.route("/api/login", methods=["POST"])
def login():

    try:
        data = request.get_json()

        email = data.get("email")
        password = data.get("password")

        if not email or not password:
            return {
                "success": False,
                "message": "Email and password are required."
            }, 400

        connection = get_db_connection()

        cursor = connection.cursor(dictionary=True)

        cursor.execute(
            """
            SELECT user_id, name, email, age, gender, password
            FROM users
            WHERE email = %s
            """,
            (email,)
        )

        user = cursor.fetchone()

        cursor.close()
        connection.close()

        if not user:

            return {
                "success": False,
                "message": "Invalid email or password."
            }, 401

        if user["password"] != password:

            return {
                "success": False,
                "message": "Invalid email or password."
            }, 401

        # Don't send password to browser
        user.pop("password")

        return {
            "success": True,
            "message": "Login successful!",
            "user": user
        }, 200

    except Exception as e:

        return {
            "success": False,
            "message": str(e)
        }, 500


# =========================
# UPDATE PROFILE API
# =========================

@app.route("/api/update-profile", methods=["PUT"])
def update_profile():

    try:
        data = request.get_json()

        user_id = data.get("user_id")
        name = data.get("name")
        email = data.get("email")
        age = data.get("age")
        gender = data.get("gender")

        if not user_id or not name or not email or not age or not gender:

            return {
                "success": False,
                "message": "All fields are required."
            }, 400

        connection = get_db_connection()
        cursor = connection.cursor()

        # Check duplicate email
        cursor.execute(
            """
            SELECT user_id
            FROM users
            WHERE email = %s AND user_id != %s
            """,
            (email, user_id)
        )

        existing_user = cursor.fetchone()

        if existing_user:

            cursor.close()
            connection.close()

            return {
                "success": False,
                "message": "This email is already registered."
            }, 409

        # Update profile
        cursor.execute(
            """
            UPDATE users
            SET name = %s,
                email = %s,
                age = %s,
                gender = %s
            WHERE user_id = %s
            """,
            (name, email, age, gender, user_id)
        )

        connection.commit()

        cursor.close()
        connection.close()

        return {
            "success": True,
            "message": "Profile updated successfully!"
        }, 200

    except Exception as e:

        return {
            "success": False,
            "message": str(e)
        }, 500


# =========================
# CHANGE PASSWORD API
# =========================

@app.route("/api/change-password", methods=["PUT"])
def change_password():

    try:
        data = request.get_json()

        user_id = data.get("user_id")
        current_password = data.get("current_password")
        new_password = data.get("new_password")

        if not user_id or not current_password or not new_password:

            return {
                "success": False,
                "message": "All password fields are required."
            }, 400

        connection = get_db_connection()

        cursor = connection.cursor(dictionary=True)

        # Get current password
        cursor.execute(
            """
            SELECT password
            FROM users
            WHERE user_id = %s
            """,
            (user_id,)
        )

        user = cursor.fetchone()

        if not user:

            cursor.close()
            connection.close()

            return {
                "success": False,
                "message": "User not found."
            }, 404

        # Check current password
        if user["password"] != current_password:

            cursor.close()
            connection.close()

            return {
                "success": False,
                "message": "Current password is incorrect."
            }, 401

        # Update password
        cursor.execute(
            """
            UPDATE users
            SET password = %s
            WHERE user_id = %s
            """,
            (new_password, user_id)
        )

        connection.commit()

        cursor.close()
        connection.close()

        return {
            "success": True,
            "message": "Password changed successfully!"
        }, 200

    except Exception as e:

        return {
            "success": False,
            "message": str(e)
        }, 500


# =========================
# START SERVER
# =========================

if __name__ == "__main__":
    app.run(debug=True, port=5000)