const { createApp } = Vue
createApp({
    data(){
        return {
            amigurumi: [],
            url: 'http://mviktoriau.pythonanywhere.com/amigurumi',
            error: false,
            cargando: true,
            id: 0,
            nombreProducto: '',
            imagen: '',
            descripcion: '',
            precio: 0,
            stock: 0,
            imagenPreview: '', 
            }
        },
        methods: {
            fetchData(url) {
                fetch(url)
                    .then(response => response.json())
                    .then(data => {
                        this.amigurumi = data;
                        this.cargando = false
                    })
                    .catch(err => {
                        console.error(err);
                        this.error = true
                })
        },
        eliminar(amigurumi) {
                const url = this.url + '/' + amigurumi
                var options = {
                    method: 'DELETE',
                        }
                Swal.fire({
                    title: '¿Estas seguro que queres eliminar este producto?',
                    text: "",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Si, eliminar!'
                    })
                    .then((result) => {
                        if (result.isConfirmed){
                            Swal.fire(
                                'Producto eliminado',  
                                '',                  
                                'success'
                            )
                            fetch(url, options)
                                .then(res => res.text()) 
                                .then(res => {
                                    setTimeout(time=>{location.reload()},1200)
                                })
                        }
                    })           
        },       
       grabar() {
                let amigurumi = {
                    nombre: this.nombre,
                    precio: this.precio,
                    stock: this.stock,
                    imagen: this.imagen
                }
                if (amigurumi.nombre ==''){
                    Swal.fire(
                        'Ha surgido un error',
                        'El producto debe tener al menos un nombre',
                        'error'
                    )
                } else {
                    var options = {
                        body: JSON.stringify(amigurumi),
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        redirect: 'follow'
                    }
                    fetch(this.url, options)
                        .then(function () {         
                                Swal.fire(
                                    'Producto dado de alta',
                                    '',
                                    'success'
                                )
                                setTimeout(time=>{window.location.href = "./productos.html";},1200)
                            })
                        .catch(err => {
                            console.error(err);
                            Swal.fire(
                                'Error el grabar',
                                '',
                                'error'
                            )
                            setTimeout(time=>{window.location.href = "./productos.html";},1200)
                        })
                }
            }
    },
      created() {
        this.fetchData(this.url)
    },
}).mount('#app')
