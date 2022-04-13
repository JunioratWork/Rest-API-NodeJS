const { Router } = require("express");
const router = Router();

/*
router.post('/', (req, res) => {
    console.log(req.body);
    res.send('recibido');
});
*/

/* Init payment form */
//router.post('/init', function(req, res, next) {

/*var order = {
    "amount":   180,
    "currency": "PEN",
    "orderId":  "myOrderId-999999",
    "customer": {
        "email": "sample@example.com"
    }
};*/

router.post('/init', (req, res) => {
  var order = req.body;

  // Call CreatePayment web service to create the form token
  const request = require('request');
  request.post({
    url: "https://api.micuentaweb.pe/api-payment/V4/Charge/CreatePayment",
    headers: {
      'Authorization': 'Basic NTE0NDczNzg6dGVzdHBhc3N3b3JkXzZBZnN6cktnVVVNbXd1eGtZTTU0b0s3RlJKdU1JVEE5NHloYlFORmtuZGswMw==',
      'Content-Type': 'application/json'
    },
    json: order
  }, function(error, response, body) {
    if (body.status === 'SUCCESS')
    {
      // Send back the form token to the client side
      const formtoken = body.answer.formToken;
      res.send(formtoken);
    }
    else
    {
      // Do your own error handling  
      console.error(body);
      res.status(500).send('error');
    }
  });
});

module.exports = router;