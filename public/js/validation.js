$(document).ready(function () {
    const loginForm = $("#LoginForm");

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
});