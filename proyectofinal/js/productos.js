const { createApp } = Vue;

createApp({
  data() {
    return {
      productos: [],
      url: 'http://mviktoriau.pythonanywhere.com/amigurumi',
      error: false,
      cargando: true,
    };
  },
  computed: {
    amigurumis() {
      return this.productos.filter(producto => producto.tipo === 'amigurumi');
    },
    patrones() {
      return this.productos.filter(producto => producto.tipo === 'patron');
    },
  },
  methods: {
    fetchData() {
      fetch(this.url)
        .then(response => response.json())
        .then(data => {
          this.productos = data;
          this.cargando = false;
        })
        .catch(err => {
          console.error(err);
          this.error = true;
        });
    },
    eliminar(producto) {
      const url = `${this.url}/${producto.idproducto}`;
      var options = {
        method: 'DELETE',
      };
      Swal.fire({
        title: '¿Estás seguro que quieres eliminar este producto?',
        text: '',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, eliminar!',
      }).then(result => {
        if (result.isConfirmed) {
          Swal.fire('Producto eliminado', '', 'success');
          fetch(url, options)
            .then(res => res.text())
            .then(res => {
              setTimeout(() => {
                location.reload();
              }, 1200);
            });
        }
      });
    },
  },
  created() {
    this.fetchData();
  },
}).mount('#app');
