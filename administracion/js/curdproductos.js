const app = Vue.createApp({
    data() {
        return {
            productos: [],
            url: 'https://vickygurumis.pythonanywhere.com/producto',
            error: false,
            cargando: true,
            id: 0,
            nombre: "",
            descripcion: "",
            disponibilidad: "",
            precio: 0,
            imagen: "",
            codigo: 0
        };
    },
    methods: {
        fetchData() {
            fetch(this.url)
                .then(response => response.json())
                .then(data => {
                    this.productos = data;
                    this.cargando = false
                })
                .catch(err => {
                    console.error(err);
                    this.error = true
                });
        },
        eliminar(producto) {
            const url = this.url + '/' + producto;
            var options = {
                method: 'DELETE'
            };
            fetch(url, options)
                .then(() => {
                    alert("Producto eliminado");
                    this.fetchData();
                })
                .catch(err => {
                    console.error(err);
                    alert("Error al eliminar el producto");
                });
        },
        grabar() {
            let producto = {
                nombre: this.nombre,
                descripcion: this.descripcion,
                disponibilidad: this.disponibilidad,
                precio: this.precio,
                imagen: this.imagen,
                codigo: this.codigo
            };
        
            var options = {
                body: JSON.stringify(producto),
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                redirect: 'follow'
            };
        
            fetch(this.url, options)
                .then(() => {
                    alert("Producto nuevo ingresado con éxito.");
                    this.fetchData();
                    // Restablecer los campos del formulario
                    this.nombre = "";
                    this.descripcion = "";
                    this.disponibilidad = "";
                    this.precio = 0;
                    this.imagen = "";
                    this.codigo = 0;
        
                    // Redirigir a productos.html
                    window.location.href = 'productos.html';
                })
                .catch(err => {
                    console.error(err);
                    alert("Error al grabar el producto");
                });
        },
        editar(producto) {
            const url = this.url + '/' + producto.id;
            let data = {
                nombre: producto.nombre,
                descripcion: producto.descripcion,
                disponibilidad: producto.disponibilidad,
                precio: producto.precio,
                imagen: producto.imagen,
                codigo: producto.codigo,
            }
            var options = {
                body: JSON.stringify(data),
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                redirect: 'follow'
            };
            fetch(url, options)
                .then(() => {
                    alert("Producto modificado con éxito.");
                    this.fetchData();
                })
                .catch(err => {
                    console.error(err);
                    alert("Error al modificar el producto");
                });
        }
    },
    created() {
        this.fetchData();
    }
}).mount('#app');
