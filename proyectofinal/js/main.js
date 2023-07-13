<<<<<<< HEAD
document.getElementById("header").innerHTML =`<header class="headercss">
<a href="../index.html">
    <div class="fondoLogo">
    </div>
</a>      
<nav class="navcss">
    <ul class="navbarcss">
        <li>
            <a href="../index.html"><img class="logo" src="../media/img/sonyps5-logo-negro.png" alt="Logo Sony"></img></a>
        </li>
        <li>
            <a href="../index.html">INICIO</a>
        </li>
        <li>
            <a href="detalles.html">DETALLES</a>
        </li>
        <li>
            <a href="accesorios.html">ACCESORIOS</a>
        </li>
        <li>
            <a href="juegos.html">JUEGOS</a>
        </li>
        <li>
            <a href="productos.html">PRODUCTOS</a>
        </li>
    </ul>
</nav>
</header>`
=======
// Variables y manipulación del DOM:
const shopContent = document.getElementById("shopContent");
const url = 'http://MViktoriaU.mysql.pythonanywhere-services.com/producto'; 

// Función para agregar un nuevo producto a la base de datos
function agregarProducto() {
  const nombre = "Nuevo producto"; // Reemplaza con el nombre del nuevo producto
  const precio = 100; // Reemplaza con el precio del nuevo producto
  const stock = 10; // Reemplaza con el stock del nuevo producto
  const imagen = "ruta/imagen.jpg"; // Reemplaza con la ruta de la imagen del nuevo producto

  const nuevoProducto = {
    nombre: nombre,
    precio: precio,
    stock: stock,
    imagen: imagen
  };

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(nuevoProducto)
  };

  // Realiza la solicitud HTTP POST al servidor para agregar el nuevo producto
  fetch(url, options)
    .then(response => response.json())
    .then(data => {
      console.log(data); // Aquí puedes manejar la respuesta del servidor
      // Actualiza la lista de productos en la página
      obtenerProductos();
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

// Función para obtener la lista de productos desde el servidor
function obtenerProductos() {
  fetch(url)
    .then(response => response.json())
    .then(data => {
      // Actualiza la lista de productos en la página
      // Puedes usar los datos obtenidos para mostrarlos en la página
      // o realizar otras operaciones necesarias
      console.log(data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

// Maneja el evento de clic en el botón "AGREGAR"
function handleClickAgregar() {
  agregarProducto();
}

// Agrega el evento de clic al botón "AGREGAR"
document.getElementById("agregarButton").addEventListener("click", handleClickAgregar);

// Obtén la lista de productos al cargar la página
obtenerProductos();
axios.get('/producto')
  .then(response => {
    // Aquí obtienes los productos desde la respuesta de la API
    const productos = response.data;

    // Aquí puedes iterar sobre los productos y mostrarlos en tu HTML
    productos.forEach(producto => {
      // Agrega el código necesario para mostrar cada producto en tu HTML
      // Puedes utilizar elementos HTML como <div>, <ul>, <li>, <table>, etc.
    });
  })
  .catch(error => {
    // Manejo de errores en caso de que la solicitud falle
    console.error(error);
  });
>>>>>>> 34132374f1bb7f08638b4d0c41de0d2435a807ed
