const express = require('express');
const router = express.Router();
const urlController=require("../controllers/urlController")


router.post("/url/shorten", urlController.shortUrl)

router.get("/:urlCode",urlController.redirect)

module.exports=router