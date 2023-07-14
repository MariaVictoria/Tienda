console.log(location.search)
var id=location.search.substr(4)
console.log(id)

const { createApp } = Vue
createApp({
  data() {
    return {
      id:0,
      nombre:"",
      descripcion:'',
      imagen:"",
      stock:0,
      precio:0,
      url:'https://mviktoriau.pythonanywhere.com/amigurumi/'+id,
      }
      },

  methods: {
    handleFileUpload(event) {
      const file = event.target.files[0];
      this.amigurumi.imagenUrl = URL.createObjectURL(file);
      this.amigurumi.imagenPreview = this.amigurumi.imagenUrl;
    },
    methods: {
      fetchData(url) {
      fetch(url)
      .then(response => response.json())
      .then(data => {
      
      console.log(data)
      this.id=data.id
      this.nombre = data.nombre;
      this.descripcion=data.descripcion;
      this.imagen=data.imagen
      this.stock=data.stock
      this.precio=data.precio
      })
      .catch(err => {
      console.error(err);
      this.error=true
      })
      },
      modificar() {
      let producto = {
      nombre:this.nombre,
      descripcion:this.descripcion,
      precio: this.precio,
      stock: this.stock,
      imagen:this.imagen
      }
      var options = {
      body: JSON.stringify(producto),
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      redirect: 'follow'
      }
      fetch(this.url, options)
      .then(function () {
      alert("Registro modificado")
      window.location.href = "../templates/productos.html";
      })
      .catch(err => {
      console.error(err);
      alert("Error al Modificar")
      })
      }
      },
      created() {
      this.fetchData(this.url)
      },
      
    grabar() {
      let amigurumi = {
        nombre: this.amigurumi.nombre,
        precio: this.amigurumi.precio,
        description: this.amigurumi.descripcion,
        stock: this.amigurumi.stock,
        imagenUrl: this.amigurumi.imagen
      }
      var options = {
        body: JSON.stringify(amigurumi),
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        redirect: 'follow'
      }
      fetch(this.url, options)
        .then(function () {
          alert("Registro grabado")
          window.location.href = "./productos.html";
        })
        .catch(err => {
          console.error(err);
          alert("Error al Grabarr")
        })
    }
  },
  created() {
    this.fetchData(this.url)
  },
}).mount('#app')