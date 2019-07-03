<template>
  <div class="page">
    <h1>{{ page.title }}</h1>
    <h2>{{ page.greeting }}</h2>
    <p>{{ page.content }}</p>
  </div>
</template>

<script>
import axios from 'axios';

const apiBaseUrl = process.env.VUE_APP_APIURL;

export default {
  name: 'Page',
  data: function () {
    return {
      page: {},
    };
  },
  methods: {
    fetchPage: function () {
      const { id = 'primary' } = this.$route.params;
      axios({
        method: 'get',
        baseURL: apiBaseUrl,
        url: `/v1/pages/${id}`,
      })
      .then((res) => {
        this.page = res.data.data;
      })
      .catch((err) => { console.log(err) })
    },
  },
  created: function () {
    this.fetchPage()
  },
  watch: {
    '$route': 'fetchPage'
  },
}
</script>
