document.addEventListener("DOMContentLoaded", function () {
    const toggleclose = document.getElementById('alert_box');
    const alertBox = document.getElementById('toggle_close')

    if (toggleclose && alertBox) {
        toggleclose.addEventListener('click', function () {
            alertBox.remove();
        })
    }
})