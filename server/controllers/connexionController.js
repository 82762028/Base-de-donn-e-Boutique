
const Customer = require('../models/Customer');
const Commandes = require('../models/Command')
const Product = require('../models/Product');
const mongoose = require('mongoose');


exports.connectGet = async (req, res) => {
    const locals = {
        title:'Connexion',
        description:'Connecter vous à votre page'
    }
    res.render('login',locals);
 
};

exports.connectPost = async (req, res) => {
    //const customers = await Customer.find().exec();
    //const { username, password } = req.body;
      const  username = req.body.identifiant
      const  password= req.body.mot_de_passe
    // Importez le module "bcrypt" si ce n'est pas déjà fait


  try {
    // Recherchez le client dans la base de données par le nom d'utilisateur
    const client = await Customer.findOne({email: username });

    if (!client) {
      return res.status(404).render('404_user');
      
    }


    const isPasswordValid =  (password==client.mdp);

    if (!isPasswordValid) {
        return res.status(401).render('501_user');

    //    return res.status(401).json({ message: 'Mot de passe incorrect' });
    }

    // Connexion réussie, enregistrez les informations du client dans la session
    req.session.client = client;

    
    // Redirigez vers la page principale (main.ejs)
    if(client.admin=="simple")
    res.redirect(`viewUser/${client.id}`); // ou remplacer "/" par l'URL de votre page principale
 else if(client.admin=="admin") res.redirect("/");

} catch (error) {
    console.error('Erreur de connexion:', error);
    return res.status(500).render('500_user')
  }


 
};

exports.viewUser = async (req, res) => {

const client = req.session.client;

console.log(client);
    const locals = {
        title:'Connexion',
        description:'Connecter vous à votre page'
    }
    var perPage=6;//12 document par page
    var page = req.query.page || 1;//par defaut 1
  try{
    if (!client || !client.category) {
  
        return res.status(404).render('404_user');
      }
   const products = await Product.find({category: client.category})
        .skip(perPage*page -perPage)
        .limit(perPage)
        .exec();//excecute agregation
        const count = await Product.find({category: client.category}).count();
  
   if(client.admin==="simple"){
    res.render('viewUser',{
        locals,
        client,
        products,  
        current:page,
        pages: Math.ceil(count/perPage),
    });

  }else{
    return res.status(404).render('404_user')
  }

}catch(error){
    console.error('Erreur de connexion:', error);
    return res.status(500).render('500_user')
}
}




exports.viewInfo = async (req,res)=>{
  const client = req.session.client;
  try{
    const customer = req.session.client;
     const locals = {
      title:'User Info',
      description:'Free NodeJS User Management',
     }

     res.render('viewUserInfo',{
        locals,
        customer,

        client
     })

  }
   catch(error){
      console.log(error);
  }

}

exports.viewAdmin = async (req,res)=>{
  const client = req.session.client;
  try{
    const customer = req.session.client;
     const locals = {
      title:'User Info',
      description:'Free NodeJS User Management',
     }

     res.render('adminInfo',{
      client,
        locals,
        customer
     })

  }
   catch(error){
      console.log(error);
  }

}
















exports.viewCommand = async (req,res)=>{



  const client = req.session.client;

  const panier = req.session.panier;

  const locals = {
   title:'Command Info',
   description:'Free NodeJS User Management',
  }

  

try{
 if(panier && panier.length!=0)
{  res.render('panier',{
    panier,
    locals,
    client,
 })}
 else {
  res.render('command',{
    panier,
    locals,
    client,
 })
 }

}catch(error){
 console.log(error)
}
}



exports.postCommand = async (req,res)=>{



  const client = req.session.client;



if (!req.session.panier) {
  req.session.panier = [];
}

  const locals = {
   title:'Command Info',
   description:'Free NodeJS User Management',
  }

  

try{
  const product_id=req.body.product;
console.log(product_id)
  const newCustomer =  req.body.promptInput;
  const product = await Product.findOne({_id: req.body.product}); //
 const newP ={
  name: product.name,
  prix: product.prix,
  stock:product.stock,
  category:product.category,
  qte:newCustomer,
  idProduct:product._id
 }

   // Ajouter le produit au panier dans la session
   req.session.panier.push(Object.assign({}, newP));
   const panier = req.session.panier;
  console.log(newCustomer) ;

 res.redirect(`/viewUser/${client._id}`);

}catch(error){
 console.log(error)
}
}


//productDelete

exports.postDelete = async (req,res)=>{
  const client = req.session.client;
  const panier = req.session.panier;

let newOb=[];

  const locals = {
   title:'Command Info',
   description:'Free NodeJS User Management',
  }

  

try{
  const product_id = req.body.productDelete;
  const product_qte = req.body.productqte;
  console.log('ici : '+ product_qte)
  console.log(panier)
  newOb = panier.filter((item) =>item.qte!=product_qte || item.idProduct != product_id);

  
req.session.panier = newOb;

  res.redirect(`/panier/${client._id}`);

 


}
catch(error){
 console.log(error)
}
}






