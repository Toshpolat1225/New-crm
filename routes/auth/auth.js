const { Router } = require("express");
const router = Router();
const fileMiddleware = require("../../middleware/file");
const bcrypt = require("bcryptjs");
const Admin = require("../../models/Admin");
const Workers = require('../../models/workers')


router.get("/login", async (req, res) => {
    
    res.render("auth/login", {
      title: "Admin authentication",
      layout: "user",
      loginError: req.flash("loginError"),
    });
  
 
 
});


router.get("/register", async(req, res) => {
  const admin = await Admin.findOne()
  if(admin){
    
    res.redirect('/auth/login')

  }
  else{ 

   const newAdmin =true
    res.render("auth/register", {
    title: "Admin register", 
    layout: "user",
    registerError: req.flash("registerError"),
    newAdmin,
  });
  }
 
});

router.post("/login", async (req, res) => { 
  const {email} = req.body
  const adminHead = await Admin.findOne({email})
  if(adminHead){

    const { email, password } = req.body;
    const admin = await Admin.findOne({email});
    if (admin) {
      const areSame = await bcrypt.compare(password, admin.password);
      if (areSame) {
        const newAdmin = {
          _id: admin._id,
          name: admin.name
        }
        req.session.admin = newAdmin;
        req.session.isAdmin = true;
        req.session.isWorker = true;
        req.session.save((err) => {
          if (err) {
            throw err;
          }
          else{
            res.redirect("/");
          }
        });
      } else {
        req.flash("loginError", "Password is wrong !");
        res.redirect("/auth/login");
      }
    } else {
      req.flash("loginError", "This email don't exist !");
      res.redirect("/auth/login");
    }
  }
  else{
    
    const { email, password } = req.body;
    
    const worker = await Workers.findOne({email});
  if (worker) {
    const areSame = await bcrypt.compare(password, worker.password);
    if (areSame) {
      const newWorker = {
        _id: worker._id,
        name: worker.fullname
      }
      const status = worker.status
      if(status == "Worker"){
        req.session.worker = newWorker;
      req.session.isWorker = true;
      req.session.save((err) => {
        if (err) {
          throw err;
        }
        else{
          res.redirect("/");
        }
      });
      }
      if(status == "Student"){
      req.session.student = newWorker;
      req.session.isStudent = true;
      req.session.save((err) => {
        if (err) {
          throw err;
        }
        else{
          res.redirect("/");
        }
      });
      }
      if(status == "Project manager"){
      req.session.manager = newWorker;
      req.session.isManager = true;
      req.session.save((err) => {
        if (err) {
          throw err;
        }
        else{
          res.redirect("/");
        }
      });
      }
      
    } else {
      req.flash("loginError", "Password is wrong !");
      res.redirect("/auth/login");
    }
  } 
  else {
    req.flash("loginError", "This email don't exist !");
    res.redirect("/auth/login");
  }

  }

});

router.post("/register", fileMiddleware.single("avatar"), async (req, res) => {
  const adminExist = await Admin.findOne();
  if(!adminExist){
    const { name, email, password, confirm, status } = req.body;
  const hash = await bcrypt.hash(password, 10);
      const areSame = await bcrypt.compare(confirm, hash)
      if(!areSame){
        req.flash('registerError', 'Пароли должны совпадать!')
      }
      
    req.file ? (avatar = req.file.filename) : (avatar = "");
    const admin = new Admin({
      name,
      email,
      password: hash,
      avatar,
      status
    });
    await admin.save();
    res.redirect("/auth/login");

  } 

  else{
    
    const {
      confirm,
      password,
      email,
      fullname,
      job,
      about,
      address,
      phone,
      education,
      skills,
      notes,
      telegram,
      status,
    } = req.body;
   
    
    req.file ? (avatar = req.file.filename) : (avatar = "");
  
    const hash = await bcrypt.hash(password, 10);
    const worker = await Workers.findOne({ email });
    if (worker) {
      req.flash("registerError", "Этот эл. почта уже занята!");
      res.redirect("/auth/register");
    } 
    else {
      req.file ? (avatar = req.file.filename) : (avatar = "");
      const worker = new Workers({
        password:hash,
        email,
        fullname,
        job,
        about, 
        address,
        phone,
        education,
        skills,
        notes,
        telegram,
        status,
        avatar,
      });
      await worker.save();
  
      res.redirect("/auth/login");
  } 
    }

});


router.get("/logout", async (req, res) => {
  req.session.destroy(() => {
    res.redirect("/auth/login");
  });
}); 

module.exports = router;
 