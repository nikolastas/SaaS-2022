const express = require('express');
const add = require('../controller/modify.js');
const modify_controller = require('../controller/modify.js');
// const answersController = require('../controllers/answers');
// const isAuth = require('../middlewares/authentication')

const router = express.Router();

//TODO: add correct routes
// router.get("/upload/:foldername/:filename", add.upload_csv);

router.get("/modify", modify_controller.modify);

module.exports = router;