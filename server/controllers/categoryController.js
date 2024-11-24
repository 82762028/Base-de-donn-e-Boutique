





const Product = require('../models/Product');
const Category = require('../models/Category');

const mongoose = require('mongoose');

/* customer router
*/
exports.homepage = async (req,res)=>{
    const client = req.session.client
    const messages = await req.flash('info');
    const locals = {
        title:'Category',
        description:'Category Management'
    }
  let perPage=6;//12 document par page
  let page = req.query.page || 1;//par defaut 1
    try {
        const categorys = await Category.aggregate([{$sort: { updatedAt:-1}}])
        .skip(perPage*page -perPage)
        .limit(perPage)
        .exec();//excecute agregation
        const count = await Category.count();
        res.render('category',{
            client,
            locals,
            categorys,
            current:page,
            pages: Math.ceil(count/perPage),
            messages
        })
        /*
    const customers = await Customer.find({}).limit(22)
    res.render('index',{locals,messages,customers});
   */
}catch(error){

   console.log(error)
    }
}



exports.produit_cat = async (req,res)=>{
  
    try{
        const client = req.session.client

        const category = await Category.findOne({_id: req.params.id })
        const products = await Product.find().exec();
       const locals = {
        title:'Edit New Customer Data',
        description:'Free NodeJS User Management',
       }

       res.render('produit_cat',{
        client,  
        locals,
          category,
          products
       })
    }
     catch(error){
        console.log(error);
    }

}




/* new customer*/

exports.addCategory = async (req,res)=>{
    const client = req.session.client;

    const locals = {
        title:'Add New Customer - NodeJS',
        description:'Free NodeJS User Management'
    }
    res.render('category/add',{locals,client}); 
}



exports.postCategory = async (req,res)=>{

    const newCategory = new Category({
        name: req.body.Name,
        description: req.body.Description,
    });
    console.log(Category)

 try{
   await Category.create(newCategory);
   await req.flash('info','New product has been added')
   res.redirect('/category');
 }catch(error){
   console.log(error)
 }
}



exports.view = async (req,res)=>{
  
    try{
        const client = req.session.client;

    const category = await Category.findOne({_id: req.params.id })
       const locals = {
        title:'Add New Category - NodeJS',
        description:'Free NodeJS User Management',
       }

       res.render('category/view',{
          locals,
          category,
          client
       })
    }
     catch(error){
        console.log(error);
    }

}


exports.edit = async (req,res)=>{
  
    try{    const client = req.session.client;

        const category = await Category.findOne({_id: req.params.id })
       const locals = {
        title:'Edit New Customer Data',
        description:'Free NodeJS User Management',
       }

       res.render('category/edit',{
          locals,
          client,
          category
       })
    }
     catch(error){
        console.log(error);
    }

}
//update put
exports.editPost = async (req,res)=>{
  
    try{
       await Category.findByIdAndUpdate((req.params.id),{
        name: req.body.Name,
        description: req.body.Description,
        updatedAt:Date.now()
       });
       res.redirect(`/editCategory/${req.params.id}`);
    }
     catch(error){
        console.log(error);
    }

}

/* 
* Delete /
Delete Customer
*/
exports.deleteCategory = async (req,res)=>{
  
    try{
      await Category.deleteOne({_id: req.params.id});
      res.redirect("/category")
    }
     catch(error){
        console.log(error);
    }

}

/* 
* post /
search Customer
*/

exports.searchCategory = async (req,res)=>{
    const client= req.session.client
    const locals = {
        title:'search New Category Data',
        description:'Free NodeJS User Management',
       }

try{
    let searchTerm = req.body.searchTerm;
    const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9]/g, "");
    const categorys = await Category.find({
        $or: [
            {name: {$regex: new RegExp(searchNoSpecialChar,"i") }},
            
 
        ]
    });
    res.render("searchCategory",{
        client,
        categorys,
        locals
    })

  } catch(error){
    console.log(error);
  }

}

exports.about = async (req,res)=>{
    const locals = {
        title:'NODEJS',
        description:'free node user Management'
    }

    try {
   
        res.render('about',{
            locals,
        })
        /*
    const customers = await Customer.find({}).limit(22)
    res.render('index',{locals,messages,customers});
   */
}catch(error){

   console.log(error)
    }
}


