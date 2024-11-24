
const Product = require('../models/Product');
const Category = require('../models/Category');

const mongoose = require('mongoose');

/* customer router
*/
exports.homepage = async (req,res)=>{
    const client = req.session.client;
    const messages = await req.flash('info');
    const locals = {
        title:'PRODUCTS',
        description:'Prodduit Management'
    }
  let perPage=6;//12 document par page
  let page = req.query.page || 1;//par defaut 1
    try {
        const products = await Product.aggregate([{$sort: { updatedAt:-1}}])
        .skip(perPage*page -perPage)
        .limit(perPage)
        .exec();//excecute agregation
        const count = await Product.count();
        res.render('produit',{
            client,
            locals,
            products,
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
exports.categoryProduct = async (req,res)=>{
    const client = req.session.client;
    const messages = await req.flash('info');
    const locals = {
        title:'PRODUCTS',
        description:'Prodduit Management'
    }
  let perPage=6;//12 document par page
  let page = req.query.page || 1;//par defaut 1
    try {
        const products = await Product.aggregate([{$sort: { updatedAt:-1}}])
        .skip(perPage*page -perPage)
        .limit(perPage)
        .exec();//excecute agregation
        const count = await Product.count();
        res.render('produit_cat',{
            client,
            locals,
            products,
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



/* new customer*/

exports.addProduct = async (req,res)=>{
    const client = req.session.client;
    const categorys = await Category.find().exec();
    const locals = {
        title:'Add New Customer - NodeJS',
        description:'Free NodeJS User Management'
    }
    res.render('product/add',{locals,categorys,client}); 
}



exports.postProduct = async (req,res)=>{

    const newProduct = new Product({
        name: req.body.Name,
        prix: req.body.Prix,
        category: req.body.Category,
        stock: req.body.Stock,
    });
    console.log(newProduct)

 try{
   await Product.create(newProduct);
   await req.flash('info','New product has been added')
   res.redirect('/product');
 }catch(error){
   console.log(error)
 }
}



exports.view = async (req,res)=>{
  
    try{
        const client= req.session.client
    const product = await Product.findOne({_id: req.params.id })
       const locals = {
        title:'Add New Customer - NodeJS',
        description:'Free NodeJS User Management',
       }

       res.render('product/view',{
        client,
          locals,
          product
       })
    }
     catch(error){
        console.log(error);
    }

}


exports.edit = async (req,res)=>{
  
    try{  const categorys = await Category.find().exec();
        const client= req.session.client
        const product = await Product.findOne({_id: req.params.id })
       const locals = {
        title:'Edit New Customer Data',
        description:'Free NodeJS User Management',
       }

       res.render('product/edit',{
        client,
          locals,
          product,categorys
       })
    }
     catch(error){
        console.log(error);
    }

}
//update put
exports.editPost = async (req,res)=>{
  
    try{
       await Product.findByIdAndUpdate((req.params.id),{
        name: req.body.Name,
        prix: req.body.Prix,
        category: req.body.Category,
        stock: req.body.Stock,
        updatedAt:Date.now()
       });
       res.redirect(`/editProduct/${req.params.id}`);
    }
     catch(error){
        console.log(error);
    }

}

/* 
* Delete /
Delete Customer
*/
exports.deleteProduct = async (req,res)=>{
  
    try{
      await Product.deleteOne({_id: req.params.id});
      res.redirect("/product")
    }
     catch(error){
        console.log(error);
    }

}

/* 
* post /
search Customer
*/

exports.searchProduct = async (req,res)=>{
    const client= req.session.client
    const locals = {
        title:'search New Customer Data',
        description:'Free NodeJS User Management',
       }

try{
    let searchTerm = req.body.searchTerm;
    const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9]/g, "");
    const products = await Product.find({
        $or: [
            {name: {$regex: new RegExp(searchNoSpecialChar,"i") }},
            {category: {$regex: new RegExp(searchNoSpecialChar,"i") }},
 
        ]
    });
    res.render("searchProduct",{
        products,
        locals,
        client
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


/*  c'etait un test
 exports.addCustomer= async(req,res)=>{
   try{
    await Customer.insertMany([{
    
        firstname: "req.body.firstName",
        lastname: "req.body.lastName",
        tel: 55555,
        details: "req.body.details",
        email: "req.body.email"
   },
   {
    
    firstname: "req.body.firstName",
    lastname: "req.body.lastName",
    tel: 55555,
    details: "req.body.details",
    email: "req.body.email"
},
{
    
    firstname: "req.body.firstName",
    lastname: "req.body.lastName",
    tel: 55555,
    details: "req.body.details",
    email: "req.body.email"
},
{
    
    firstname: "req.body.firstName",
    lastname: "req.body.lastName",
    tel: 55555,
    details: "req.body.details",
    email: "req.body.email"
},
{
    
    firstname: "req.body.firstName",
    lastname: "req.body.lastName",
    tel: 55555,
    details: "req.body.details",
    email: "req.body.email"
},
])

}
catch(error){
    console.log(error)
}

 }
*/
/*post*/


/*

exports.homepage = async (req,res)=>{
    const messages = await req.flash('info');
    const locals = {
        title:'NODEJS',
        description:'free node user Management'
    }

    try {
    const customers = await Customer.find({}).limit(22)
    res.render('index',{locals,messages,customers});
   
}catch(error){

   console.log(error)
    }
}


*/
