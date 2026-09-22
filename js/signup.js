document.getElementById('signupForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    // Get form values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const age = document.getElementById('age').value;
    const gender = document.getElementById('gender').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    // Check password match
    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }
      // Check age
    if (age < 1 || age > 120) {
        alert("Please enter a valid age.");
        return;
    }

    // Check gender
    if (!gender) {
        alert("Please select your gender.");
        return;
    }

    try {
        // Send signup data to Flask backend
        const response = await fetch("http://127.0.0.1:5000/api/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: name,
                email: email,
                age: age,
                gender: gender,
                password: password
            })
        });

        const data = await response.json();

        if (data.success) {

            // Show success message
            document.getElementById('signupMsg').style.display = 'block';

            // Clear form
            this.reset();

        } else {

            // Show backend error
            alert(data.message);
        }

    } catch (error) {

        console.error("Signup error:", error);

        alert("Unable to connect to the server. Please make sure Flask is running.");
    }
});