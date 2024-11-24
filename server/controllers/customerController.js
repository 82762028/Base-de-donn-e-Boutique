
const Commandes = require('../models/Command')
const Customer = require('../models/Customer');
const Category = require('../models/Category');
const mongoose = require('mongoose');

/* customer router
*/
exports.homepage = async (req,res)=>{
    const client = req.session.client;

    const messages = await req.flash('info');
    const locals = {
        title:'NODEJS',
        description:'free node user Management'
    }
  let perPage=6;//12 document par page
  let page = req.query.page || 1;//par defaut 1
    try {
        const customers = await Customer.aggregate([{$sort: { updatedAt:-1}}])
        .skip(perPage*page -perPage)
        .limit(perPage)
        .exec();//excecute agregation
        const count = await Customer.count();
        res.render('index',{
            locals,
            customers,
            current:page,
            pages: Math.ceil(count/perPage),
            messages,
            client
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

exports.addCustomer = async (req,res)=>{
    const client = req.session.client;
    const categorys = await Category.find().exec();
    const locals = {
        title:'Add New Customer - NodeJS',
        description:'Free NodeJS User Management'
    }
    res.render('customer/add',{locals,categorys,client}); 
}



exports.postCustomer = async (req,res)=>{

    const newCustomer = new Customer({
        idClient: req.body.idClient,
        firstname: req.body.firstName,
        lastname: req.body.lastName,
        tel: req.body.tel,
        details: req.body.details,
        category: req.body.Category,
        mdp: req.body.mdp,
        admin: req.body.admin,
        email: req.body.email,
        
    });
    console.log(newCustomer)

 try{
    await Customer.create(newCustomer);
   //await Customer.deleteMany({category: "categorie1" || "categorie2" || "categorie3"})
   await req.flash('info','New customer has been added')
   res.redirect('/');
 }catch(error){
   console.log(error)
 }
}



exports.view = async (req,res)=>{
  
    try{
      const client = req.session.client
        const customer = await Customer.findOne({_id: req.params.id })
       const locals = {
        title:'Add New Customer - NodeJS',
        description:'Free NodeJS User Management',
       }

       res.render('customer/view',{
        client,
          locals,
          customer
       })
    }
     catch(error){
        console.log(error);
    }

}


exports.edit = async (req,res)=>{
  
    try{
      const client= req.session.client
        const categorys = await Category.find().exec();
        const customer = await Customer.findOne({_id: req.params.id })
       const locals = {
        title:'Edit New Customer Data',
        description:'Free NodeJS User Management',
       }

       res.render('customer/edit',{
          locals,
          customer,
          categorys,
          client
       })
    }
     catch(error){
        console.log(error);
    }

}
//update put
exports.editPost = async (req,res)=>{
  
    try{
       await Customer.findByIdAndUpdate((req.params.id),{
        idClient:req.body.idClient,
        firstname: req.body.firstName,
        lastname: req.body.lastName,
        tel: req.body.tel,
        details: req.body.details,
        category: req.body.Category,
        mdp: req.body.mdp,
        admin: req.body.admin,
        email: req.body.email,
        updatedAt:Date.now()
       });
       res.redirect(`/edit/${req.params.id}`);
    }
     catch(error){
        console.log(error);
    }

}

/* 
* Delete /
Delete Customer
*/
exports.deleteCustomer = async (req,res)=>{
  
    try{
      await Customer.deleteOne({_id: req.params.id});
      res.redirect("/")
    }
     catch(error){
        console.log(error);
    }

}

/* 
* post /
search Customer
*/
exports.searchCustomer = async (req,res)=>{
    const locals = {
        title:'search New Customer Data',
        description:'Free NodeJS User Management',
       }

try{
  const client= req.session.client
    let searchTerm = req.body.searchTerm;
    const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9]/g, "");
    const customers = await Customer.find({
        $or: [
            {firstname: {$regex: new RegExp(searchNoSpecialChar,"i") }},
            {lastname: {$regex: new RegExp(searchNoSpecialChar,"i") }},
 
        ]
    });
    res.render("search",{
        customers,
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












   await Customer.insertMany([
    {
        firstname: "John",
        lastname: "Doe",
        tel: "12345",
        category: "categorie1",
        details: "Lorem ipsum 1",
        email: "john.doe@example.com",
        mdp: "P@ssw0rd1"
      },
      {
        firstname: "Jane",
        lastname: "Smith",
        tel: "67890",
        category: "categorie2",
        details: "Lorem ipsum 2",
        email: "jane.smith@example.com",
        mdp: "MySecretPass"
      },
      {
        firstname: "Michael",
        lastname: "Johnson",
        tel: "54321",
        category: "categorie3",
        details: "Lorem ipsum 3",
        email: "michael.johnson@example.com",
        mdp: "SecurePwd123"
      },
      {
        firstname: "Emily",
        lastname: "Williams",
        tel: "98765",
        category: "categorie1",
        details: "Lorem ipsum 4",
        email: "emily.williams@example.com",
        mdp: "Secret@123"
      },
      {
        firstname: "Daniel",
        lastname: "Brown",
        tel: "13579",
        category: "categorie2",
        details: "Lorem ipsum 5",
        email: "daniel.brown@example.com",
        mdp: "Password123!"
      },
      {
        firstname: "Olivia",
        lastname: "Taylor",
        tel: "86420",
        category: "categorie3",
        details: "Lorem ipsum 6",
        email: "olivia.taylor@example.com",
        mdp: "SecurePassw0rd"
      },
      {
        firstname: "David",
        lastname: "Lee",
        tel: "24680",
        category: "categorie1",
        details: "Lorem ipsum 7",
        email: "david.lee@example.com",
        mdp: "SecretPassword1"
      },
      {
        firstname: "Sophia",
        lastname: "Anderson",
        tel: "77777",
        category: "categorie2",
        details: "Lorem ipsum 8",
        email: "sophia.anderson@example.com",
        mdp: "MyPassw0rd!"
      },
    {
      firstname: "John",
      lastname: "Doe",
      tel: "12345",
      category: "categorie1",
      details: "Lorem ipsum 1",
      email: "john.doe@example.com",
      mdp: "P@ssw0rd1"
    },
    {
      firstname: "Jane",
      lastname: "Smith",
      tel: "67890",
      category: "categorie2",
      details: "Lorem ipsum 2",
      email: "jane.smith@example.com",
      mdp: "MySecretPass"
    },
    {
      firstname: "Michael",
      lastname: "Johnson",
      tel: "54321",
      category: "categorie3",
      details: "Lorem ipsum 3",
      email: "michael.johnson@example.com",
      mdp: "SecurePwd123"
    },
    {
      firstname: "Emily",
      lastname: "Williams",
      tel: "98765",
      category: "categorie1",
      details: "Lorem ipsum 4",
      email: "emily.williams@example.com",
      mdp: "Secret@123"
    },
    {
      firstname: "Daniel",
      lastname: "Brown",
      tel: "13579",
      category: "categorie2",
      details: "Lorem ipsum 5",
      email: "daniel.brown@example.com",
      mdp: "Password123!"
    },
    {
      firstname: "Olivia",
      lastname: "Taylor",
      tel: "86420",
      category: "categorie3",
      details: "Lorem ipsum 6",
      email: "olivia.taylor@example.com",
      mdp: "SecurePassw0rd"
    },
    {
      firstname: "David",
      lastname: "Lee",
      tel: "24680",
      category: "categorie1",
      details: "Lorem ipsum 7",
      email: "david.lee@example.com",
      mdp: "SecretPassword1"
    },
    {
      firstname: "Sophia",
      lastname: "Anderson",
      tel: "77777",
      category: "categorie2",
      details: "Lorem ipsum 8",
      email: "sophia.anderson@example.com",
      mdp: "MyPassw0rd!"
    }
  ]
  )

*/
