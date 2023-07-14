console.log(location.search)
var id = location.search.substr(4);
console.log(id)
// let valorid = document.getElementById("id");
// valorid.innerHTML = `${id}`;

const { createApp } = Vue
const app = createApp({
  data() {
    return {
      // amigurumi: {
        // idnombre: '',
        // codigo: '',
        nombre: "",
        // descripcion: '',
        precio: 0,
        stock: 0,
        imagenUrl: "",
        // imagenPreview: "",
        url: 'https://mviktoriau.pythonanywhere.com/amigurumi'+id, 
          
      
    };
  },
  methods: {
    fetchData(url) {
    fetch(url)
    .then(response => response.json())
    .then(data => {
    
    console.log(data)
    this.id=data.id
    this.nombre = data.nombre;
    this.precio=data.precio
    this.stock=data.stock
    this.imagenUrl=data.imagenUrl
    })
    .catch(err => {
    console.error(err);
    this.error=true
    })
    },
    grabar(){
      let amigurumi = {
      nombre:this.nombre,
      precio: this.precio,
      stock: this.stock,
      imagenUrl:this.aimagenUrl
      }
      var options = {
      body:JSON.stringify(amigurumi),
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