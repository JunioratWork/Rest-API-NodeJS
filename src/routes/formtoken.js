const { Router } = require("express");
const router = Router();
const request = require('request');

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

//router.post('/init', (req, res) => {
router.post('/init', function(req, res, next) 
{
  var order = req.body;
  
  console.log("Este es la informacion del BODY antes de entrar a los IF: ");
  console.log(isEmptyObject(order));
  
  if(isEmptyObject(order) === true || isEmptyObject(order) === 'undefined'){
      order = {
        "amount":   180,
        "currency": "PEN",
        "orderId":  "myOrderId-999999",
        "customer": {
            "email": "sample@example.com"
        }
      };    
      console.log("Este es la informacion del BODY en el IF: ");
      console.log(order);
  }
  else{
    order = req.body;
    console.log("Este es la informacion del BODY en el ELSE: ");
    console.log(order);
  } 

  //comprueba si el body esta vacio, devuelve true si esta vacio
  function isEmptyObject(obj) {
    for (var property in obj) {
        if (obj.hasOwnProperty(property)) {
            return false;
        }
    }
 
    return true;
  }

  // Call CreatePayment web service to create the form token 
  request.post({
    url: "https://api.micuentaweb.pe/api-payment/V4/Charge/CreatePayment",
    headers: {
      'Authorization': 'Basic OTIyMzc0MTU6dGVzdHBhc3N3b3JkX2lqcGxCMU90dXU4eko1eHlsdDVkREdjSnZrQnlmRDBMN0p3ZTdlc2dqM2cwZQ==',
      'Content-Type': 'application/json'
    },
    json: order
  }, 
  function(error, response, body) {

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