const { Router } = require("express");
const router = Router();

router.post('/', (req, res) => {
    const data = {
        "name": "Fazt",
        "Edad": "31"
    };
    res.json("Hola este es un cambio")
    
    if (body.status === 'SUCCESS')
    {
      // Send back the form token to the client side
      const datos = body.kr-answer;
      res.send(datos);
    }
    else
    {
      // Do your own error handling  
      console.error(body);
      res.status(500).send('error');
    }  
});

module.exports = router;
