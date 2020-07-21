<template>
  <div class="container pb20">
    <template v-if="question">
      <breadcrumbs
        class="mt20"
        :routes="[{name: $t('Questions and Answers'), route_link: '/knowledge-base' }]"
        :active-route="question.title"
        :with-homepage="true"
      />
      <header>
        <h1>
          {{ question.title }}
        </h1>
      </header>
      <div class="row">
        <div class="col-md-8 col-sm-7 col-xs-12">
          <div v-html="question.answer" />
        </div>
        <div class="col-md-4 col-sm-5 col-xs-12">
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
    </template>
    <template v-else>
      <div class="container flex middle-xs center-xs question-not-found">
        <h2>Oops!</h2>
        <p class="h4">
          {{ $t('We couldn\'t find the question you were looking for') }}
        </p>
        <router-link :to="localizedRoute({ name: 'amasty-faq' })">
          {{ $t('Click here to go back') }}
        </router-link>
      </div>
    </template>
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

    if (route.params.question) {
      await store.dispatch('amasty-faq/loadQuestion', {
        filters: {
          url_key: route.params.question
        }
      })
    }
  } catch (e) {
    Logger.error('Problem with setting FAQ initial data!', 'amasty-faq', e)()
  }
}

export default {
  components: {
    Breadcrumbs
  },
  computed: {
    ...mapGetters({
      question: 'amasty-faq/getCurrentQuestion',
      categories: 'amasty-faq/getCategories'
    })
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
  }
}
</script>

<style scoped>

.question-not-found {
  flex-direction: column;
}

</style>
