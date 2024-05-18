const express = require("express");
const router = express.Router();
const teacherController = require("./TeacherController")
const auth = require("../middlewares/auth");
const studentController = require("../student/StudentController");

const validationFn = require("../middlewares/validationFn")
const {authorizeUser,authenticateUser} = require("../middlewares/auth")
const teacherSchema = require("./TeacherValidation")
const {loginTeacher, register} = require("./TeacherValidation")

router.post("/register", teacherController.registerTeacher);
router.post("/login", teacherController.loginTeacher);
router.post("/logout", authenticateUser, teacherController.logoutTeacher);
router.post("/register-course",auth.authenticateUser,auth.authorizeUser('student'),studentController.registerCourse);
router.get("/all", teacherController.getTeachers);//ONLY an admin should do this
router.get("/:email", authenticateUser, teacherController.getTeacher); //only an admin
router.put("/update", authenticateUser, authorizeUser("teacher"),teacherController.updateTeacher);
router.delete("/delete",authenticateUser, authorizeUser("admin"), teacherController.deleteTeacher);

module.exports = router;