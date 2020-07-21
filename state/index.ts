import { Module } from 'vuex'
import RootState from '@vue-storefront/core/types/RootState'
import { FaqState } from '../types'

import actions from './actions'
import getters from './getters'
import mutations from './mutations'

export const faqModule: Module<FaqState, RootState> = {
  namespaced: true,
  state: {
    questions: [],
    categories: []
  },
  getters,
  actions,
  mutations
}
