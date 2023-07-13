const form = document.getElementById('form-js');
const nombre = document.getElementById('nombre-form');
const apellido = document.getElementById('apellido-form');
const email = document.getElementById('email-1-form');
const email2 = document.getElementById('email-2-form');
const mensaje = document.getElementById('mensaje-form');
const letrasValidas = /^[a-zA-Z\s]+$/
const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

form.addEventListener('submit', (e)=>{
  e.preventDefault();

  if (!letrasValidas.test(nombre.value) || !letrasValidas.test(apellido.value)) {
    alert('Por favor ingrese solo letras para nombre y apellido');
    return;
  }

  if (!emailValido.test(email.value) || email.value !== email2.value) {
    alert('Ingrese un correo electrónico válido y asegúrese de que los dos campos sean iguales');
    return;
  }  
     
  Swal.fire({
    position: 'top-end',
    icon: 'success',
    title: 'Formulario enviado',
    text:'Nos contactaremos a la brevedad',
    showConfirmButton: false,
    timer: 2000
  }).then(() => {
    form.submit();     
  });

});