exports.command = async (req,res)=>{



  const client = req.session.client;

  const panier = req.session.panier;

  const locals = {
   title:'Command Info',
   description:'Free NodeJS User Management',
  }

  const newCommand = new Commandes({
    name:client.lastname,
    prenom:client.firstname, 
    category:client.category,
    idClient:client._id,
    email:client.email,
    product:panier,  
});


try{

await Commandes.create(newCommand);
   setTimeout(()=>{
   
    req.session.panier = [];
  
  },3000)
   setTimeout(()=>{
    
  res.redirect(`/viewUser/${client._id}`);

},3500)

}catch(error){
 console.log(error)
}
}





exports.searchView = async (req,res)=>{
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
          {name: {$regex: new RegExp(searchNoSpecialChar,"i") }},]
  });
  res.render("searchView",{
      products,
      locals,
      client
  })

} catch(error){
  console.log(error);
}

}


exports.Commande = async(req,res)=>{
  var perPage=6;//12 document par page
  var page = req.query.page || 1;//par defaut 1

  const client = req.session.client;

  const panier = req.session.panier;

  const locals = {
   title:'Command Info',
   description:'Free NodeJS User Management',
  }

  try{
    const commandes = await Commandes.aggregate([{$sort: { createdAt:-1}}])
  .skip(perPage*page -perPage)
  .limit(perPage).exec();
  const count = await Commandes.find().count();
     res.render('commande',{
       panier,
       locals,
       client,
       commandes, 
       current:page,
       pages: Math.ceil(count/perPage),
      })
  
    
   
   }catch(error){
    console.log(error)
   }
}



exports.recherchCommand = async (req,res)=>{
  const client= req.session.client
  const locals = {
      title:'search  Command',
      description:'Free NodeJS User Management',
     }

try{
  let searchTerm = req.body.searchTerm;
  const ObjectId = mongoose.Types.ObjectId;
  const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9]/g, "");
  const command = await Commandes.find({
      $or: [{ _id:  ObjectId.isValid(searchTerm) ? new ObjectId(searchTerm) : null  },
          {name: {$regex: new RegExp(searchNoSpecialChar,"i") }},
          {prenom: {$regex: new RegExp(searchNoSpecialChar,"i") }},
          {email: {$regex: new RegExp(searchNoSpecialChar,"i") }},
        
      ]
  });
  res.render("commandeSearch",{
      command,
      locals,
      client
  })

} catch(error){
  console.log(error);
}

}

exports.historique = async (req,res)=>{
  
  try{
    const client = req.session.client
      const commandes = await Commandes.findOne({_id: req.params.id })
     const locals = {
      title:' historique commandes',
      description:'Free NodeJS User Management',
     }

     res.render('historique',{
      client,
        locals,
        commandes
     })
  }
   catch(error){
      console.log(error);
  }

}


exports.historiqueUser = async (req,res)=>{
  
  try{
    const client = req.session.client
    const commandes = await Commandes.aggregate([{$sort: { createdAt:-1}}])
    .exec()
     const locals = {
      title:' historique commandes',
      description:'Free NodeJS User Management',
     }

     res.render('historiqueUser',{
      client,
        locals,
        commandes
     })
  }
   catch(error){
      console.log(error);
  }

}

exports.SearchistoriqueUser =  async (req,res)=>{

  const client= req.session.client
  const locals = {
      title:'search  Command',
      description:'Free NodeJS User Management',
     }

try{
  let searchTerm = req.body.searchTerm;  const ObjectId = mongoose.Types.ObjectId;

  const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9]/g, "");
  const command = await Commandes.find({
      idClient: client._id,
      $or: [    { _id:  ObjectId.isValid(searchTerm) ? new ObjectId(searchTerm) : null  },
        {"product.name": { $regex: new RegExp(searchNoSpecialChar, "i")  }     } 
      ]
  });


  res.render("SearchhistoriqueUser",{
      command,
      locals,
      client
  })

} catch(error){
  console.log(error);
}

}



exports.print = async (req,res)=>{
  
  try{
   
      const element  = await Commandes.findOne({_id: req.params.id })
     const locals = {
      title:'Add New Customer - NodeJS',
      description:'Free NodeJS User Management',
     }

     res.render('printUser',{
      element
     })
  }
   catch(error){
      console.log(error);
  }

}
exports.printAdmin= async (req,res)=>{
  
  try{
   
      const element  = await Commandes.findOne({_id: req.params.id })
     const locals = {
      title:'Add New Customer - NodeJS',
      description:'Free NodeJS User Management',
     }

     res.render('printAdmin',{
      element
     })
  }
   catch(error){
      console.log(error);
  }

}
