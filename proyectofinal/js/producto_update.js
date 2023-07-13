const app = Vue.createApp({
  data() {
    return {
      producto: {
        id: '',
        nombre: '',
        descripcion: '',
        precio: '',
        stock: '',
        imagenUrl: '',
        imagenPreview: '',
      },
      error: false,
    };
  },
  methods: {
    handleFileUpload(event) {
      const file = event.target.files[0];
      this.producto.imagenUrl = URL.createObjectURL(file);
      this.producto.imagenPreview = this.producto.imagenUrl;
    },
    actualizar() {
      const productoActualizado = {
        id: this.producto.id,
        nombre: this.producto.nombre,
        descripcion: this.producto.descripcion,
        precio: this.producto.precio,
        stock: this.producto.stock,
        imagen: this.producto.imagenUrl,
      };

      fetch(`http://mviktoriau.pythonanywhere.com/amigurumi/${productoActualizado.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productoActualizado),
      })
        .then(response => response.json())
        .then(data => {
          console.log('Producto actualizado:', data);
          // Aquí puedes realizar acciones adicionales después de actualizar el producto, como mostrar un mensaje de éxito o redirigir a otra página.
        })
        .catch(error => {
          console.error('Error al actualizar el producto:', error);
        });
    },
  },
});

app.mount('#app');
