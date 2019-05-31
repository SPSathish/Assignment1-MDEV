const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database(":memory:");

db.serialize(function(){
    db.run("CREATE TABLE Classroom (Room_number NUMBER, Building TEXT, Capacity NUMBER)");

    db.run("INSERT INTO Classroom VALUES(101, 'Packard', 500)");
    db.run("INSERT INTO Classroom VALUES(514, 'Painter', 10)");
    db.run("INSERT INTO Classroom VALUES(3128, 'Taylor', 70)");
    db.run("INSERT INTO Classroom VALUES(100, 'Watson', 30)");
    db.run("INSERT INTO Classroom VALUES(120, 'Watson', 50)");


    
    db.run("CREATE TABLE Department (Dept_name TEXT, Building TEXT, Budget NUMBER)");

    db.run("INSERT INTO Department VALUES('Biology', 'Watson', 90000)");
    db.run("INSERT INTO Department VALUES('Comp.Sci.', 'Taylor', 100000)");
    db.run("INSERT INTO Department VALUES('Elec.Eng.', 'Taylor', 85000)");
    db.run("INSERT INTO Department VALUES('Finance', 'Painter', 120000)");
    db.run("INSERT INTO Department VALUES('History', 'Painter', 50000)");
    db.run("INSERT INTO Department VALUES('Music', 'Packard', 80000)");
    db.run("INSERT INTO Department VALUES('Physics', 'Watson', 70000)");

    
    // Table CLassroom
    db.each("SELECT * FROM Classroom",function(err,row) {
        // console.log(row);

    }); 

    // Table Department
    db.each("SELECT * FROM Department",function(err,row)
    {
        // console.log(row);
    });


    // Print the room number and building name for those rooms whose capacity is greater than 50.
    db.each("SELECT building,room_number FROM Classroom WHERE Capacity>50",function(err,row){
        // console.log(row);
    });

    // Print the names of those departments whose budgets are greater than $85,000.
    db.each("SELECT Dept_name FROM DEPARTMENT WHERE Budget>85000",function(err,row){
        // console.log(row);
    });

    // For each department, print the total capacity available.
    let caps = {};
    db.each("SELECT building, capacity FROM Classroom",function(err,row){
        // console.log(row)
    });

    let depts = {};
    db.each("SELECT * FROM Department NATURAL JOIN Classroom",function(err,row){
           //console.log(row);
          if(depts[row.Dept_name] === undefined)
                   depts[row.Dept_name] = 0;
               
               depts[row.Dept_name] += row.Capacity;
           },function(err,count){
               
               let keys = Object.keys(depts);
       
               for(let i = 0; i != keys.length; ++i){
                   console.log(keys[i] + ": "+depts[keys[i]]);
               }
           
    });
  
});