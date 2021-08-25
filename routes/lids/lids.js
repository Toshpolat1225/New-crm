const { Router } = require("express");
const router = Router();
const LidController = require("../../controller/LidController");
const rootUser = require('../../middleware/rootUser')
const LidCategory = require("../../models/LidCategory");
const adminMan = require('../../middleware/adminManager')
const adminManWor =require('../../middleware/adminManWor')



router.get('/',adminMan, LidController.LidsGet)
router.post('/',adminMan, LidController.LidsPost)
router.get('/today',adminMan, LidController.todayLidsGet)
router.get('/tomorrow',adminMan,  LidController.tomorrowLidsGet)
router.get('/fire',adminMan,  LidController.fireLidsGet)
router.get('/lidCategory',adminMan,  LidController.lidCategoriesGet)
router.get('/lidCategory/add',adminMan, LidController.createCategoriesLidGet)
router.get('/:id',adminMan,  LidController.moreLidsGet)
router.get('/lidCategory/:id',adminMan,  LidController.idCategoriesLidGet)
router.post('/lidCategory/add',adminMan, LidController.createCategoriesLidPost)
router.get('/editCategory/:id',adminMan, async(req,res)=>{
    const category = await LidCategory.findById(req.params.id);

    res.render('lids/editCategory',{
        title: 'Edit category',
        category
    })
})
router.get("/edit/:id",adminMan, LidController.editLidsGet)
router.post("/edit/:id",adminMan, LidController.editLidsPost)
router.get("/delete/:id",adminMan, LidController.deleteLidsGet)



module.exports = router;
