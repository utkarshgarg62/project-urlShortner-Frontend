const express = require('express');
const router = express.Router();
const { shortUrl, redirect } = require("../controllers/urlController")

router.get('/', (req, res) => {
    res.send('Hello World')
})
router.post("/url/shorten", shortUrl)
router.get("/:urlCode", redirect)

module.exports = router