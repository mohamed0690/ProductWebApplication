const fs=require('fs');
module.exports = {
    addProductPage: (req, res) => {
        res.render('product.ejs',
            {
                message: "",
                title: "Add New Product |Product App"
            })
    },
    addProduct: (req, res) => {
        if (!req.files) {
            return res.status(400).send("No Product Image Uploaded");
        }
        console.log(req.body);
        let message = "";
        let category = req.body.category;
        let title = req.body.title;
        let description = req.body.description;
        let quantity = req.body.quantity;
        let price = req.body.price;
        let uploadedFile = req.files.image;

        let insert = "INSERT INTO `Products`.`product`" +
            "(`title`,`quantity`,`price`,`catogary`,`description`,`image`)" +
            " VALUES(?)";
        let values = [title, quantity, price, category, description, uploadedFile.name];
        dp.query(insert, [values], (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            let fileExtension = uploadedFile.mimetype.split('/')[1];
            let image_name = result.insertId + '.' + fileExtension;
            if (uploadedFile.mimetype == 'image/png' ||
                uploadedFile.mimetype == 'image/jpeg' ||
                uploadedFile.mimetype == 'image/gif' ||
                uploadedFile.mimetype == 'image/jpg') {

                uploadedFile.mv('public/assets/images/' + image_name, (err) => {
                    if (err) {
                        return res.status(500).send(err);
                    }
                })
            }
            else {
                res.render('product.ejs',
                    {
                        message: "invalid image format.",
                        title: "Add New Product |Product App"
                    })
            }
            res.render('product.ejs',
                {
                    message: "Product " + result.insertId + " added Successfully",
                    title: "Add New Product |Product App"
                })
        })
    },
    editProductPage: (req, res) => {
        let productId = req.params.id;
        let selectQuery = "SELECT * FROM Products.product WHERE productID=" + productId;
        dp.query(selectQuery, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            console.log(result);
            res.render('editProduct.ejs',
                {
                    message: "",
                    title: "Edit Product |Product App",
                    product: result
                }
            )
        })
    },
    editProduct: (req, res) => {
        let message = "";
        let category = req.body.category;
        let title = req.body.title;
        let description = req.body.description;
        let quantity = req.body.quantity;
        let price = req.body.price;
        let uploadedFile = req.files.image;
        let productID = req.params.id;


        let editQuery = " UPDATE `Products`.`product` SET " +
            "`title` = '"+title+"',`quantity` = "+quantity+" ,`price` = "+price+",`catogary` = '"+category+"',`description` = '"+description+"',`image` = '"+uploadedFile+"'" +
            "WHERE `productID` = "+productID;
        
        
            dp.query(editQuery, (err, result) => {
                if (err) {
                    return res.status(500).send(err);
                }
                let fileExtension = uploadedFile.mimetype.split('/')[1];
                let image_name = productID + '.' + fileExtension;
                if (uploadedFile.mimetype == 'image/png' ||
                    uploadedFile.mimetype == 'image/jpeg' ||
                    uploadedFile.mimetype == 'image/gif' ||
                    uploadedFile.mimetype == 'image/jpg') {
    
                    uploadedFile.mv('public/assets/images/' + image_name, (err) => {
                        if (err) {
                            return res.status(500).send(err);
                        }
                    })
                }
                else {
                    res.render('editProduct.ejs',
                        {
                            message: "invalid image format.",
                            title: "Edit Product |Product App",

                        })
                }
                res.redirect('/');

            })
        },
            deleteProduct:(req, res) => {
                let productId = req.params.id;
                let deleteQuery = "DELETE FROM `Products`.`product` WHERE productID=" + productId;
                console.log(deleteQuery)
                dp.query(deleteQuery, (err, result) => {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    // fs.unlink('../public/assets/images/'+productId+'.jpeg',(err)=>{
                    //     return res.status(500).send(err);

                    // })
                    res.redirect('/')
                })
            }

    
};