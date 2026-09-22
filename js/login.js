document.getElementById('loginForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    const loginMsg = document.getElementById('loginMsg');

    try {
        const response = await fetch('http://127.0.0.1:5000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        });

        const data = await response.json();

        if (response.ok) {
            loginMsg.textContent = 'Login successful! 🌿';
            loginMsg.style.color = 'green';
            loginMsg.style.display = 'block';

            // Save logged-in user's information
            localStorage.setItem('user', JSON.stringify(data.user));

            // Redirect to home page
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1000);

        } else {
            loginMsg.textContent = data.message || 'Invalid email or password.';
            loginMsg.style.color = 'red';
            loginMsg.style.display = 'block';
        }

    } catch (error) {
        console.error('Login error:', error);

        loginMsg.textContent = 'Unable to connect to server.';
        loginMsg.style.color = 'red';
        loginMsg.style.display = 'block';
    }
});