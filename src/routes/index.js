const { Router } = require("express");
const router = Router();

router.get('/', (req, res) => {
    const data = {
        "name": "Fazt",
        "Edad": "31"
    };
    res.json("Hola este es un cambio")
});

module.exports = router;