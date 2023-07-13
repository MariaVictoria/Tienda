const app = Vue.createApp({
  data() {
    return {
      nombreProducto: '',
      descripcion: '',
      precio: 0,
      stock: '',
      imagenUrl: '',
      imagenPreview: '',
      productos: [],
      url: 'http://mviktoriau.pythonanywhere.com/amigurumi',
      error: false,
      cargando: true,
    };
  },
  computed: {
    amigurumis() {
      return this.productos;
    },
  },
  methods: {
    handleFileUpload(event) {
      const file = event.target.files[0];
      this.imagenUrl = URL.createObjectURL(file);
      this.imagenPreview = this.imagenUrl;
    },
    grabar() {
      // Aquí puedes enviar los datos del producto a tu API o realizar otras acciones necesarias
      console.log('Nombre:', this.nombreProducto);
      console.log('Descripción:', this.descripcion);
      console.log('Precio:', this.precio);
      console.log('Estado:', this.stock);
      console.log('Imagen:', this.imagenUrl);
    },
    fetchData() {
      fetch(this.url)
        .then(response => response.json())
        .then(data => {
          this.productos = data;
          this.cargando = false;
        })
        .catch(err => {
          console.error(err);
          this.error = true;
        });
    },
  },
  created() {
    this.fetchData();
  },
});

app.mount('#app');
