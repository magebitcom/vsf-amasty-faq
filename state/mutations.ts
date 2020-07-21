import { MutationTree } from 'vuex'
import { FaqState, FaqCategory, FaqQuestion } from '../types'
import { FAQ_ADD_CATEGORY, FAQ_ADD_CATEGORIES, FAQ_ADD_QUESTIONS, FAQ_ADD_QUESTION } from './mutation-types'

const mutations: MutationTree<FaqState> = {
  [FAQ_ADD_CATEGORY] (state, category: FaqCategory) {
    const categoryIds = state.categories.map(category => category.id)
    if (categoryIds.indexOf(category.id) < 0) {
      state.categories.push(category)
    }
  },

  [FAQ_ADD_QUESTION] (state, question: FaqQuestion) {
    const questionIds = state.questions.map(question => question.id)

    if (questionIds.indexOf(question.id) < 0) {
      state.questions.push(question)
    }
  },

  [FAQ_ADD_CATEGORIES] (state, categories: FaqCategory[]) {
    const categoryIds = state.categories.map(category => category.id)

    categories.forEach(category => {
      if (categoryIds.indexOf(category.id) < 0) {
        state.categories.push(category)
      }
    })
  },

  [FAQ_ADD_QUESTIONS] (state, questions: FaqQuestion[]) {
    const questionIds = state.questions.map(question => question.id)

    questions.forEach(question => {
      if (questionIds.indexOf(question.id) < 0) {
        state.questions.push(question)
      }
    })
  }
}

export default mutations
