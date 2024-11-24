const express = require("express")

const router=express.Router();
const productController = require('../controllers/productController');

router.get('/product', productController.homepage);
//router.get('/about', productController.about);

router.get('/addProduct', productController.addProduct);
router.post('/addProduct', productController.postProduct);

router.get('/viewProduct/:id', productController.view);

router.get('/editProduct/:id', productController.edit);
router.put('/editProduct/:id', productController.editPost);
router.delete('/editProduct/:id', productController.deleteProduct);

router.post('/searchProduct', productController.searchProduct);





module.exports=router;