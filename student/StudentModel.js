const dBConnection = require("../config/db");
const courseModel = require("../Course/CourseModel");

async function createStudent(email,password,dob){

    try {
        // SQL to create the table if it doesn't exist
        const createTableSql = `
          CREATE TABLE IF NOT EXISTS students (
            id INT AUTO_INCREMENT PRIMARY KEY,
            email VARCHAR(255) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL,
            dob DATE NOT NULL,
            serial_number INT AUTO_INCREMENT NOT NULL
          )
        `;
        
        // Execute the create table query
        await dBConnection.execute(createTableSql);
        
        // SQL to insert the record
        const insertSql = `
          INSERT INTO students(email, password, dob) VALUES(?, ?, ?)
        `;
        
        // Execute the insert query with parameterized values
        await dBConnection.execute(insertSql, [email, password, dob]);
        
        // Return the relevant data
        return { email, dob };
      } catch (error) {
        throw error;
      }
    }

function registerCourse(course_code,email){
    try{
        const course = courseModel.getCourseByCode(course_code);
        if(!course){
            return false;
        }
        const sql = `INSERT INTO registered_courses(course_code,email) VALUES('${course_code}','${email}')`;
        return new Promise((resolve,reject)=>{
            dBConnection.execute(sql,(err,results)=>{
            if(err){
                reject(err);
            }
            resolve(results[0]);
        });
    });
    }
    catch(error){
        throw error;
    }
}

module.exports={createStudent,registerCourse}