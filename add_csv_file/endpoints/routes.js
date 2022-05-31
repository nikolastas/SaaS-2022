const express = require('express');
const add = require('../controller/add.js');
const request = require('../controller/request.js');
// const answersController = require('../controllers/answers');
// const isAuth = require('../middlewares/authentication')

const router = express.Router();


router.get("/upload/:foldername/:filename", add.upload_csv);

router.get("/get", request.make_request);

module.exports = router;