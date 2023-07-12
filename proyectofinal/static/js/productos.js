Vue.createApp({
  data() {
    return {
      error: false,
      loading: true,
      amigurumis: [], // Variable para almacenar los amigurumis
      patrones: [], // Variable para almacenar los patrones
      productos: [] // Variable para almacenar los productos generales
    };
  },
  mounted() {
    // Ejemplo de solicitud para obtener los amigurumis
    axios.get('/api/amigurumis')
      .then(response => {
        this.amigurumis = response.data;
      })
      .catch(error => {
        this.error = true;
        console.error(error);
      })
      .finally(() => {
        this.loading = false;
      });

    // Ejemplo de solicitud para obtener los patrones
    axios.get('/api/patrones')
      .then(response => {
        this.patrones = response.data;
      })
      .catch(error => {
        this.error = true;
        console.error(error);
      })
      .finally(() => {
        this.loading = false;
      });

    // Ejemplo de solicitud para obtener los productos generales
    axios.get('/api/productos')
      .then(response => {
        this.productos = response.data;
      })
      .catch(error => {
        this.error = true;
        console.error(error);
      })
      .finally(() => {
        this.loading = false;
      });
  },
  methods: {
    eliminar(id) {
      // Aquí implementarías la lógica para eliminar un producto según su ID
    }
  }
}).mount('#app');
Vue.createApp({
  data() {
      return {
          amigurumis: [],
          patrones: [],
          loading: true,
          error: false
      };
  },
  mounted() {
      axios.get('/producto')
          .then(response => {
              this.amigurumis = response.data.amigurumis;
              this.patrones = response.data.patrones;
              this.loading = false;
          })
          .catch(error => {
              console.error(error);
              this.error = true;
              this.loading = false;
          });
  }
}).mount('#app');