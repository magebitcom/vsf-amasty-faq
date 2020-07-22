<template>
  <div class="container pb20">
    <breadcrumbs
      class="mt20"
      :active-route="$t('Questions and Answers')"
      :with-homepage="true"
    />
    <header>
      <h1>
        {{ $t('Questions and Answers') }}
      </h1>
    </header>
    <div class="row">
      <div
        v-for="category in categories"
        :key="category.id"
        class="category col-md-6 col-sm-6 col-xs-12"
      >
        <router-link
          :to="localizedRoute({ name: 'amasty-faq-category', params: { slug: category.url_key }})"
        >
          <h2 class="mb10 open-category">
            {{ category.title }}
            <span>
              ({{ getCategoryQuestions(category).length }})
            </span>
          </h2>
        </router-link>
        <questions-list :category="category" />
      </div>
    </div>
  </div>
</template>

<script>
import Breadcrumbs from 'theme/components/core/Breadcrumbs'
import { Logger } from '@vue-storefront/core/lib/logger'
import { isServer } from '@vue-storefront/core/helpers'
import { mapGetters } from 'vuex'
import QuestionsList from 'src/modules/amasty-faq/components/QuestionsList'

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
    Breadcrumbs,
    QuestionsList
  },
  computed: {
    ...mapGetters({
      categories: 'amasty-faq/getCategories',
      getCategoryQuestions: 'amasty-faq/getCategoryQuestions'
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
