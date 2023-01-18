const express = require("express");
const fileUpload = require("express-fileupload");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const path = require("path");

const app = express();
const port=3000;

app.set('port',process.env.port||port);
app.set('views',path.join(__dirname,"/veiws"));
app.set('view engine','ejs');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname,'/public')));
app.use(fileUpload());

//configure routes for products app
const {mainPage}=require('./routes/index');
const {addProductPage,addProduct,editProductPage,editProduct,deleteProduct}=require('./routes/product');
app.get("/",mainPage);
app.get("/add",addProductPage);
app.post("/add",addProduct)

app.get("/edit/:id",editProductPage);
app.post("/edit/:id",editProduct);
app.get("/delete/:id",deleteProduct);
app.post("/delete/:id",deleteProduct);

//create connection to Database
const dp=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"Mah069@!",
    database:"Products"

});
dp.connect((err)=>{
    if (err) {
        console.log("Error Happend!")
    }
    console.log("Connection to Database Successed");
});
global.dp=dp;
app.listen(port,()=>{
    console.log(`Server Running with Port ${port}.....`);
}) 