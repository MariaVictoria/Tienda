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
        const nuevoProducto = {
          nombre: this.nombreProducto,
          descripcion: this.descripcion,
          precio: this.precio,
          stock: this.stock,
          imagen: this.imagenUrl,
        };
        
        fetch(this.url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(nuevoProducto),
        })
        .then(response => response.json())
        .then(data => {
          console.log('Nuevo producto registrado:', data);
          
        })
        .catch(error => {
          console.error('Error al registrar el producto:', error);
        });
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
  
