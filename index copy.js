import express from "express";
import bodyParser from "body-parser";
import {dirname} from "path";
import { fileURLToPath } from "url";




let __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;
const password = "YOUR PASSWORD HERE";
let userPassword = "";

const checkPass = (req, res, next)=>{
    userPassword = req.body["password"];
    next();
}

app.use(bodyParser.urlencoded({ extended: true}));
app.use(checkPass);

app.get("/", (req, res)=>{
    res.sendFile(__dirname + "/public/index.html");
});

app.post("/check", (req, res)=>{
    if (password === userPassword){
        res.sendFile(__dirname + "/public/secret.html");
    }
    else{
        // res.redirect("/");
        res.sendFile(__dirname + "/public/index.html");
    }
})

app.listen(port, ()=>{
    console.log(`Listening on port ${port}.`);
});