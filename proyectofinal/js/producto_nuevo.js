var id = location.search.substr(4)
let valorid=document.getElementById("id")
valorid.innerHTML=`${id}`;
const { createApp } = Vue
const app = Vue.createApp({
  data() {
    return {
      producto: {
        nombre: '',
        descripcion: '',
        precio: '',
        stock: '',
        imagenUrl: '',
        imagenPreview: '',
      },
      url: 'http://mviktoriau.pythonanywhere.com/amigurumi',
    };
  },
  methods: {
    handleFileUpload(event) {
      const file = event.target.files[0];
      this.producto.imagenUrl = URL.createObjectURL(file);
      this.producto.imagenPreview = this.producto.imagenUrl;
    },
    grabar() {
      const nuevoProducto = {
        nombre: this.producto.nombre,
        descripcion: this.producto.descripcion,
        precio: this.producto.precio,
        stock: this.producto.stock,
        imagenUrl: this.producto.imagenUrl,
      };

      axios
        .post(this.url, nuevoProducto)
        .then(response => {
          console.log('Nuevo producto registrado:', response.data);
        
        })
        .catch(error => {
          console.error('Error al registrar el producto:', error);
        });
    },
  },
});

app.mount('#app');
