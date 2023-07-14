const { createApp } = Vue;

createApp({
  data() {
    return {
      error: false,
      loading: true,
      amigurumis: [],
    };
  },
  methods: {
    fetchData() {
      fetch('http://mviktoriau.pythonanywhere.com/amigurumi')
        .then((response) => response.json())
        .then((data) => {
          this.loading = false;
          this.amigurumis = data;
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
}).mount('#app');
      
