const app = Vue.createApp({
    data() {
      return {
        producto: {
          id: null,
          nombre: "",
          precio: null,
          stock: null,
          imagenUrl: "",
          imagenPreview: ""
        }
      };
    },
    methods: {
      handleFileUpload(event) {
        const file = event.target.files[0];
        this.producto.imagenPreview = URL.createObjectURL(file);
      },
      modificar() {
        axios
          .put(`https://mviktoriau.pythonanywhere.com/amigurumi/${this.producto.id}`, {
            nombre: this.producto.nombre,
            precio: this.producto.precio,
            stock: this.producto.stock,
            imagen: this.producto.imagenUrl
          })
          .then(response => {
            console.log(response.data);
            alert("Producto actualizado exitosamente");
          })
          .catch(error => {
            console.error(error);
            alert("Error al actualizar el producto");
          });
      }
    },
    mounted() {
      const urlParams = new URLSearchParams(window.location.search);
      const id = urlParams.get("id");
      if (id) {
        axios
          .get(`https://mviktoriau.pythonanywhere.com/amigurumi/${id}`)
          .then(response => {
            this.producto = response.data;
            if (this.producto.imagen) {
              this.producto.imagenPreview = this.producto.imagen;
            }
          })
          .catch(error => {
            console.error(error);
            alert("Error al obtener el producto");
          });
      } else {
        alert("No se proporcionó un ID de producto");
      }
    }
  });
  
  app.mount("#app");
  