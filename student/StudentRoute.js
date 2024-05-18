const express = require("express");
const router = express.Router();
const studentController = require("./studentController");
const {authorizeUser,authenticateUser} = require("../middlewares/auth");
const validateFn = require("../middlewares/validationFn");
const {studentRegistration, studentLogin} = require("./studentValidation")

router.post("/register",studentController.registerStudents);
// router.post("/login",validateFn(studentLogin),studentController.login);
// router.post("/logout",authenticateUser,studentController.logout);
router.post("/register-course/:course_name",authenticateUser,authorizeUser('student'),studentController.registerCourse);
// router.delete("/drop-course",authenticateUser,authorizeUser('student'),studentController.dropCourse);

module.exports = router;