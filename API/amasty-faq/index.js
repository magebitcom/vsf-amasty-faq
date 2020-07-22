import { apiStatus } from '../../../lib/util'
import { Router } from 'express'
import { Magento2Client } from 'magento2-rest-client'

module.exports = ({ config }) => {
  let router = Router();

  /**
   * POST ask a question
   */
  router.post('/ask', (req, res) => {
    const userData = req.body

    if (!userData.email || !userData.name || !userData.question || !userData.productId) {
      apiStatus(res, 'Invalid data provided!', 500)
      return
    }

    const client = Magento2Client(config.magento2.api);

    client.addMethods('faq', (restClient) => {
      var module = {};

      module.send = function (params) {
        return restClient.post('/amasty_faq/question', params);
      }
      return module;
    })

    const request = {
      'question': {
        'title': userData.question,
        'email': userData.email,
        'name': userData.name,
        'product_ids': userData.productId
      }
    }

    client.faq.send(request).then((result) => {
      apiStatus(res, result, 200);
    }).catch(err => {
      apiStatus(res, err, 500);
    })
  })

  return router
}
