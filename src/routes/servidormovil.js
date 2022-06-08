const { Router } = require("express");
const router = Router();
const request = require('request');

router.post('/', function(req, res, next) 
{
  var order = req.body;
  
  //console.log("Este es la informacion del BODY antes de entrar a los IF: ");
  //console.log(isEmptyObject(order));
  
  if(isEmptyObject(order) === true || isEmptyObject(order) === 'undefined'){
      order = {
        "vads_action_mode": "INTERACTIVE",
        "vads_amount": "2800",
        "vads_ctx_mode":  "TEST",
        "vads_currency":  "604",
        "vads_page_action":  "PAYMENT",
        "vads_payment_config":  "SINGLE",
        "vads_site_id":  "51447378",
        "vads_trans_date":  "20220608230619",
        "vads_trans_id":  "abc134",
        "vads_version":  "V2",
        "signature":  "K7YSUHDR6ybbQKhJl4xaaptiCXxDGM9wkCj5dKgeYnk"
      };    
      //console.log("Este es la informacion del BODY en el IF: ");
      //console.log(order);
  }
  else{
    order = req.body;
    //console.log("Este es la informacion del BODY en el ELSE: ");
    //console.log(order);
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
    url: "https://secure.micuentaweb.pe/vads-payment/entry.silentInit.a",
    /*headers: {
      'Authorization': 'Basic NTE0NDczNzg6dGVzdHBhc3N3b3JkXzZBZnN6cktnVVVNbXd1eGtZTTU0b0s3RlJKdU1JVEE5NHloYlFORmtuZGswMw==',
      'Content-Type': 'application/json'
    },*/
    json: order
  }, 
  function(error, response, body) {

    if (body.status === 'SUCCESS')
    {
      // Send back the form token to the client side
      const formtoken = body;
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