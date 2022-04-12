const { Router } = require("express");
const router = Router();

router.get('/', (req, res) => {
    const data = {
        "name": "Fazt",
        "Edad": "31"
    };
    res.json("Hola esta es una prueba para ver si se sube algo")
});

module.exports = router;