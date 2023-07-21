const app = Vue.createApp({
    data() {
        return {
            productos: [], // Tu lista de productos
            url: 'http://localhost:5000/producto', // URL de la API del servidor
            tipo: "",
            nombre: "",
            descripcion: "",
            disponibilidad: "",
            precio: 0,
            imagenUrl: "",
            editandoProducto: null // Variable para almacenar temporalmente el producto que se está editando
        };
    },
    methods: {
      // Función para manejar la carga de una imagen desde el input file
      handleFileUpload(event) {
        const file = event.target.files[0];
        this.imagenUrl = URL.createObjectURL(file);
        // Puedes agregar lógica adicional para subir la imagen al servidor si lo deseas
      },
  
      // Función para crear un nuevo producto
      grabar() {
        const productoNuevo = {
          tipo: this.tipo,
          nombre: this.nombre,
          descripcion: this.descripcion,
          disponibilidad: this.disponibilidad,
          precio: this.precio,
          imagen: this.imagenUrl,
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
          this.fetchData();
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
      fetchData() {
        fetch(this.url)
            .then(response => response.json())
            .then(data => {
                this.productos = data;
            })
            .catch(error => {
                console.error('Error al obtener los productos:', error);
            });
    },

    // Función para editar un producto
    editarProducto(producto) {
        this.editandoProducto = { ...producto };
    },

    // Función para guardar los cambios de un producto editado
    guardarCambios() {
        if (this.editandoProducto) {
            fetch(`${this.url}/${this.editandoProducto.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(this.editandoProducto),
            })
            .then(response => response.json())
            .then(data => {
                console.log('Producto editado:', data);
                alert("Producto editado con éxito.");
                this.fetchData();
                this.cancelarEdicion();
            })
            .catch(error => {
                console.error('Error al editar el producto:', error);
                alert("Error al editar el producto");
            });
        }
    },

    // Función para cancelar la edición de un producto
    cancelarEdicion() {
        this.editandoProducto = null;
    },

    // Función para eliminar un producto
    eliminarProducto(id) {
        fetch(`${this.url}/${id}`, {
            method: 'DELETE',
        })
        .then(response => response.json())
        .then(data => {
            console.log('Producto eliminado:', data);
            alert("Producto eliminado con éxito.");
            this.fetchData();
        })
        .catch(error => {
            console.error('Error al eliminar el producto:', error);
            alert("Error al eliminar el producto");
        });
    }
},
created() {
    this.fetchData();
}
});

app.mount('#app');