<template>
  <div class="main-page">
    <div v-for="page in pages"><a href="">{{ page.title }}</a></div>
    <paginate
      :page-count="20"
      :click-handler="pageHandler"
      :prev-text="'Prev'"
      :next-text="'Next'"
      :container-class="'pagination'">
    </paginate>
  </div>
</template>

<script>
import axios from 'axios';

const baseUrl = process.env.VUE_APP_APIURL;

export default {
  name: 'MainPage',
  data: function () {
    return {
      currentPage: 1,
      pages: [],
    }
  },
  methods: {
    fetchPages: function (page) {
      axios({
        method: 'get',
        baseURL: baseUrl,
        url: '/v1/pages',
        params: { page },
     })
      .then((res) => { this.pages = res.data.data })
      .catch((err) => { console.log(err) })
    },
    pageHandler: function (page) {
      this.currentPage=page;
      this.fetchPages(page)
    }
  },
  created: function () {
    this.fetchPages(this.currentPage)
  }
}
</script>
