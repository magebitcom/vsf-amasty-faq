<template>
  <modal
    name="modal-ask-question"
    :width="620"
  >
    <p slot="header">
      {{ $t('Ask a question') }}
    </p>
    <div slot="content">
      <form
        novalidate
        @submit.prevent="ask(onSuccesfulSubmission)"
      >
        <div class="mb10">
          <base-input
            v-model="name"
            focus
            type="text"
            name="name"
            autocomplete="name"
            :placeholder="$t('Name *')"
            :validations="[
              {
                condition: $v.name.$error && !$v.name.required,
                text: $t('Field is required.')
              }
            ]"
          />
          <base-input
            v-model="email"
            type="email"
            name="email"
            autocomplete="email"
            :placeholder="$t('E-mail address *')"
            :validations="[
              {
                condition: $v.email.$error && !$v.email.required,
                text: $t('Field is required.')
              },
              {
                condition: !$v.email.email && $v.email.$error,
                text: $t('Please provide valid e-mail address.')
              }
            ]"
          />
          <base-textarea
            v-model="question"
            type="text"
            :placeholder="$t('Question *')"
            :required="true"
            class="question-textarea"
            :validations="[
              {
                condition: $v.question.$error && !$v.question.required,
                text: $t('Field is required.')
              }
            ]"
          />
        </div>
        <button-full
          class="mb35"
          type="submit"
          :disabled="this.$v.$invalid"
        >
          {{ $t('Ask') }}
        </button-full>
      </form>
    </div>
  </modal>
</template>
<script>
import i18n from '@vue-storefront/i18n'

import ButtonFull from 'theme/components/theme/ButtonFull.vue'
import Modal from 'theme/components/core/Modal'
import BaseInput from 'theme/components/core/blocks/Form/BaseInput.vue'
import BaseTextarea from 'theme/components/core/blocks/Form/BaseTextarea.vue'

import { required, email } from 'vuelidate/lib/validators'

export default {
  name: 'AskQuestionModal',
  components: {
    ButtonFull,
    Modal,
    BaseInput,
    BaseTextarea
  },
  validations: {
    email: {
      required,
      email
    },
    name: {
      required
    },
    question: {
      required
    }
  },

  props: {
    productId: {
      required: true,
      type: Number
    }
  },

  data () {
    return {
      email: '',
      name: '',
      question: ''
    }
  },
  beforeDestroy () {
    this.$off('validation-error')
  },
  methods: {
    onSuccesfulSubmission (isSubscribed) {
      if (isSubscribed) {
        this.$store.dispatch('notification/spawnNotification', {
          type: 'success',
          message: i18n.t('The question has been submitted. You will receive an answer shortly!'),
          action1: { label: i18n.t('OK') }
        })
      }

      this.$bus.$emit('modal-hide', 'modal-ask-question')
    },
    async ask () {
      if (!this.$v.$invalid) {
        try {
          const response = await this.$store.dispatch('amasty-faq/ask', {
            name: this.name,
            email: this.email,
            question: this.question,
            productId: this.productId
          })

          if (!response.result || response.code !== 200) {
            throw new Error(response.result.errorMessage)
          }

          this.$store.dispatch('notification/spawnNotification', {
            type: 'success',
            message: i18n.t('The question has been submitted. You will receive an answer shortly!'),
            action1: { label: i18n.t('OK') }
          })

          this.name = ''
          this.email = ''
          this.question = ''
          this.$v.$reset()
        } catch (err) {
          this.$store.dispatch('notification/spawnNotification', {
            type: 'error',
            message: i18n.t('Something went wrong. We couldn\'t submit your question'),
            action1: { label: i18n.t('OK') }
          })
          console.error(err)
        }

        this.$bus.$emit('modal-hide', 'modal-ask-question')
      }
    }
  }
}
</script>
