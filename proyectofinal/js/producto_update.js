getProductos();

    function getProductos() {
      axios
        .get('https://mviktoriau.pythonanywhere.com/amigurumi')
        .then(response => {
          const data = response.data;
          console.log('Amigurumis:', data);
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }

    function actualizarProducto(id, nombre, precio, stock, imagen) {
      const data = {
        idamigurumi: id,
        nombre: nombre,
        precio: precio,
        stock: stock,
        imagen: imagen
      };

      axios
        .put(`https://mviktoriau.pythonanywhere.com/amigurumi/${id}`, data)
        .then(response => {
          console.log('Amigurumi actualizado:', response.data);
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }

    const urlParams = new URLSearchParams(window.location.search);
    const productoId = urlParams.get('id');

    axios
      .get(`https://mviktoriau.pythonanywhere.com/amigurumi/${productoId}`)
      .then(response => {
        const producto = response.data;
        document.getElementById('id').value = producto.idamigurumi;
        document.getElementById('nombre').value = producto.nombre;
        document.getElementById('precio').value = producto.precio;
        document.getElementById('stock').value = producto.stock;
        document.getElementById('imagen').value = producto.imagen;
      })
      .catch(error => {
        console.error('Error:', error);
      });

    document.getElementById('btnGrabar').addEventListener('click', () => {
      const nombre = document.getElementById('nombre').value;
      const precio = document.getElementById('precio').value;
      const stock = document.getElementById('stock').value;
      const imagen = document.getElementById('imagen').value;

      actualizarProducto(productoId, nombre, precio, stock, imagen);
    });
 
