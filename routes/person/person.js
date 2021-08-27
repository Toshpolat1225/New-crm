const { Router } = require("express");
const router = Router();
const Project = require("../../models/traineesProject");
const Workers = require("../../models/workers");
const rootUser = require('../../middleware/rootUser')
const adminManWor =require('../../middleware/adminManWor')
const adminMan = require('../../middleware/adminManager')
const Admin = require('../../models/Admin')


router.get("/:id", async (req, res) => {
    const admin = await Admin.findOne()
    const ifAdmin = Admin._id === req.params.id
    
        const worker = await Workers.findById(req.params.id);
        res.render('person/person',{
            title: 'Personal page',
            ifAdmin,
            worker
        })
    
});


module.exports = router;
