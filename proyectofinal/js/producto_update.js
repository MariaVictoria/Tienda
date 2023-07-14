  // Obtener el ID del producto de la URL
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('id');

  const { createApp } = Vue;
  createApp({
    data() {
      return {
        id: 0,
        nombre: '',
        imagenUrl: '',
        stock: 0,
        precio: 0,
        imagenFile: null,
        imagenPreview: ''
      };
    },
    methods: {
      fetchData() {
        fetch(`https://MViktoriaU.mysql.pythonanywhere-services.com/api/productos/${productId}`)
          .then(response => response.json())
          .then(data => {
            this.id = data.idamigurumi;
            this.nombre = data.nombre;
            this.imagenUrl = data.imagen;
            this.stock = data.stock;
            this.precio = data.precio;
            this.imagenPreview = data.imagen;
          })
          .catch(error => {
            console.error('Error:', error);
          });
      },
      handleFileUpload(event) {
        const file = event.target.files[0];
        this.imagenFile = file;
        this.imagenPreview = URL.createObjectURL(file);
      },
      modificar() {
        const formData = new FormData();
        formData.append('nombre', this.nombre);
        formData.append('precio', this.precio);
        formData.append('stock', this.stock);
        if (this.imagenFile) {
          formData.append('imagen', this.imagenFile, this.imagenFile.name);
        }

        fetch(`https://MViktoriaU.mysql.pythonanywhere-services.com/api/productos/${productId}`, {
          method: 'PUT',
          body: formData
        })
          .then(response => response.json())
          .then(data => {
            console.log('Producto actualizado:', data);
            Swal.fire('Producto actualizado!', '', 'success');
            setTimeout(() => {
              window.location.href = './productos.html';
            }, 1200);
          })
          .catch(error => {
            console.error('Error:', error);
            Swal.fire('Error', 'Ocurrió un error al actualizar el producto', 'error');
          });
      }
    },
    created() {
      this.fetchData();
    },
  }).mount('#app');