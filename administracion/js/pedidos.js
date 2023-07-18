const { createApp } = Vue;

createApp({
    data() {
        return {
            pedido: [],
            url: 'https://vickygurumis.pythonanywhere.com/pedido',
            error: false,
            cargando: true,
            idpedido: 0,
            idcliente: "",
            idproducto: "",
            cantidad: "",
        };
    },
    methods: {
        fetchData(url) {
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    this.pedido = data;
                    this.cargando = false;
                })
                .catch(err => {
                    console.error(err);
                    this.error = true;
                });
        },
        eliminar(pedido) {
            const url = this.url + '/' + pedido;
            var options = {
                method: 'DELETE',
            };
            fetch(url, options)
                .then(res => res.text()) // or res.json()
                .then(res => {
                    location.reload();
                })
        },
        grabar() {
            let pedido = {
                idpedido: this.idpedido,
                idcliente: this.idcliente,
                idproducto: this.idproducto,
                cantidad: this.cantidad,
            };
            var options = {
                body: JSON.stringify(pedido),
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                redirect: 'follow',
            };
            fetch(this.url, options)
                .then(function () {
                    alert("Pedido nuevo ingresado con éxito.");
                    window.location.href = "IngresarPedido.html";
                })
                .catch(err => {
                    console.error(err);
                    alert("Error al Grabar");
                });
        },
    },
    created() {
        this.fetchData(this.url);
    },
}).mount('#app');