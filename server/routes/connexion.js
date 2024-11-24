
const express = require("express")

const router=express.Router();
const connexionController = require('../controllers/connexionController');

router.get('/login', connexionController.connectGet);

router.post('/login', connexionController.connectPost);
router.get('/viewUser/:id', connexionController.viewUser);
router.get('/viewUserInfo/:id', connexionController.viewInfo);
router.get('/viewAdmin/:id', connexionController.viewAdmin);
router.post('/panier/:id', connexionController.postCommand);
router.get('/panier/:id', connexionController.viewCommand);
router.post('/panierdelete/:id', connexionController.postDelete);
router.post('/command/:id', connexionController.command);
router.post('/searchView', connexionController.searchView);
router.get('/commandes', connexionController.Commande);
router.post('/rechercheComand', connexionController.recherchCommand);
router.get('/historique/:id', connexionController.historique);
router.get('/historiqueUser/:id', connexionController.historiqueUser);
router.post('/rechercheComandUser', connexionController.SearchistoriqueUser);
router.get('/PrintCommand/:id', connexionController.print);
router.get('/PrintCommandAdmin/:id', connexionController.printAdmin);
module.exports=router;

