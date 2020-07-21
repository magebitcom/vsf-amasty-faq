<template>
  <div
    class="container pb20"
  >
    <breadcrumbs
      class="mt20"
      :routes="[{name: $t('Questions and Answers'), route_link: '/knowledge-base' }]"
      :active-route="category.title"
      :with-homepage="true"
    />
    <header>
      <h1>
        {{ category.title }}
      </h1>
    </header>
    <div class="row">
      <div class="questions col-md-8 col-sm-7 col-xs-12 pb30">
        <div
          v-for="question in questions"
          :key="question.id"
          class="question pointer brdr-bottom-1 brdr-cl-silver"
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
            <span v-html="question.short_answer" />
            <router-link
              class="block mt10"
              :to="localizedRoute({ name: 'amasty-faq-question', params: { slug: category.url_key, question: question.url_key }})"
            >
              {{ $t('Read full answer') }}
            </router-link>
          </div>
        </div>
      </div>
      <div class="categories col-md-4 col-sm-5 col-xs-12">
        <div class="title pt10 pb10">
          {{ $t("Categories") }}
        </div>
        <div
          class="category-list"
        >
          <div
            v-for="category in categories"
            :key="category.id"
            class="category"
          >
            <router-link
              class="pt10 pb10 block"
              :to="localizedRoute({ name: 'amasty-faq-category', params: { slug: category.url_key }})"
            >
              {{ category.title }}
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Breadcrumbs from 'theme/components/core/Breadcrumbs'
import { Logger } from '@vue-storefront/core/lib/logger'
import { isServer } from '@vue-storefront/core/helpers'
import { mapGetters } from 'vuex'

const composeInitialPageState = async (store, route, forceLoad = false) => {
  try {
    await store.dispatch('amasty-faq/loadCategories')
    await store.dispatch('amasty-faq/loadQuestions')
  } catch (e) {
    Logger.error('Problem with setting FAQ initial data!', 'amasty-faq', e)()
  }
}

export default {
  components: {
    Breadcrumbs
  },
  data () {
    return {
      openQuestion: null
    }
  },
  computed: {
    ...mapGetters({
      category: 'amasty-faq/getCurrentCategory',
      categories: 'amasty-faq/getCategories',
      getCategoryQuestions: 'amasty-faq/getCategoryQuestions'
    }),
    questions () {
      return this.getCategoryQuestions(this.category)
    }
  },
  async asyncData ({ store, route, context }) { // this is for SSR purposes to prefetch data - and it's always executed before parent component methods
    await composeInitialPageState(store, route)
  },
  async beforeRouteEnter (to, from, next) {
    if (isServer) next() // SSR no need to invoke SW caching here
    else if (!from.name) { // SSR but client side invocation, we need to cache products and invoke requests from asyncData for offline support
      next(async vm => {
        vm.loading = true
        await composeInitialPageState(vm.$store, to, true)
        vm.loading = false
      })
    } else {
      next()
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
