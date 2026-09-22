document.addEventListener('DOMContentLoaded', function () {

    const userData = localStorage.getItem('user');

    if (!userData) {
        alert('Please login first.');
        window.location.href = 'login.html';
        return;
    }

    let user = JSON.parse(userData);


    // =========================
    // Display Profile
    // =========================

    function displayProfile() {

        document.getElementById('profileName').textContent =
            user.name || 'Not available';

        document.getElementById('profileEmail').textContent =
            user.email || 'Not available';

        document.getElementById('profileAge').textContent =
            user.age || 'Not available';

        document.getElementById('profileGender').textContent =
            user.gender || 'Not available';
    }

    displayProfile();


    // =========================
    // Elements
    // =========================

    const editBtn = document.getElementById('editBtn');
    const editForm = document.getElementById('editForm');

    const editName = document.getElementById('editName');
    const editEmail = document.getElementById('editEmail');
    const editAge = document.getElementById('editAge');
    const editGender = document.getElementById('editGender');

    const saveBtn = document.getElementById('saveBtn');
    const cancelBtn = document.getElementById('cancelBtn');

    const profileMsg = document.getElementById('profileMsg');


    // =========================
    // Open Edit Form
    // =========================

    editBtn.addEventListener('click', function () {

        editName.value = user.name || '';
        editEmail.value = user.email || '';
        editAge.value = user.age || '';
        editGender.value = user.gender || '';

        editForm.style.display = 'block';
        editBtn.style.display = 'none';
    });


    // =========================
    // Cancel Editing
    // =========================

    cancelBtn.addEventListener('click', function () {

        editForm.style.display = 'none';
        editBtn.style.display = 'block';

        profileMsg.textContent = '';
    });
    
    
    // =========================
    // Change Password Elements
    // =========================

    const changePasswordBtn =
      document.getElementById('changePasswordBtn');

    const passwordForm =
      document.getElementById('passwordForm');

    const currentPassword =
      document.getElementById('currentPassword');

    const newPassword =
      document.getElementById('newPassword');

    const confirmPassword =
      document.getElementById('confirmPassword');

    const passwordSaveBtn =
      document.getElementById('passwordSaveBtn');

    const passwordCancelBtn =
      document.getElementById('passwordCancelBtn');

    const passwordMsg =
      document.getElementById('passwordMsg');


   // =========================
   // Open Password Form
   // =========================

   changePasswordBtn.addEventListener('click', function () {

    passwordForm.style.display = 'block';

    changePasswordBtn.style.display = 'none';

    });


    // =========================
   // Cancel Password Change
   // =========================

    passwordCancelBtn.addEventListener('click', function () {

    passwordForm.style.display = 'none';

    changePasswordBtn.style.display = 'block';

    currentPassword.value = '';
    newPassword.value = '';
    confirmPassword.value = '';

    passwordMsg.textContent = '';

   });


   // =========================
   // Save New Password
   // =========================

   passwordSaveBtn.addEventListener('click', async function () {

    const current = currentPassword.value;
    const newPass = newPassword.value;
    const confirm = confirmPassword.value;


    // Check fields
    if (!current || !newPass || !confirm) {

        passwordMsg.textContent =
            'Please fill all fields.';

        passwordMsg.style.color = 'red';

        return;
    }


    // Check password length
    if (newPass.length < 6) {

        passwordMsg.textContent =
            'New password must be at least 6 characters.';

        passwordMsg.style.color = 'red';

        return;
    }


    // Check confirmation
    if (newPass !== confirm) {

        passwordMsg.textContent =
            'New passwords do not match.';

        passwordMsg.style.color = 'red';

        return;
    }


    try {

        const response = await fetch(
            'http://127.0.0.1:5000/api/change-password',
            {
                method: 'PUT',

                headers: {
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify({
                    user_id: user.user_id,
                    current_password: current,
                    new_password: newPass
                })
            }
        );


        const data = await response.json();


        if (response.ok) {

            passwordMsg.textContent =
                'Password changed successfully! ✓';

            passwordMsg.style.color = 'green';


            currentPassword.value = '';
            newPassword.value = '';
            confirmPassword.value = '';


            setTimeout(() => {

                passwordForm.style.display = 'none';

                changePasswordBtn.style.display = 'block';

                passwordMsg.textContent = '';

            }, 1500);


        } else {

            passwordMsg.textContent =
                data.message || 'Unable to change password.';

            passwordMsg.style.color = 'red';
        }


    } catch (error) {

        console.error('Password change error:', error);

        passwordMsg.textContent =
            'Unable to connect to server.';

        passwordMsg.style.color = 'red';
    }

   });



    // =========================
    // Save Changes
    // =========================

    saveBtn.addEventListener('click', async function () {

        const name = editName.value.trim();
        const email = editEmail.value.trim();
        const age = editAge.value;
        const gender = editGender.value;


        // Check fields
        if (!name || !email || !age || !gender) {

            profileMsg.textContent =
                'Please fill all fields.';

            profileMsg.style.color = 'red';

            return;
        }


        try {

            const response = await fetch(
                'http://127.0.0.1:5000/api/update-profile',
                {
                    method: 'PUT',

                    headers: {
                        'Content-Type': 'application/json'
                    },

                    body: JSON.stringify({
                        user_id: user.user_id,
                        name: name,
                        email: email,
                        age: age,
                        gender: gender
                    })
                }
            );


            const data = await response.json();


            // =========================
            // Successful Update
            // =========================

            if (response.ok) {

                // Update local user information
                user.name = name;
                user.email = email;
                user.age = age;
                user.gender = gender;


                // Save updated user in localStorage
                localStorage.setItem(
                    'user',
                    JSON.stringify(user)
                );


                // Update profile display
                displayProfile();


                profileMsg.textContent =
                    'Profile updated successfully! ✓';

                profileMsg.style.color = 'green';


                // Close form after 1.2 seconds
                setTimeout(() => {

                    editForm.style.display = 'none';
                    editBtn.style.display = 'block';
                    profileMsg.textContent = '';

                }, 1200);


            } else {

                profileMsg.textContent =
                    data.message || 'Unable to update profile.';

                profileMsg.style.color = 'red';
            }


        } catch (error) {

            console.error('Profile update error:', error);

            profileMsg.textContent =
                'Unable to connect to server.';

            profileMsg.style.color = 'red';
        }

    });


    // =========================
    // Logout
    // =========================

    document.getElementById('logoutBtn')
        .addEventListener('click', function () {

            localStorage.removeItem('user');

            alert('You have been logged out.');

            window.location.href = 'login.html';

        });

});


