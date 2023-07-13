const app = Vue.createApp({
  data() {
    return {
      fecha: '',
      datosCliente: '',
      producto: '',
      imagenUrl: '',
      imagenPreview: '',
      cantidad: '',
      seña: '',
      fechaEntrega: '',
      consultaEstado: '',
      url: 'http://localhost:5500/pedido',
    };
  },
  methods: {
    handleFileUpload(event) {
      const file = event.target.files[0];
      this.imagenUrl = URL.createObjectURL(file);
      this.imagenPreview = this.imagenUrl;
    },
    grabar() {
      const nuevoPedido = {
        fecha: this.fecha,
        datosCliente: this.datosCliente,
        producto: this.producto,
        imagen: this.imagenUrl,
        cantidad: this.cantidad,
        seña: this.seña,
        fechaEntrega: this.fechaEntrega,
        consultaEstado: this.consultaEstado,
      };

      axios
        .post(this.url, nuevoPedido)
        .then(response => {
          console.log('Nuevo pedido registrado:', response.data);
          // Aquí puedes realizar acciones adicionales después de guardar el pedido, como mostrar una notificación de éxito o redirigir a otra página.
        })
        .catch(error => {
          console.error('Error al registrar el pedido:', error);
        });
    },
  },
});

app.mount('#app');
