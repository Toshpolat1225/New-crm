const Salary = require('../models/Salary')
const mongoose = require("mongoose");
const Worker = require('../models/workers');
const isAdmin = require('../middleware/isAdmin');


// ============================================Salary router start ===============================================================

module.exports.addSalary = async (req, res) => {
  const salary = await Salary.findOne();
  const workers = await Worker.find()
  res.render("salary/salary-add", {
    title: "salary add",
    workers
  })

};
module.exports.getWorkerSalary = async (req, res) => {
  const user = res.locals.user
  if(user.status){
    ifAdmin = true
  }
  else{
    ifAdmin = false
  }
  console.log(user);
  let salary = await Salary.find()
   salary =  salary.filter(c=> c.userId.toString() === user._id.toString())
   salary = salary[0]
  console.log(salary);
  res.render('salary/workerSalary', {
    title: 'Worker',
    salary,
    ifAdmin
  })
}

module.exports.getSalary = async (req, res) => {
  const salary = await Salary.find();
  res.render("salary/salary", {
    title: "Salary view",
    salary,
  });
}; 
module.exports.creatSalary = async(req, res) => {
  const workers = await Worker.find()
  res.render("salary/salary-add", {
    title: "salary",
    workers
  });
};
module.exports.creatSalaryPost = async (req, res) => {
  const { date, dateOld, price, userId } = req.body;
  const user = await  Worker.findById(userId.toString())
  const name = user.fullname
  const salary = new Salary({
    date,
    dateOld,
    price,
    userId,
    name
  });
  await salary.save();
  res.redirect("/salary");
};
module.exports.editSalary = async (req, res) => {
  const salary = await Salary.findById(req.params.id);
  const workers = await Worker.find()
  const worker =  workers.find(c=> c._id.toString() === salary.userId.toString())
  res.render("salary/salary-edit", {
    title: `edit salary page`,
    salary,
    workers
  });
};
 
module.exports.editSalaryPost = async (req, res) => {
  const { date, dateOld, price, name } = req.body;
  const newSalary = {
    date,
    dateOld,
    price,
    name
  };
  await Salary.findByIdAndUpdate(req.body.id, newSalary);
  res.redirect("/salary");
};
module.exports.removeSalary = async (req, res) => {
  await Salary.findByIdAndDelete(req.body.id);
  res.redirect("/salary");
};
// ============================================Salary router end ===============================================================

