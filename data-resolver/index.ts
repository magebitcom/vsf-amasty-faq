import config from 'config';
import { processURLAddress } from '@vue-storefront/core/helpers';
import { TaskQueue } from '@vue-storefront/core/lib/sync'
import get from 'lodash-es/get'
import { SearchQuery } from 'storefront-query-builder'
import { quickSearchByQuery } from '@vue-storefront/core/lib/search'

const ask = async (name: string, email: string, question: string, productId: number): Promise<boolean> => {
  const response = await TaskQueue.execute({
    url: processURLAddress(config.faq.endpoint),
    payload: {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      mode: 'cors',
      body: JSON.stringify({ name: name, email: email, question: question, productId: productId })
    }
  })

  return response.code === 200
}

const getFaqQuestions = async ({
  filters = {},
  onlyActive = true,
  size = 4000,
  start = 0,
  sort = 'position:asc',
  includeFields = config.entities.optimize ? get(config, 'entities.faq_question.includeFields', null) : null,
  excludeFields = config.entities.optimize ? get(config, 'entities.faq_question.excludeFields', null) : null
}) => {
  let searchQuery = new SearchQuery()

  for (const [key, value] of Object.entries(filters)) {
    if (value === null) continue

    if (Array.isArray(value)) {
      searchQuery = searchQuery.applyFilter({ key, value: { 'in': value } })
    } else if (typeof value === 'object') {
      searchQuery = searchQuery.applyFilter({ key, value })
    } else {
      searchQuery = searchQuery.applyFilter({ key, value: { 'eq': value } })
    }
  }

  if (onlyActive) {
    searchQuery = searchQuery.applyFilter({ key: 'status', value: { 'eq': 1 } })
    searchQuery = searchQuery.applyFilter({ key: 'visibility', value: { 'eq': 1 } })
  }

  const response = await quickSearchByQuery({
    entityType: 'faq_question',
    query: searchQuery,
    sort,
    size,
    start,
    includeFields,
    excludeFields
  })

  return {
    items: response.items,
    response
  }
}

export const QuestionService = {
  ask,
  getFaqQuestions
}

const getFaqCategories = async ({
  filters = {},
  onlyActive = true,
  size = 4000,
  start = 0,
  sort = 'position:asc',
  includeFields = config.entities.optimize ? get(config, 'entities.faq_category.includeFields', null) : null,
  excludeFields = config.entities.optimize ? get(config, 'entities.faq_category.excludeFields', null) : null
}) => {
  let searchQuery = new SearchQuery()

  for (const [key, value] of Object.entries(filters)) {
    if (value === null) continue

    if (Array.isArray(value)) {
      searchQuery = searchQuery.applyFilter({ key, value: { 'in': value } })
    } else if (typeof value === 'object') {
      searchQuery = searchQuery.applyFilter({ key, value })
    } else {
      searchQuery = searchQuery.applyFilter({ key, value: { 'eq': value } })
    }
  }

  if (onlyActive) {
    searchQuery = searchQuery.applyFilter({ key: 'status', value: { 'eq': 1 } })
  }

  const response = await quickSearchByQuery({
    entityType: 'faq_category',
    query: searchQuery,
    sort,
    size,
    start,
    includeFields,
    excludeFields
  })

  return {
    items: response.items,
    response
  }
}

export const FaqCategoryService = {
  getFaqCategories
}
