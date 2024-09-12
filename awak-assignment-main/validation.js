document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('login-form');
    const emailInput = document.getElementById('email-input');
    const passwordInput = document.getElementById('password-input');
    const errorMessage = document.getElementById('error-message');
    const loadingSpinner = document.getElementById('loading');
    const togglePassword = document.getElementById('togglePassword');

    // Show/Hide Password Functionality
    togglePassword.addEventListener('click', () => {
        const type = passwordInput.type === 'password' ? 'text' : 'password';
        passwordInput.type = type;
    });

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Basic client-side validation
        let isValid = true;
        errorMessage.textContent = '';

        if (!emailInput.value || !/\S+@\S+\.\S+/.test(emailInput.value)) {
            errorMessage.textContent = 'Please enter a valid email address.';
            isValid = false;
        }

        if (!passwordInput.value || passwordInput.value.length < 6) {
            errorMessage.textContent = 'Password must be at least 6 characters long.';
            isValid = false;
        }

        if (isValid) {
            // Show loading spinner
            loadingSpinner.style.display = 'block';

            // API request
            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        username: emailInput.value,
                        password: passwordInput.value
                    })
                });

                if (response.ok) {
                    const data = await response.json();
                    errorMessage.textContent = 'Login successful!';
                } else {
                    errorMessage.textContent = 'Login failed. Please try again.';
                }
            } catch (error) {
                errorMessage.textContent = 'An error occurred. Please try again.';
            } finally {
                // Hide loading spinner
                loadingSpinner.style.display = 'none';
            }
        }
    });
});
