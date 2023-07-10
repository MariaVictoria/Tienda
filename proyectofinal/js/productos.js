import { createApp } from 'vue';
import VueResource from 'vue-resource';

const { createApp } = Vue;

const app = createApp({
  data() {
    return {
      cargando: true,
      error: false,
      productos: [],
    };
  },
  created() {
    this.$http
      .get('https://vickygurumis.pythonanywhere.com/api/producto')
      .then(response => {
        this.productos = response.data;
        this.cargando = false;
      })
      .catch(error => {
        console.error(error);
        this.cargando = false;
        this.error = true;
      });
  },
  methods: {
    eliminar(id) {
      this.$http
        .delete(`https://vickygurumis.pythonanywhere.com/api/producto/${id}`)
        .then(response => {
          this.productos = this.productos.filter(producto => producto.id !== id);
        })
        .catch(error => {
          console.error(error);
        });
    },
  },
});
const productos = [
    { 
        id: 1, 
        nombre: "Ciguena", 
        precio: 5000, 
        img: "./img/carrito/ciguena.png" 
    },
    {
        id: 2,
        nombre: "Muneca Dulce",
        precio: 15000,
        img: "./img/carrito/munecadulce.png"
    },
    {
        id: 3,
        nombre: "Combo Dino + Libro",
        precio: 9000,
        img: "./img/carrito/combodino.png"
    },
    {
        id: 4,
        nombre: "Camaleon",
        precio: 5500,
        img: "./img/carrito/camaleon.png"
    },
    {
        id: 5,
        nombre: "Combo Triceratops + Libro Didactico",
        precio: 9000,
        img: "./img/carrito/combotriceratop.png"
    },
    {
        id: 6,
        nombre: "Combo Jirafa + Libro didactico",
        precio: 10000,
        img: "./img/carrito/combojirafa.png"
    },
    {
        id: 7,
        nombre: "Fridita",
        precio: 5000,
        img: "./img/carrito/fridita.png"
    }
];




document.getElementById("btnNuevo").addEventListener("click", () => {
  window.location.href = "producto_nuevo.html";
});



app.use(VueResource);
app.mount('#app');
