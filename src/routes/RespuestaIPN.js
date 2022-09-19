const { Router } = require("express");
const router = Router();
const request = require('request');

router.post('/', function(req, res, next) 
{
    request.post(
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
