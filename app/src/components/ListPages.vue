<template>
  <div v-show="stateFetchPages === 'success'" class="list-pages">
    <div v-for="page in pages">
      <b-card
        :title="page.title"
      >
        <b-card-text>{{ page.greeting }}</b-card-text>
        <b-link v-bind:href=page.url>Read more...</b-link>
      </b-card>
    </div>
    <paginate
      :force-page=numCurrentPagination
      :page-count=countPagination
      :click-handler="paginationHandler"
      :prev-text="'Prev'"
      :next-text="'Next'"
      :container-class="'pagination'"
      :page-class="'page-item'"
      :pageLinkClass="'page-link'"
      :prevClass="'page-item'"
      :prevLinkClass="'page-link'"
      :nextClass="'page-item'"
      :nextLinkClass="'page-link'"
    >
    </paginate>
  </div>
</template>

<script>
export default {
  name: 'ListPages',
  methods: {
    paginationHandler(numPagination) {
      this.$store.commit('updateNumCurrentPagination', numPagination);
      this.$store.dispatch('fetchPages', numPagination);
    }
  },
  created() {
    const { numCurrentPagination } = this.$store.state.UIPages;
    this.$store.dispatch('fetchPages', numCurrentPagination);
  },
  computed: {
    pages() {
      return this.$store.state.pages;
    },
    numCurrentPagination() {
      return this.$store.state.UIPages.numCurrentPagination;
    },
    countPagination() {
      return this.$store.state.UIPages.countPagination;
    },
    stateFetchPages() {
      return this.$store.state.UIPages.stateFetch;
    },
  },
}
</script>
