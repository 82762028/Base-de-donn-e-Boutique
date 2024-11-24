


const express = require("express")

const router=express.Router();
const categoryController = require('../controllers/categoryController');

router.get('/category', categoryController.homepage);
//router.get('/about', productController.about);
router.get('/product_cat/:id', categoryController.produit_cat);
router.get('/addCategory', categoryController.addCategory);
router.post('/addCategory', categoryController.postCategory);

router.get('/viewCategory/:id', categoryController.view);

router.get('/editCategory/:id', categoryController.edit);
router.put('/editCategory/:id', categoryController.editPost);
router.delete('/editCategory/:id', categoryController.deleteCategory);

router.post('/searchCategory', categoryController.searchCategory);




module.exports=router;
