# Amasty FAQ for Vue Storefront
Implement Amasty FAQ extension in Vue Storefront! Comes with a sample layout that you can easiliy customize.

## Table of contents
* [Prerequisites](#prerequisites)
* [Installation](#installation)
  * [Magento 2 Indexer module](#magento-2-indexer-module)
  * [Vue Storefront module](#vue-storefront-module)
  * [Vue Storefront API module](#vue-storefront-api-module)
  * [Product page questions](#product-page-questions)
* [Example preview](#preview)
* [Contributing](#contributing)

### Prerequisites
* Magento 2 with [VSBridge Indexer](https://github.com/DivanteLtd/magento2-vsbridge-indexer) and [Amasty FAQ](https://amasty.com/faq-and-product-questions-for-magento-2.html) extension
* **Vue Storefront v1.12** or greater
* Vue Storefront default theme, but can be implemented with capybara.

## Installation

#### Magento 2 Indexer module
To implement this module in your project, first you'll need to install our [Amasty FAQ Indexer](https://github.com/magebitcom/vsf-amasty-faq-indexer) module for Magento 2 / VSBridge Indexer:
  * Via composer - `composer require magebit/amasty-faq-indexer`
  * For manual installation check the README here: https://github.com/magebitcom/vsf-amasty-faq-indexer

#### Vue Storefront module
  * Clone this repository inside `src/modules/`
    * `git clone git@github.com:magebitcom/vsf-amasty-faq.git ./src/modules/amasty-faq`
  * Register the module in `src/client.ts`
    ```js
    import { AmastyFaq } from './amasty-faq'
    
    export function registerClientModules () {
      //...
      
      registerModule(AmastyFaq)
    }
    ```
  * Add API endpoint to your config:
    ```json
    "amasty-faq": {
      "endpoint": "/api/ext/amasty-faq/ask"
    },
    ```

#### Vue Storefront API extension
Amasty FAQ API extension allows you to implement "Ask a question" functionality in product pages.
  * Move contents from `src/modules/amasty-faq/API` to `vue-storefront-api/src/extensions`
  * Add `amasty-faq` to the list of `registeredExtensions` in your config file.

#### Product page questions
To add "Product questions" section and "Ask us a question" modal to your product page, you can use our pre-made ProductQuestions and AskQuestionModal components:
```vue
<template>
  <!-- ... -->
  <lazy-hydrate when-idle>
    <product-questions :product="getCurrentProduct" />
  </lazy-hydrate>
  <!-- ... -->
  <ask-question-modal :product-id="getCurrentProduct.id" />
</template>

<script>
import AskQuestionModal from 'src/modules/amasty-faq/components/AskQuestionModal'
import ProductQuestions from 'src/modules/amasty-faq/components/ProductQuestions'

export default {
  components: {
    //...
    AskQuestionModal,
    ProductQuestions
  },

  // This is needed to load the questions. We are putting it
  // here so the questions are server-side rendered
  async asyncData () {
    //...
    //const product = await store.disp...
    await store.dispatch('amasty-faq/loadProductQuestions', product.id)
  }
}
</script>
```

## Preview
![Index](https://i.imgur.com/hiO2kdz.png)
![Category page](https://i.imgur.com/rPRFoF0.png)
![Product page](https://i.imgur.com/Bi1yrh6.png)
![Product page modal](https://i.imgur.com/F5wRSB4.png)

## Contributing
Found a bug, have a feature suggestion or just want to help in general?
Contributions are very welcome! Check out the [list of active issues](https://github.com/magebitcom/vsf-amasty-faq-indexer/issues) or submit one yourself.

If you're making a bug report, please include as much details as you can and preferably steps to repreduce the issue.
When creating Pull Requests, don't for get to list your changes in the [CHANGELOG](/CHANGELOG.md) and [README](/README.md) files.

---

![Magebit](https://magebit.com/img/magebit-logo-2x.png)

*Have questions or need help? Contact us at info@magebit.com*

