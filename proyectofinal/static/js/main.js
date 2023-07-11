// Variables y manipulación del DOM:
const shopContent = document.getElementById("shopContent");
const verCarrito = document.getElementById("verCarrito");
const modalContainer = document.getElementById("modal-container");

let carrito = [];

productos.forEach((product) => {
    let content = document.createElement("div");
    content.className = "card";
    content.innerHTML = `
        <img src="${product.img}">
        <h3>${product.nombre}</h3>
        <p class="price">$ ${product.precio}</p>
    `;
    shopContent.append(content);

    let comprar = document.createElement("button")
    comprar.innerText = "AGREGAR";
    comprar.className = "comprar";
    content.append(comprar);

    comprar.addEventListener("click", () => {
        carrito.push({
            id: product.id,
            nombre: product.nombre,
            img: product.img,
            precio: product.precio,
        });
    });
});

//instancia de la aplicación Vue
const app = Vue.createApp({
    data() {
      return {
        productos: [], // Array vacío para almacenar los productos cargados
        cargando: true, // Variable para controlar el estado de carga
        error: false, // Variable para controlar si ocurre un error en la carga
      };
    },
    mounted() {
      // Realiza la solicitud para obtener los productos desde la API Flask
      fetch('https://MViktoriaU.mysql.pythonanywhere-services.com/api/productos')
        .then(response => response.json())
        .then(data => {
          this.productos = data; // Asigna los productos a la propiedad "productos" de la aplicación
          this.cargando = false; // Cambia el estado de carga a "false"
        })
        .catch(error => {
          console.error('Error:', error);
          this.cargando = false; // Cambia el estado de carga a "false" en caso de error
          this.error = true; // Activa la variable de error
        });
    },
  });
  
  app.mount('#app');