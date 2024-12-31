const express = require('express')
const userController = require('../controllers/userController')
const router = express.Router()

router.get("/v1/user/:id", userController.getUserById)
router.post("/v1/user/", userController.createUser)
router.put("/v1/user/:id", userController.updateUser)
router.delete("/v1/user/:id", userController.deleteUser)

module.exports = router;