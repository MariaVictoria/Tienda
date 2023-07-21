const { createApp } = Vue
createApp({
    data() {
        return {
          
      productos: [], // Tu lista de productos
      url: 'http://localhost:5000/producto', // URL de la API del servidor
      tipo: "",
      nombre: "",
      descripcion: "",
      disponibilidad: "",
      precio: 0,
      imagen: "",
      editandoProducto: null // Variable para almacenar temporalmente el producto que se está editando
    };
  },
  methods: {
    fetchData(url) {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                this.productos = data;
                this.cargando = false
            })
            .catch(err => {
                console.error(err);
                this.error = true
            })
    },

    eliminar(producto) {
      const url = this.url + '/'+producto.idproducto; // Corregir para obtener el idproducto
      var options = {
        method: 'DELETE',
      };
      fetch(url, options)
        .then(res => res.json()
        .then(res => {
          location.reload();
        })
        .catch(error => {
          console.error('Error al eliminar el producto:', error);
          alert("Error al eliminar el producto");
        })
      

    grabar() {
      const productoNuevo = {
        tipo: this.tipo,
        nombre: this.nombre,
        descripcion: this.descripcion,
        disponibilidad: this.disponibilidad,
        precio: this.precio,
        imagen: this.imagenUrl, // Corregir el nombre de la propiedad imagen
        codigo: '' // Agregar el campo código o quitarlo si no es necesario
      };

      fetch(this.url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productoNuevo),
      })
        .then(response => response.json())
        .then(data => {
          console.log('Producto nuevo ingresado:', data);
          alert("Producto nuevo ingresado con éxito.");
          this.fetchInitialData();
          // Restablecer los campos del formulario
          this.tipo = "";
          this.nombre = "";
          this.descripcion = "";
          this.disponibilidad = "";
          this.precio = 0;
          this.imagenUrl = "";
        })
        .catch(error => {
          console.error('Error al grabar el producto:', error);
          alert("Error al grabar el producto");
        });
    },
    editarProducto(producto) {
      this.editandoProducto = { ...producto };
    },
    guardarCambios() {
      if (this.editandoProducto) {
        fetch(`${this.url}/${this.editandoProducto.idproducto}`, { // Corregir para obtener el idproducto
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(this.editandoProducto),
        })
          .then(response => response.json())
          .then(data => {
            console.log('Producto editado:', data);
            alert("Producto editado con éxito.");
            this.fetchInitialData();
            this.cancelarEdicion();
          })
          .catch(error => {
            console.error('Error al editar el producto:', error);
            alert("Error al editar el producto");
          });
      }
    },
    cancelarEdicion() {
      this.editandoProducto = null;
    }
  },
  created() {
    this.fetchInitialData();
  }
});

app.mount('#app');
