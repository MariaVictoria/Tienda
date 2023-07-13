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
      url: 'http://mviktoriau.pythonanywhere.com/pedido',
      error: false,
      cargando: true,
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
        
        })
        .catch(error => {
          console.error('Error al registrar el pedido:', error);
        });
    },
    fetchData() {
      axios
        .get(this.url)
        .then(response => {
          this.pedidos = response.data;
          this.cargando = false;
        })
        .catch(error => {
          console.error(error);
          this.error = true;
        });
    },
  },
  created() {
    this.fetchData();
  },
});

app.mount('#app');
