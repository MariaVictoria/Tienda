document.getElementById("header").innerHTML=` <nav class="navbar navbar-expand-sm
navbar-light bg-light">
<div class="container">
<a class="navbar-brand" href="./productos.html">CRUD</a>

</div>
</nav>`
const app = Vue.createApp({
  data() {
    return {
      error: false,
      loading: true,
      amigurumis: [],
    };
  },
  methods: {
    fetchData() {
      axios
        .get('http://mviktoriau.pythonanywhere.com/amigurumi')
        .then((response) => {
          this.loading = false;
          this.amigurumis = response.data;
        })
        .catch((error) => {
          console.error(error);
          this.error = true;
          this.loading = false;
        });
    },
  },
  created() {
    this.fetchData();
  },
});

app.mount('#app');

