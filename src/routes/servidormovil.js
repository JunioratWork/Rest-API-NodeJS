const { Router } = require("express");
const router = Router();
const request = require('request');




router.post('/', function(req, res, next) 
{
  //var order = req.body;
  
  //console.log("Este es la informacion del BODY antes de entrar a los IF: ");
  //console.log(isEmptyObject(order));
  
  //if(isEmptyObject(order) === true || isEmptyObject(order) === 'undefined'){
     /*var order = {
        "vads_action_mode": req.body.vads_action_mode,
        "vads_amount": req.body.vads_amount,
        "vads_ctx_mode":  req.body.vads_ctx_mode,
        "vads_currency":  req.body.vads_currency,
        "vads_page_action":  req.body.vads_page_action,
        "vads_payment_config":  req.body.vads_payment_config,
        "vads_site_id":  req.body.vads_site_id,
        "vads_trans_date":  req.body.vads_trans_date,
        "vads_trans_id":  req.body.vads_trans_id,
        "vads_version":  req.body.vads_version,
        "signature":  req.body.signature
      };  */
      const params = `vads_action_mode=${req.body.vads_action_mode}&vads_amount=${req.body.vads_amount}&vads_ctx_mode=${req.body.vads_ctx_mode}&vads_currency=${req.body.vads_currency}&vads_page_action=${req.body.vads_page_action}&vads_payment_config=${req.body.vads_payment_config}&vads_site_id=${req.body.vads_site_id}&vads_trans_date=${req.body.vads_trans_date}&vads_trans_id=${req.body.vads_trans_id}&vads_version=${req.body.vads_version}&signature=${req.body.signature}`; 
      //console.log("Este es la informacion del BODY en el IF: ");
      //console.log(order);
 // }
  //else{
  //  order = req.body;
    //console.log("Este es la informacion del BODY en el ELSE: ");
    //console.log(order);
 // } 

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
    url: `https://secure.micuentaweb.pe/vads-payment/entry.silentInit.a?${params}`,
    /*headers: {
      'Authorization': 'Basic NTE0NDczNzg6dGVzdHBhc3N3b3JkXzZBZnN6cktnVVVNbXd1eGtZTTU0b0s3RlJKdU1JVEE5NHloYlFORmtuZGswMw==',
      'Content-Type': 'application/json'
    },*/
    json: true
  }, 
  function(error, response, body) {

    if (body.status === 'INITIALIZED')
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