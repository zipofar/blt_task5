<template>
  <div class="main-page">
    <div v-for="page in pages">{{ page.title }} - {{ page.greeting }}</div>
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
      axios
        .get('http://localhost:4000/api/v1/pages', {
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
