const app = Vue.createApp({
    data() {
        return {
            pedidos: [],
            urlPedido: 'https://vickygurumis.pythonanywhere.com/pedido',
            urlCliente: 'https://vickygurumis.pythonanywhere.com/cliente',
            error: false,
            cargando: true,
            pedido: {
                idcliente: '',
                idproducto: '',
                cantidad: '',
                estado: '',
                fecha_entrega: ''
            },
            cliente: {
                nombre: '',
                apellido: '',
                edad: '',
                cel: '',
                direccion: '',
                email: ''
            }
        };
    },
    methods: {
        fetchData() {
            fetch(this.urlPedido)
                .then(response => response.json())
                .then(data => {
                    this.pedidos = data;
                    this.cargando = false;
                })
                .catch(err => {
                    console.error(err);
                    this.error = true;
                });
        },
        eliminarPedido(pedido) {
            const url = `${this.urlPedido}/${pedido.idpedido}`;
            const options = {
                method: 'DELETE'
            };
            fetch(url, options)
                .then(() => {
                    alert('Pedido eliminado');
                    this.fetchData();
                })
                .catch(err => {
                    console.error(err);
                    alert('Error al eliminar el pedido');
                });
        },
        grabarPedido() {
            const options = {
                body: JSON.stringify(this.pedido),
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                redirect: 'follow'
            };
            fetch(this.urlPedido, options)
                .then(() => {
                    alert('Pedido nuevo ingresado con éxito.');
                    this.fetchData();
                    // Restablecer los campos del formulario
                    this.pedido = {
                        idcliente: '',
                        idproducto: '',
                        cantidad: '',
                        estado: '',
                        fecha_entrega: ''
                    };
                })
                .catch(err => {
                    console.error(err);
                    alert('Error al grabar el pedido');
                });
        },
        grabarCliente() {
            const options = {
                body: JSON.stringify(this.cliente),
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                redirect: 'follow'
            };
            fetch(this.urlCliente, options)
                .then(() => {
                    alert('Cliente nuevo ingresado con éxito.');
                    // Restablecer los campos del formulario
                    this.cliente = {
                        nombre: '',
                        apellido: '',
                        edad: '',
                        cel: '',
                        direccion: '',
                        email: ''
                    };
                })
                .catch(err => {
                    console.error(err);
                    alert('Error al grabar el cliente');
                });
        }
    },
    created() {
        this.fetchData();
    }
});

app.mount('#app');
