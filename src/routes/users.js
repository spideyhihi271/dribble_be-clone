const express = require('express');
const router = express.Router();

const userController = require('../app/controllers/UserControllers')
const tokenMiddleWare = require('../app/middlewares/tokenMiddleWare');

// GET api/v1/user/getinfo/:id
router.get('/info/:id', userController.getUserById)
// POST api/v1/user/updateinfo/:id/password/
router.patch('/update/password', tokenMiddleWare.veryfyToken, userController.updatePassword);
// POST api/v1/user/updateinfo/:id/password/
router.patch('/update/info', tokenMiddleWare.veryfyToken, userController.updateInfo);
// POST api/v1/user/updateinfo/:id/more
router.patch('/update/:id/more', tokenMiddleWare.veryfyToken, userController.updateMore);
// POST api/v1/user/updateinfo/:id/more
router.patch('/update/socials', tokenMiddleWare.veryfyToken, userController.updateSocial);
// POST api/v1/user/updateinfo/:id/more
router.patch('/update/skills', tokenMiddleWare.veryfyToken, userController.updateSkills);
// GET api/v1/user/follow/:id
router.patch('/update/follow/:id', tokenMiddleWare.veryfyToken, userController.updateFollow)
module.exports = router;