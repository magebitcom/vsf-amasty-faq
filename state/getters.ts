import { GetterTree } from 'vuex'
import RootState from '@vue-storefront/core/types/RootState'
import { FaqState, FaqCategory } from '../types'

const getters: GetterTree<FaqState, RootState> = {
  getCategories: state => state.categories,
  getQuestions: state => state.questions,
  getCurrentQuestion: (state, getters, rootSate, rootGetters) => {
    const params = rootGetters['url/getCurrentRoute'].params

    if (params && params.question) {
      return getters.getQuestions.find(question => question.url_key === params.question)
    }

    return null
  },
  getCurrentCategory: (state, getters, rootSate, rootGetters) => {
    const params = rootGetters['url/getCurrentRoute'].params

    if (params && params.slug) {
      return getters.getCategories.find(category => category.url_key === params.slug)
    }

    return null
  },
  getCategoryQuestions: state => (category: FaqCategory) => {
    return state.questions.filter(question => {
      return question.question_category_ids.indexOf(category.id) >= 0
    })
  }
}

export default getters
