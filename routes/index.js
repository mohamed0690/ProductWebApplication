
module.exports={ mainPage:(req,res)=>{
   let selectQuery="SELECT * FROM Products.product;";
   dp.query(selectQuery,(err,result)=>{
    if (err) {
        return res.status(500).send(err);
    }
    console.log(result);
    res.render('index.ejs',{
        title:"Welcome to Products Managements| view Products",
        products:result
    })
   })
    }
};