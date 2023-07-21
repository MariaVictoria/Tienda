function ir() {

    var u = "elena";
    var c = "Raton1234";
    if (document.form.password.value == c && document.form.login.value == u) {
        alert('Bienvenida Vicky');
        window.location.href = 'panel_administracion.html';
    } else {
        alert('Por favor, ingresa los datos correctos.');
    }
}
