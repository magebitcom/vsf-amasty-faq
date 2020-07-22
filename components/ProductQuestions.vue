<template>
  <section class="brdr-top-1 brdr-cl-secondary">
    <div class="px15 pt50 pb35 container cl-accent">
      <div class="w-100 flex between-xs middle-xs">
        <h2 class="h3 m0 serif lh20">
          {{ $t('Product questions') }}
        </h2>
        <button
          class="p0 inline-flex middle-xs bg-cl-transparent brdr-none action h5 pointer cl-secondary"
          @click="askQuestion"
        >
          {{ $t('Still have a question? Ask us!') }}
        </button>
      </div>
    </div>
    <questions-list
      class="container"
      :product="product"
    />
  </section>
</template>

<script>
import QuestionsList from './QuestionsList'

export default {
  components: {
    QuestionsList
  },
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  methods: {
    askQuestion () {
      this.$bus.$emit('modal-show', 'modal-ask-question')
    }
  }
}
</script>
