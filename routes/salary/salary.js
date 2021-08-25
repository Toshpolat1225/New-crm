const { Router } = require("express");
const router = Router();
const mongoose = require("mongoose");
const SalaryController = require("../../controller/SalaryController");
const rootUser = require('../../middleware/rootUser')
const adminMan = require('../../middleware/adminManager')
const adminManWor =require('../../middleware/adminManWor')




router.get("/", adminManWor,SalaryController.getSalary);
router.get("/add",adminMan, SalaryController.addSalary);
router.get("/:id/edit",adminMan, SalaryController.editSalary);
router.get("/add",adminMan, SalaryController.creatSalary);
router.post("/add",adminMan, SalaryController.creatSalaryPost);
router.post("/edit",adminMan, SalaryController.editSalaryPost);
router.post("/remove",adminMan, SalaryController.removeSalary);
router.get('/worker',adminManWor, SalaryController.getWorkerSalary)
router.post('/worker/add',adminMan, SalaryController.WorkerSalaryPost)



module.exports = router;