$(document).ready(function () {
    const loginForm = $("#LoginForm");
    const RegisterForm = $("#RegisterForm");
    const ChangePassword = $("#ChangePasswordForm");
    const ForgotPassword = $("#ForgotPasswordForm")

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
            f_name: {
                required: true
            },
            email: {
                required: true
            },
            password: {
                required: true,
                minlength: 6
            },
            confirmPassword: {
                required: true,
                equalTo: "#password-input"
            },
            terms: {
                required: true
            }
        },
        messages: {
            f_name: {
                required: "Name is required"
            },
            email: {
                required: "Email is required"
            },
            password: {
                required: "Password is required",
                minlength: "Your password must be at least 6 characters long"
            },
            confirmPassword: {
                required: "ConfirmPassword is required",
                equalTo: "Password does not match"
            },
            terms: {
                required: "Agree is required"
            }
        },
        errorPlacement: function (error, element) {
            error.insertAfter(element.closest('.input-group'));
        }
    });

    ChangePassword.validate({
        rules: {
            password: {
                required: true,
                minlength: 6
            },
            confirmPassword: {
                required: true,
                equalTo: "#password-input"
            }
        },
        messages: {
            password: {
                required: "Password is required",
                minlength: "Your password must be at least 6 characters long"
            },
            confirmPassword: {
                required: "ConfirmPassword is required",
                equalTo: "Password does not match"
            }
        },
        errorPlacement: function (error, element) {
            error.insertAfter(element.closest('.input-group'));
        }
    });

    ForgotPassword.validate({
        rules: {
            email: {
                required: true
            }
        },
        messages: {
            email: {
                required: "Email is required"
            }
        },
        errorPlacement: function (error, element) {
            error.insertAfter(element.closest(".input-group"));
        }
    })
});