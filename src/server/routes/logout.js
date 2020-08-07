const express = require('express');
const router = express.Router();


//clear jwt
router.post('/', (req, res) => {
    res.status(200);
    res.header('Set-Cookie', `token=; HttpOnly; SameSite=None`);
    res.end();
});


module.exports = router;