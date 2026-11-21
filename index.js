
const { faker } = require('@faker-js/faker');
const mysql = require("mysql2");
const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");

app.use(methodOverride("_method"));
app.use(express.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));


const connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    database : 'delta_app',
    password : 'mikki'
});

//let q = "INSERT INTO user(id , username, email, password) VALUES ?";
// let data = [];
// for (let i=1; i<=100; i++){
//     data.push(getRandomUser()); // 100 fake users
// }


 //let q = "SHOW TABLES";

 //new data inserting
// let q = "INSERT INTO user(id , username, email, password) VALUES ?";
//  // let user = ["123", "123_newuser", "abc@gmail.com","abc"];
//  let users = [ 
//                 ["123b", "123_newuserb", "abcb@gmail.com","abcb"] , 
//                 ["123c", "123_newuserc", "abcc@gmail.com","abcc"]
//             ];



const  getRandomUser = ()=> {
  return [
    faker.string.uuid(),
    faker.internet.username(),
    faker.internet.email(),
    faker.internet.password(),
  ];
}



// const  getRandomUser = ()=> {
//   return {
//     userId: faker.string.uuid(),
//     username: faker.internet.username(),
//     email: faker.internet.email(),
//     password: faker.internet.password(),
//   };
// }
// console.log(getRandomUser());


// home route
app.get("/", (req, res)=>{
    let q = `SELECT count(*) FROM user`;
        try{
            connection.query(q, (err, result)=>{
                if(err) throw err;
                let count = result[0]["count(*)"];
                // result[0] prin korate response ashche-> {"count(*)":103}
                res.render("home.ejs", {count});
            });
        } catch (err) {
            console.log(err);
            res.send("some error in DB");
        }

//     res.send("Welcome to home page");
})


// show route
app.get("/user", (req, res)=>{
    let q = `select * from user`;
     try{
            connection.query(q, (err, users)=>{
                if(err) throw err;
                res.render("showusers.ejs", {users});
            });
        } catch (err) {
            console.log(err);
            res.send("some error in DB");
        }
})

app.get("/user/:id/edit", (req, res)=>{

    let {id} = req.params;
    let q = `SELECT * FROM user WHERE  id='${id}'`;
    // string pass hobe eijonno '${id}' eivabe string kora hoise
     try{
            connection.query(q, (err, result)=>{
                if(err) throw err;
                // console.log(result);
                let user  = result[0];
                res.render("edit.ejs",{user});
            });
        } catch (err) {
            console.log(err);
            res.send("some error in DB");
        }
})

// Update (DB) Route
app.patch("/user/:id", (req, res)=>{
    let {id} = req.params;
    let {password: formPass , username : newUsername} = req.body;
    let q = `SELECT * FROM user WHERE id='${id}'`;
     try{
            connection.query(q, (err, result)=>{
                if(err) throw err;
                let user  = result[0];
                if(formPass!= user.password)
                res.send("Wrong Password");
                 //res.send(user);
                else {
                    let q2 = `UPDATE user SET username='${newUsername}' WHERE id='${id}'`
                         connection.query(q2, (err, result)=>{
                            if(err) throw err;
                            //res.send(result);
                            res.redirect("/user");
                         });
                }
               
            });
        } catch (err) {
            console.log(err);
            res.send("some error in DB");
        }
});


app.listen("8080", (req,res)=>{
    console.log("server is listening on port 8080");
}) 

