const { Router } = require("express");
const router = Router();
const Project = require("../../models/traineesProject");
const Workers = require("../../models/workers");
const rootUser = require('../../middleware/rootUser')
const adminManWor =require('../../middleware/adminManWor')
const adminMan = require('../../middleware/adminManager')
const Admin = require('../../models/Admin')
const Salary = require('../../models/Salary')


router.get("/:id", async (req, res) => {
    const admin = await Admin.findOne()
    const ifAdmin = admin._id === req.params.id
    const user = res.locals.user

    let salary = await Salary.find()
   salary =  salary.filter(c=> c.userId.toString() === user._id.toString())
   salary = salary[0]
        const worker = await Workers.findById(req.params.id);
        res.render('person/person',{
            title: 'Personal page',
            ifAdmin,
            salary,
            worker

        })
    
});




module.exports = router;
