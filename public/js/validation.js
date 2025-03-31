$(document).ready(function () {
    const loginForm = $("#LoginForm");
    const RegisterForm = $("#RegisterForm");

    loginForm.validate({
        rules: {
            email: {
                required: true,
            },
            password: {
                required: true
            }
        },
        messages: {
            email: {
                required: "Email is required"
            },
            password: {
                required: "Password is required"
            }
        },
        errorPlacement: function (error, element) {
            error.insertAfter(element.closest(".input-group"));
        }
    });

    RegisterForm.validate({
        rules: {
            fullName: {
                required: true
            },
            email: {
                required: true
            },
            password: {
                required: true
            },
            confirmPassword: {
                required: true
            },
            terms: {
                required: true
            }
        },
        messages: {
            fullName: {
                required: "Name is required"
            },
            email: {
                required: "Email is required"
            },
            password: {
                required: "Password is required"
            },
            confirmPassword: {
                required: "ConfirmPassword is required"
            },
            terms: {
                required: "Agree is required"
            }
        },
        errorPlacement: function (error, element) {
            error.insertAfter(element.closest('.input-group'));
        }
    })
});