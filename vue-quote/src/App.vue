<template>
  <div class="container">
    <app-header :quoteCount="quotes.length" :maxQuotes="maxQuotes"></app-header>
    <app-new-quote @quoteAdded="newQuote"></app-new-quote>
    <app-quote-grid :quotes="quotes" @quoteDeleted="deleteQuote"></app-quote-grid>

    <div class="row">
      <div class="col-sm-12 text-center">
        <div class="alert alert-info">
          Info: Click on quote to delete.
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import QuoteGrid from './components/QuoteGrid.vue';
  import NewQuote from './components/NewQuote.vue';
  import Header from './components/Header.vue';

  export default {
    data: function () {
      return {
        quotes: [
          'Just a quote to start something with.',
        ],
        maxQuotes: 10,
      }
    },
    components: {
      'app-quote-grid': QuoteGrid,
      'app-new-quote': NewQuote,
      'app-header': Header
    },
    methods: {
      newQuote(quote) {
        if (this.quotes.length >= this.maxQuotes) {
          return alert("Reached max quote, please delete some.");
        }

        this.quotes.push(quote);
      },
      deleteQuote(i) {
        this.quotes.splice(i, 1);
      }
    }
  };
</script>

<style>
</style>
