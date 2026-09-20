document.getElementById('signupForm').addEventListener('submit', function(e){
    e.preventDefault();

    // Validate password match
    const password = document.getElementById('password').value;
    const confirm = document.getElementById('confirmPassword').value;

    if(password !== confirm){
        alert("Passwords do not match!");
        return;
    }

    // Show success message
    document.getElementById('signupMsg').style.display = 'block';

    // Clear form
    this.reset();
});        