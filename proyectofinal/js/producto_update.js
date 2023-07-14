  function getProductos() {
            axios.get('https://mviktoriau.pythonanywhere.com/api/productos')
                .then(response => {
                    const data = response.data;
                    console.log('Productos:', data);
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }

        // Realizar una solicitud PUT para actualizar un producto existente
        function actualizarProducto(id, nombre, precio, stock, imagen) {
            const data = {
                idproducto: id,
                nombre: nombre,
                precio: precio,
                stock: stock,
                imagen: imagen
            };

            axios.put(`https://mviktoriau.pythonanywhere.com/api/productos/${id}`, data)
                .then(response => {
                    console.log('Producto actualizado:', response.data);
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }

        // Obtener el ID del producto de la URL
        const urlParams = new URLSearchParams(window.location.search);
        const productoId = urlParams.get('id');

        // Obtener el producto actual por su ID y mostrar los datos en el formulario
        axios.get(`https://mviktoriau.pythonanywhere.com/api/productos/${productoId}`)
            .then(response => {
                const producto = response.data;
                document.getElementById('id').value = producto.idproducto;
                document.getElementById('nombre').value = producto.nombre;
                document.getElementById('precio').value = producto.precio;
                document.getElementById('stock').value = producto.stock;
                document.getElementById('imagen').value = producto.imagen;
            })
            .catch(error => {
                console.error('Error:', error);
            });

        // Manejar la actualización del producto al hacer clic en el botón "Grabar"
        document.getElementById('btnGrabar').addEventListener('click', () => {
            const nombre = document.getElementById('nombre').value;
            const precio = document.getElementById('precio').value;
            const stock = document.getElementById('stock').value;
            const imagen = document.getElementById('imagen').value;

            actualizarProducto(productoId, nombre, precio, stock, imagen);
        });

        // Ejecutar la función getProductos al cargar la página
        getProductos();
    </script>

var id = location.search.substr(4);
let valorid = document.getElementById("id");
valorid.innerHTML = `${id}`;
const { createApp } = Vue;

createApp({
    data() {
        return {
            id: '',
            nombre: '',
            descripcion: '',
            precio: '',
            stock: '',
            imagen: '',
            imagenPreview: '',
            url: 'http://mviktoriau.pythonanywhere.com/amigurumi'
        };
    },
    methods: {
        fetchData(url) {
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    this.id = data.id;
                    this.nombre = data.nombre;
                    this.imagen = data.imagen;
                    this.stock = data.stock;
                    this.precio = data.precio;
                })
                .catch(err => {
                    console.error(err);
                    this.error = true;
                });
        },
        modificar() {
            let amigurumi = {
                nombre: this.nombre,
                descripcion: this.descripcion,
                precio: this.precio,
                stock: this.stock,
                imagen: this.imagen
            };
            var options = {
                body: JSON.stringify(amigurumi),
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                redirect: 'follow'
            };
            Swal.fire({
                title: 'Queres modificar el producto?',
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: 'Actualizar producto',
                denyButtonText: `Cancelar edición`,
                cancelButtonText: 'Seguir editando'
            }).then((result) => {
                if (result.isConfirmed) {
                    fetch(this.url, options)
                        .then(function () {
                            setTimeout(time => { window.location.href = "./productos.html"; }, 1200);
                        })
                        .catch(err => {
                            console.error(err);
                            alert("Error al Modificar");
                        });
                    Swal.fire('Producto actualizado!', '', 'success');
                } else if (result.isDenied) {
                    Swal.fire('No se guardaron los cambios', '', 'info');
                    setTimeout(time => { window.location.href = "./productos.html"; }, 1200);
                }
            });
        }
    },
    created() {
        this.fetchData(this.url);
    },
}).mount('#app');
