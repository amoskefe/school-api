const courseModel = require("./CourseModel");

function createCourse(req,res){
    try{
    const { course_name,course_code,course_units}=req.body;
    if(courseModel.getCourse(course_name)){
        res.status(400).json({message:"Course exists already"});
    }
    courseModel.createCourse(course_name,course_code,course_units)}
    catch(err){
        res.status(500).json({message:"Error creating course",error:err});
    }    
}

function getAllCourses(req,res){
    try{
        const courses = courseModel.getAllCourses();
        res.status(200).json({courses});
    }
    catch(err){
        res.status(500).json({message:"Error fetching courses",error:err});
    }
}

module.exports = {
    createCourse, getAllCourses
}