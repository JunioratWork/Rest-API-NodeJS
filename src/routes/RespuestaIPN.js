const { Router } = require("express");
const router = Router();
const request = require('request');

router.post('/', function(req, res, next) 
{

  const datos = req.params;
  res.json(datos.kr-answer);
    

});

module.exports = router;
