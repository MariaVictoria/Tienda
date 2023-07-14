import appModal from './modal.js';

const { createApp } = Vue
//var endPoint = 'https://mviktoriau.pythonanywhere.com/';
//var endPoint = 'http://127.0.0.1:5000/';
createApp({
    data() {

        return {
            datos: '',
            amigurumi: [],
            url: endPoint+'/amigurumi', // si ya lo subieron a pythonanywhere
            error: false,
            cargando: true,
            /*atributos para el guardar los valores del formulario */
            id: 0,
            nombre: "",
            imagen: "",
            stock: 0,
            precio: 0,
            modalImageURL:''
        }
    },
    methods: {
        fetchData(url) {
            fetch(url)

                .then(response => response.json())
                .then(data => {
                    this.amigurumi = data;
                    this.cargando = false
                })
                .catch(err => {
                    console.error(err);
                    this.error = true
                })
        },

        eliminar(amigurumi) {
            const url = this.url + '/' + amigurumi;
            var options = {
                method: 'DELETE',
            }
            fetch(url, options)
                .then(res => res.text()) // or res.json()
                .then(res => {
                    location.reload();
                })
        },
        grabar() {
            let amigurumi = {
                nombre: this.nombre,
                precio: this.precio,
                stock: this.stock,
                imagen: this.imagen
            }
            var options = {
                body: JSON.stringify(amigurumi),
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                redirect: 'follow'
            }
            fetch(this.url, options)
                .then(function () {
                    alert("Registro grabado")
                    window.location.href = "./productos.html";
                })
                .catch(err => {
                    console.error(err);
                    alert("Error al Grabarr")

                })
        },
        openModal(imageURL) {
            // Actualizar la URL de la imagen en el modal
            document.getElementById('modalImage').src = imageURL;
        
            // Obtener el elemento del modal
            var modalElement = document.getElementById('imageModal');
        
            // Mostrar el modal
            modalElement.classList.add('show');
            modalElement.style.display = 'block';
            document.body.classList.add('modal-open');
        
            // Remover la clase 'show' y ocultar el modal al hacer clic fuera de él
            modalElement.addEventListener('click', function(event) {
              if (event.target === modalElement) {
                modalElement.classList.remove('show');
                modalElement.style.display = 'none';
                document.body.classList.remove('modal-open');
              }
            });
          }
    },
    created() {
        this.fetchData(this.url)
    },
})
.component('image-modal', appModal.component('image-modal'))
/*
.component('image-modal', {
    template: `
      <div id="imageModal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="imageModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-body">
              <img id="modalImage" :src="imageURL" alt="Modal Image">
            </div>
          </div>
        </div>
      </div>
    `,
    props: ['imageURL']
  })*/
  .mount('#app')