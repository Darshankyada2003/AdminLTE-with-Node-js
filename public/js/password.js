document.getElementById('toggle-password').addEventListener('click', function () {
    const passwordInput = document.getElementById('password-input');
    const toggleIcon = document.getElementById('toggle-icon');
    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        toggleIcon.classList.remove('fa-eye');
        toggleIcon.classList.add('fa-eye-slash');
    } else {
        passwordInput.type = "password";
        toggleIcon.classList.remove('fa-eye-slash');
        toggleIcon.classList.add('fa-eye')
    }
})

document.getElementById('toggle-confirmPassword').addEventListener('click', function () {

    const confirmPasswordInput = document.getElementById('confirmPassword-Input');
    const toggleIcon = document.getElementById('toggle-confirmPasswordIcon');
    if (confirmPasswordInput.type === "password") {
        confirmPasswordInput.type = 'text';
        toggleIcon.classList.remove('fa-eye');
        toggleIcon.classList.add('fa-eye-slash')
    } else {
        confirmPasswordInput.type = "password";
        toggleIcon.classList.remove('fa-eye-slash');
        toggleIcon.classList.add('fa-eye')
    }
})