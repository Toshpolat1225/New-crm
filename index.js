const express = require("express");
const mongoose = require("mongoose");
const flash = require("connect-flash");
const MONGODB_URI = 'mongodb+srv://asad:b7q3JjGQzDpIfTfu@cluster0.l1arz.mongodb.net/CRM'
const session = require("express-session");
const MongoDbStore = require("connect-mongodb-session")(session);
const exhbs = require("express-handlebars");
const app = express();
const path = require("path");
const isAdmin = require("./middleware/isAdmin");
const Admin = require('./models/Admin')
const Worker = require('./models/workers')
//  routes
const workerRouter = require("./routes/worker/workers");
const projectsRouter = require("./routes/projects/projects");
const AuthRouter = require("./routes/auth/auth");
const indexRouter = require("./routes/index");
const lessonRouter = require("./routes/library/lessons");
const libraryRouter = require("./routes/library/library");
const traineesRouter = require("./routes/trainees/trainees-projects");
const lidsRouter = require("./routes/lids/lids");
const salaryRouter = require("./routes/salary/salary");
const priceRouter = require('./routes/price/price')

const store = new MongoDbStore({
  uri: MONGODB_URI,
  collection: "session",
});

const hbs = exhbs.create({ 
  defaultLayout: "admin",
  extname: "hbs",
  partialsDir: path.join(__dirname, "views/partials"),
  runtimeOptions: {
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true,
  },
  helpers:require('./helpers/Admin-manager')
    
  
});





// hbs.registerHelper("getTime", function(){
     
//   var myDate = new Date();
//   var hour = myDate.getHours();
//   var minute = myDate.getMinutes();
//   var second = myDate.getSeconds();
//   if (minute < 10) {
//       minute = "0" + minute;
//   }
//   if (second < 10) {
//       second = "0" + second;
//   }
//   return "Текущее время: " + hour + ":" + minute + ":" + second;
// });

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(
  session({
    secret: "secret value",
    resave: false,
    saveUninitialized: false,
    store,
  })
);
app.use(async(req,res,next)=>{
  req.admin = req.session.admin 
  if(req.admin){
    res.locals.isadmin = req.session.isAdmin
    res.locals.user = await Admin.findById(req.session.admin._id)
    res.locals.user = {
      fullname: res.locals.user.name,
      avatar: res.locals.user.avatar
    }
  }
  req.worker = req.session.worker 
   if(req.worker){
     req.worker = req.session.worker
     res.locals.isworker = req.session.isWorker
    res.locals.user = await Worker.findById(req.worker._id.toString() )

  }
  req.student = req.session.student
  if(req.student){
    res.locals.isstudent = req.session.isStudent
    req.student = req.session.student
    res.locals.user = await Worker.findById(req.student._id.toString() )

  }
  req.manager = req.session.manager
  if(req.manager){
    res.locals.ismanager = req.session.isManager
    req.manager = req.session.manager
    res.locals.user = await Worker.findById(req.manager._id.toString() )
  }
  res.locals.isadmin = req.session.isAdmin

  next()
})

app.use(flash());
app.use("/auth", AuthRouter);
app.use("/", isAdmin, indexRouter);
app.use("/workers", isAdmin, workerRouter);
app.use("/lesson", isAdmin, lessonRouter);
app.use("/projects", isAdmin, projectsRouter); 
app.use("/library", isAdmin,libraryRouter);
app.use("/trainees", isAdmin,traineesRouter);
app.use("/lids", isAdmin,lidsRouter);
app.use("/salary", isAdmin, salaryRouter);
app.use("/price", isAdmin, priceRouter); 


const PORT = process.env.PORT || 3000;

async function start() {
  await mongoose.connect(MONGODB_URI, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
  });
}




start();


