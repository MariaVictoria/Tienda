const { createApp } = Vue;
createApp({
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
        fetchData(url) {
            fetch(url)
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
                .then(res => res.json())
                    .then(res => {
                        location.reload();
                    });
        },
        grabar() {
            let producto = {
                nombre: this.nombre,
                descripcion: this.descripcion,
                disponibilidad: this.disponibilidad,
                precio: this.precio,
                imagen: this.imagen,
                codigo: this.codigo,
            }
            var options = {
                body: JSON.stringify(producto),
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                redirect: 'follow'
            };
            fetch(this.url, options)
                .then(() => {
                    alert("Producto nuevo ingresado con éxito.");
                    window.location.href = "productos.html";
                })
                .catch(err => {
                    console.error(err);
                    alert("Error al Grabar");
                });
        }
    },
    created() {
        this.fetchData(this.url);
    }
}).mount('#app');