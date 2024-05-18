const studentModel = require("./StudentModel");
const jwt = require("../utils/jwtFn");
const bcrypt = require("../utils/bcryptFn");
const { request } = require("express");
const courseModel = require("../Course/CourseModel")

async function registerStudents(req,res){
    try{
        const {email,password,dob} = req.body;
        const studentData = await studentModel.createStudent(email,password,dob);
        console.log("saved");
        const token = jwt.generateToken({email:email,role:"student"});
        res.header('Authorization',`Bearer ${token}`);
        res.status(200).json({message:"Student Registered Successfully", data : studentData});
    }
    catch(error){
        res.status(500).json({message:"Internal Server Error"});
    }
}

function registerCourse(req,res){
    try{
        const {course_code} = req.body;
        const email = req.user.email
        const result = studentModel.registerCourse(course_code,email);
        if(!result){
            return res.status(400).json({message:"Invalid Course Code"});
        }
        res.status(200).json({message:"Course Registered Successfully"});
    }
    catch(error){
        res.status(500).json({message:"Internal Server Error"});
    }
};

const dropCourse = (req, res) => {
   try{
    const {course_code} = req.params.course_name;
    const email = req.user.email;
    if (!result){
        return res.status(400).json({ message: "Invalid Course Code"});
    }
const result =  studentModel.dropCourse(course_code, email);
 res.status(200).json({ message: "Course deleted successfully"});   
   } catch (error) {
res.status(500).json({ message: "Internal Server Error" });
   }
}

module.exports = {
    registerStudents,
    registerCourse,
    // login,
    // logout,
    // getStudents,
    // getStudent,
    // updateStudent,
    // deleteStudent,
    dropCourse,
};