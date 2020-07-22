<template>
  <div class="questions">
    <div
      v-for="question in questions"
      :key="question.id"
      class="question pointer brdr-bottom-1 brdr-cl-secondary"
      :class="{ 'question--open': openQuestion && openQuestion.id === question.id }"
      @click="selectQuestion(question)"
    >
      <div
        class="question__text flex middle-xs between-xs p15"
      >
        {{ question.title }}

        <span class="material-icons">
          keyboard_arrow_down
        </span>
      </div>
      <div class="question__answer">
        <span v-html="question.answer" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props: {
    category: {
      type: Object,
      default: null
    },
    product: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      openQuestion: null
    }
  },
  computed: {
    ...mapGetters({
      getCategoryQuestions: 'amasty-faq/getCategoryQuestions',
      getProductQuestions: 'amasty-faq/getProductQuestions'
    }),
    questions () {
      if (this.category) {
        return this.getCategoryQuestions(this.category)
      } else {
        return this.getProductQuestions(this.product)
      }
    }
  },
  methods: {
    selectQuestion (question) {
      if (!this.openQuestion || (this.openQuestion && this.openQuestion.id !== question.id)) {
        this.openQuestion = question
      } else {
        this.openQuestion = null
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~theme/css/animations/transitions';
@import '~theme/css/helpers/functions/color';
@import '~theme/css/variables/colors';

.question {
  &__text {
    transition: background-color $duration-main $motion-main;

    &:hover {
      background-color: color(white-smoke);
    }
  }
  &__answer {
    padding: 0 15px;
    max-height: 0;
    overflow: hidden;
    transition: max-height $duration-main $motion-main,
                padding $duration-main $motion-main;
  }

  .material-icons {
    transition: transform $duration-main $motion-main;
    user-select: none;
  }

  &--open {
    .question__answer {
      max-height: 400px;
      padding: 15px;
    }

    .material-icons {
      transform: rotate(180deg);
    }
  }
}
</style>
