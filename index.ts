import { StorefrontModule } from '@vue-storefront/core/lib/modules'
import { getSearchAdapter } from '@vue-storefront/core/lib/search/adapter/searchAdapterFactory'
import { faqModule } from './state'
export const KEY = 'amasty-faq'

const KnowledgeBase = () => import(/* webpackChunkName: "vsf-faq-page" */ './pages/KnowledgeBase.vue')
const KnowledgeBaseCategory = () => import(/* webpackChunkName: "vsf-faq-category-page" */ './pages/KnowledgeBaseCategory.vue')
const KnowledgeBaseQuestion = () => import(/* webpackChunkName: "vsf-faq-question-page" */ './pages/KnowledgeBaseQuestion.vue')

export const AmastyFaq: StorefrontModule = function ({ store, router }) {
  store.registerModule(KEY, faqModule)

  router.addRoutes([
    { name: 'amasty-faq', path: '/knowledge-base', component: KnowledgeBase },
    { name: 'amasty-faq-category', path: '/knowledge-base/:slug', component: KnowledgeBaseCategory },
    { name: 'amasty-faq-question', path: '/knowledge-base/:slug/:question', component: KnowledgeBaseQuestion }
  ])

  getSearchAdapter().then((searchAdapter) => {
    searchAdapter.registerEntityType('faq_question', {
      queryProcessor: (query) => query,
      resultProcessor: (resp, start, size) => {
        return searchAdapter.handleResult(resp, 'faq_question', start, size)
      }
    })

    searchAdapter.registerEntityType('faq_category', {
      queryProcessor: (query) => query,
      resultProcessor: (resp, start, size) => {
        return searchAdapter.handleResult(resp, 'faq_category', start, size)
      }
    })
  })
}
