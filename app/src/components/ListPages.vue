<template>
  <div class="list-pages">
    <div v-for="page in pages"><a v-bind:href=page.url>{{ page.title }}</a></div>
    <paginate
      :page-count="20"
      :click-handler="paginationHandler"
      :prev-text="'Prev'"
      :next-text="'Next'"
      :container-class="'pagination'"
    >
    </paginate>
  </div>
</template>

<script>
import axios from 'axios';

const apiBaseUrl = process.env.VUE_APP_APIURL;

export default {
  name: 'MainPage',
  data: function () {
    return {
      currentPaginationNumber: 1,
      pages: [],
    }
  },
  methods: {
    fetchPages: function (page) {
      axios({
        method: 'get',
        baseURL: apiBaseUrl,
        url: '/v1/pages',
        params: { page },
     })
      .then((res) => {
        this.pages = res.data.data.map(e => (
          { ...e, url: `/pages/${e.id}` }
        ))
      })
      .catch((err) => { console.log(err) })
    },
    paginationHandler: function (numPagination) {
      this.currentPaginationNumber=numPagination;
      this.fetchPages(numPagination)
    }
  },
  created: function () {
    this.fetchPages(this.currentPaginationNumber)
  }
}
</script>
