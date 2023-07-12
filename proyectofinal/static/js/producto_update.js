const app = Vue.createApp({
  data() {
    return {
      id: 0,
      nombre: "",
      imagen: "",
      imagenFile: null,
      stock: 0,
      precio: 0,
      url: 'http://127.0.0.1:8083/api/productos/' + id,
      amigurumis: [],
      patrones: [],
      cargando: true,
      error: false,
    };
  },
  mounted() {
    console.log(location.search); // Lee los argumentos pasados a este formulario
    var id = location.search.substr(4);
    console.log(id);
  
    // Realiza la solicitud para obtener los detalles del producto desde la API Flask
    fetch(this.url)
      .then(response => response.json())
      .then(data => {
        this.id = data.id;
        this.nombre = data.nombre;
        this.imagen = data.imagen;
        this.stock = data.stock;
        this.precio = data.precio;
      })
      .catch(error => {
        console.error(error);
        this.error = true;
      });

    // Realiza la solicitud para obtener los amigurumis desde la API Flask
    fetch('http://MViktoriaU.mysql.pythonanywhere-services.com/api/amigurumis')
      .then(response => response.json())
      .then(data => {
        this.amigurumis = data;
      })
      .catch(error => {
        console.error('Error:', error);
        this.error = true;
      });

    // Realiza la solicitud para obtener los patrones desde la API Flask
    fetch('http://MViktoriaU.mysql.pythonanywhere-services.com/api/patrones')
      .then(response => response.json())
      .then(data => {
        this.patrones = data;
        this.cargando = false;
      })
      .catch(error => {
        console.error('Error:', error);
        this.error = true;
        this.cargando = false;
      });
  },
  methods: {
    handleFileUpload(event) {
      this.imagenFile = event.target.files[0];
      this.imagen = URL.createObjectURL(this.imagenFile);
    },
    modificar() {
      let producto = {
        nombre: this.nombre,
        precio: this.precio,
        stock: this.stock,
        imagen: this.imagen,
      };
      var options = {
        body: JSON.stringify(producto),
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        redirect: 'follow',
      };
      fetch(this.url, options)
        .then(() => {
          alert("Registro modificado");
          window.location.href = "/proyectofinal/templates/productos.html";
        })
        .catch(err => {
          console.error(err);
          alert("Error al Modificar");
        });
    },
  },
});

app.mount('#app');
