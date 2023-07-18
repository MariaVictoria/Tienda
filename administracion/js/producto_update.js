const app = Vue.createApp({
    data() {
        return {
            id: null,
            tipo: '',
            nombre: '',
            descripcion: '',
            disponibilidad: '',
            precio: 0,
            imagenUrl: '',
            codigo: '',
            url: ''
        }
    },
    methods: {
        fetchData(url) {
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    this.id = data.id
                    this.tipo = data.tipo
                    this.nombre = data.nombre;
                    this.descripcion = data.descripcion
                    this.disponibilidad = data.disponibilidad
                    this.precio = data.precio
                    this.imagenUrl = data.imagenUrl
                    this.codigo = data.codigo
                })
                .catch(err => {
                    console.error(err);
                    this.error = true
                })
        },
        update() {
            let producto = {
                tipo: this.tipo,
                nombre: this.nombre,
                descripcion: this.descripcion,
                disponibilidad: this.disponibilidad,
                precio: this.precio,
                imagenUrl: this.imagenUrl,
                codigo: this.codigo
            }
            var options = {
                body: JSON.stringify(producto),
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                redirect: 'follow'
            }
            fetch(this.url, options)
                .then(() => {
                    alert("Producto modificado")
                    window.location.href = "./productos.html";
                })
                .catch(err => {
                    console.error(err);
                    alert("Error al Modificar")
                })
        },
        handleFileUpload(event) {
            const file = event.target.files[0];
            // Realiza el proceso de subida de la imagen
            // y actualiza this.imagenUrl con la URL de la imagen subida
        }
    },
    created() {
        const params = new URLSearchParams(location.search);
        this.id = params.get('id');
        this.url = 'https://vickygurumis.pythonanywhere.com/producto/' + this.id;
        this.fetchData(this.url);
    },
}).mount('#app');