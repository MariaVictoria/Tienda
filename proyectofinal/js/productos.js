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

