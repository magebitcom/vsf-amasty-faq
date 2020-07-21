export interface FaqState {
  questions: FaqQuestion[],
  categories: FaqCategory[]
}

export interface FaqQuestion {
  id: number,
  title: string,
  short_answer: string,
  url_key: string,
  question_category_ids: number[],
  answer: string
}

export interface FaqCategory {
  id: number,
  title: string,
  url_key: string
}
