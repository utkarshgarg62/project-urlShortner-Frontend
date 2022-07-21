const validUrl = require("valid-url")
const shortId = require("shortid")
const urlModel = require("../model/urlModel")
const redis = require("redis");
const { promisify } = require("util");

//================================================[Connection for Redis]===========================================================

//Connect to redis
const redisClient = redis.createClient(
    12894,
    "redis-12894.c301.ap-south-1-1.ec2.cloud.redislabs.com",
    { no_ready_check: true }
);
redisClient.auth("w0xgYCw0xpqkaaMXMAUyTtYoArA06B56", function (err) {
  if (err) throw err;
});

redisClient.on("connect", async function () {
    console.log("Connected to Redis..");
});



const SET_ASYNC = promisify(redisClient.SETEX).bind(redisClient);
const GET_ASYNC = promisify(redisClient.GET).bind(redisClient);


//==================================================[Api to Shorten Url]===========================================================

const shortUrl = async function (req, res) {
    try {
        let baseUrl = "http://localhost:3000"
        let url = req.body.longUrl

        if(Object.keys(req.body)==0 || !url || typeof(url)!="string") return res.status(400).send({status:false,message:"Please Provide Url"})

        url=url.trim()

        if (!validUrl.isUri(url)) return res.status(404).send({ status: false, message: "Invalid Url" })

        let cachedUrl = await GET_ASYNC(`${url}`)

        if(!cachedUrl){
            let urlCode = shortId.generate(url).toLowerCase()
            let shortUrl = baseUrl + "/" + urlCode
            const saveData = await urlModel.create({
                longUrl: url,
                shortUrl: shortUrl,
                urlCode: urlCode
            })
            let saveData1 = await urlModel.findById(saveData._id).select({ _id: 0, __v: 0 })
            await SET_ASYNC(`${url}`,20, JSON.stringify(saveData1))
            return res.status(201).send({ status: true, data: saveData1 })
        }
        else{
            let urlData= JSON.parse(cachedUrl)
            return res.status(200).send({ status: true, data: urlData })
        }
    }
    catch (err) {
        res.status(500).send({ status: false, message: err.mesaage })
    }
}
module.exports.shortUrl = shortUrl


//==================================================[Redirecting to LongUrl]===========================================================


const redirect = async function (req, res) {
    try {
        let urlCode = req.params.urlCode
    
        let cachedData = await GET_ASYNC(`${urlCode}`)
      
        if(cachedData) {
          let getLongUrl = JSON.parse(cachedData)
          return res.redirect(302,getLongUrl.longUrl)
        } else {
            let urlData = await urlModel.findOne({ urlCode: urlCode })
            if (!urlData) return res.status(404).send({ status: false, message: "No url found" })
            await SET_ASYNC(`${urlCode}`,20, JSON.stringify(urlData))
            let longUrl = urlData.longUrl
            return res.redirect(302,longUrl)
        }
    }
    catch (err) {
        res.status(500).send({ status: false, message: err.message })
    }
}
module.exports.redirect = redirect
