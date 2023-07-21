function crearProducto(nuevoProducto) {
    return fetch('http://localhost:5000/producto', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nuevoProducto),
    })
      .then(response => response.json())
      .catch(error => {
        console.error('Error al crear el producto:', error);
        throw error;
      });
  }
  