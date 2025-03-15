document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('studentLoginForm');
    const errorAlert = document.getElementById('errorAlert');
    const registerLink = document.getElementById('registerLink');
    const forgotPasswordLink = document.getElementById('forgotPassword');

    // Handle login form submission
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {
            const response = await fetch('http://localhost:3000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 
                    email, 
                    password,
                    role: 'student' // Specify role for student login
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Login failed');
            }

            // Store token and user data
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));

            // Redirect to student dashboard
            window.location.href = 'student-dashboard.html';
        } catch (error) {
            errorAlert.textContent = error.message;
            errorAlert.style.display = 'block';
        }
    });

    // Handle register link click
    registerLink.addEventListener('click', (e) => {
        e.preventDefault();
        // Redirect to registration page
        window.location.href = 'student-register.html';
    });

    // Handle forgot password link click
    forgotPasswordLink.addEventListener('click', (e) => {
        e.preventDefault();
        // Implement forgot password functionality
        alert('Forgot password functionality will be implemented soon.');
    });

    // Check if user is already logged in
    const token = localStorage.getItem('token');
    if (token) {
        window.location.href = 'student-dashboard.html';
    }
}); 