const { Router } = require("express");
const router = Router();

router.get('/test', (req, res) => {
    const data = {
        "name": "Fazt",
        "Edad": "31"
    };
    res.json(data);
});

module.exports = router;