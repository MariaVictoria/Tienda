const { createApp } = Vue
createApp({
    data() {
        return {
            pedido: [],
            //url:'http://localhost:5000/productos',
            // si el backend esta corriendo local usar localhost 5000(si no lo subieron a pythonanywhere)
            url: 'https://vickygurumis.pythonanywhere.com/pedido', // si ya lo subieron a pythonanywhere
            error: false,
            cargando: true,
            /*atributos para el guardar los valores del formulario */
            idpedido: 0,
            idcliente: "",
            idproducto:'',
            cantidad:'',
                        
        }
    },
    methods: {
        fetchData(url) {
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    this.pedidos = data;
                    this.cargando = false
                })
                .catch(err => {
                    console.error(err);
                    this.error = true
                })
        },
        eliminar(pedido) {
            const url = this.url + '/' + pedido;
            var options = {
                method: 'DELETE',
            }
            fetch(url, options)
                .then(res => res.text()) // or res.json()
                .then(res => {
                    location.reload();
                })
        },
        grabar() {
            let pedido = {
                
                idpedido:this.idpedido,
                idcliente: this.idcliente,
                idproducto:this.idproducto,
                cantidad:this.cantidad
                           
            }
            var options = {
                body: JSON.stringify(pedido),
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                redirect: 'follow'
            }
            fetch(this.url, options)
                .then(function () {
                    alert("Pedido nuevo ingresado con éxito.")
                    window.location.href = "IngresarPedido.html";
                })
                .catch(err => {
                    console.error(err);
                    alert("Error al Grabarr")
                })
        }
    },
    created() {
        this.fetchData(this.url)
    },
}).mount('#app')