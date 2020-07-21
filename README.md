# Amasty FAQ for Vue Storefront
Implement Amasty FAQ extension in Vue Storefront! Comes with a sample layout that you can easiliy customize.

## Table of contents
* [Prerequisites](#prerequisites)
* [Installation](#installation)
  * [Magento 2 Indexer module](#magento-2-indexer-module)
  * [Vue Storefront module](#vue-storefront-module)
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


## Preview
![Index](https://i.imgur.com/hiO2kdz.png)
![Category page](https://i.imgur.com/rPRFoF0.png)

## Contributing
Found a bug, have a feature suggestion or just want to help in general?
Contributions are very welcome! Check out the [list of active issues](https://github.com/magebitcom/vsf-amasty-faq-indexer/issues) or submit one yourself.

If you're making a bug report, please include as much details as you can and preferably steps to repreduce the issue.
When creating Pull Requests, don't for get to list your changes in the [CHANGELOG](/CHANGELOG.md) and [README](/README.md) files.

---

![Magebit](https://magebit.com/img/magebit-logo-2x.png)

*Have questions or need help? Contact us at info@magebit.com*

