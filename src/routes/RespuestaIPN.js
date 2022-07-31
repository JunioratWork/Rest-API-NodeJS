const { Router } = require("express");
const router = Router();
const request = require('request');

router.post('/', function(req, res, next) 
{

  const datos = req.body;
  res.json(datos);
    

});

module.exports = router;