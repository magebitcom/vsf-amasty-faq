import { ActionTree } from 'vuex'
import RootState from '@vue-storefront/core/types/RootState'
import { FaqState } from '../types'
import { FaqCategoryService, QuestionService } from '../data-resolver'
import { FAQ_ADD_CATEGORIES, FAQ_ADD_CATEGORY, FAQ_ADD_QUESTIONS, FAQ_ADD_QUESTION } from './mutation-types'

const actions: ActionTree<FaqState, RootState> = {
  async loadCategories ({ commit }, categorySearchOptions = {}) {
    const { items } = await FaqCategoryService.getFaqCategories(categorySearchOptions)

    commit(FAQ_ADD_CATEGORIES, items)

    return items
  },

  async loadCategory ({ commit }, categorySearchOptions = {}) {
    const { items } = await FaqCategoryService.getFaqCategories(categorySearchOptions)
    const category = items && items.length ? items[0] : null

    commit(FAQ_ADD_CATEGORY, category)

    return category
  },

  async loadQuestions ({ commit }, questionSearchOptions = {}) {
    const { items } = await QuestionService.getFaqQuestions(questionSearchOptions)

    commit(FAQ_ADD_QUESTIONS, items)

    return items
  },

  async loadQuestion ({ commit }, questionSearchOptions = {}) {
    const { items } = await QuestionService.getFaqQuestions(questionSearchOptions)
    const question = items && items.length ? items[0] : null

    commit(FAQ_ADD_QUESTION, question)

    return question
  },

  async loadProductQuestions ({ commit }, productId: number) {
    const { items } = await QuestionService.getFaqQuestions({
      filters: {
        product_ids: { in: productId }
      }
    })

    commit(FAQ_ADD_QUESTIONS, items)

    return items
  },

  async ask (context, data: { name: string, email: string, question: string, productId: number }) {
    const response = await QuestionService.ask(data.name, data.email, data.question, data.productId)
    return response
  }
}

export default actions
