const { Router } = require("express");
const router = Router();
const Project = require("../../models/Project");
const Workers = require("../../models/workers");
const rootUser = require("../../middleware/rootUser");
const adminMan = require("../../middleware/adminManager");
const adminManWor = require("../../middleware/adminManWor");

router.get("/add/worker", adminMan, async (req, res) => {
  const workers = await Workers.find();
  res.status(200).json(workers);
});

router.get("/", adminManWor, async (req, res) => {
  const projects = await Project.find();
  await Promise.all(
    projects.map((c) => c.populate("works.worker").execPopulate())
  );

  projects.map((c) => {
    let date_t = new Date(c.deadline);
    let date_l = new Date(c.date);
    let date = new Date();
    let timer = date_t - date;
    let timerProg = timer / 1000 / ((date_t - date_l) / 1000 / 100);
    if (Math.floor(100 - timerProg) <= 100) {
      c.progress = Math.floor(100 - timerProg);
    } else {
      c.progress = 100;
    }
    return c;
  });

  projects.sort((a, b) => b.progress - a.progress);
  res.render("projects/projects", {
    title: "Projects",
    projects,
    isProject: true,
  });
});

router.get("/add", adminMan, async (req, res) => {
  const workers = await Workers.find();
  res.render("projects/projects-add", {
    title: "Add project",
    workers,
    isCreate: true,
  });
});

router.post("/add", adminMan, async (req, res) => {
  let status;
  if (req.body.status === "On progress") {
    status = {
      status: req.body.status,
      color: "primary",
    };
  }
  if (req.body.status === "Canceled") {
    status = {
      status: req.body.status,
      color: "danger",
    };
  }
  if (req.body.status === "Success") {
    status = {
      status: req.body.status,
      color: "success",
    };
  }
  let {
    name,
    description,
    company,
    leader,
    deadline,
    clientName,
    clientNumber,
    clientLocation,
    telegram,
    totalPayment,
    workers,
    workerPayment,
    date,
  } = req.body;
  let works;
  if (!(workers instanceof Array)) {
    workerPayment = [workerPayment];
    workers = [workers];
  }
  if (workers && workerPayment) {
    const newWork = workers.map((c) => {
      return workerPayment.map((o) => {
        return {
          worker: c,
          payment: o,
        };
      });
    });
    let k = -1;
    works = newWork.map((g) => {
      k++;
      return g[k];
    });
  }
  let date_t = new Date(deadline);
  let date_l = new Date(date);
  let dateTime = new Date();
  let timer = date_t - dateTime;
  let timerProg = timer / 1000 / ((date_t - date_l) / 1000 / 100);
  let progress = Math.floor(100 - timerProg);
  const project = new Project({
    name,
    description,
    status,
    company,
    leader,
    deadline,
    clientName,
    clientNumber,
    clientLocation,
    telegram,
    totalPayment,
    date,
    works,
    progress,
  });
  await project.save();
  res.redirect("/projects");
});

router.get("/view/:id", adminManWor, async (req, res) => {
  const project = await Project.findById(req.params.id);
  await project.populate("works.worker").execPopulate();
  project.works.map((c) => {
    const parcent = c.payment;
    const workerPayment = (c.payment =
      (project.totalPayment / 100) * c.payment);
    c.payment = {
      workerPayment,
      parcent,
    };
    return c;
  });
  res.render("projects/projects-view", {
    title: `view ${project.name}`,
    project,
    isView: true,
  });
});

router.get("/edit/:id", adminMan, async (req, res) => {
  const project = await Project.findById(req.params.id);
  const workers = await Workers.find();
  await project.populate("works.worker").execPopulate();
  res.render("projects/projects-edit", {
    title: `edit ${project.name}`,
    workers,
    project,
  });
});

router.post("/edit/:id", adminMan, async (req, res) => {
  const project = await Project.findById(req.body.id);
  let status;
  if (req.body.status === "On progress") {
    status = {
      status: req.body.status,
      color: "primary",
    };
  }
  if (req.body.status === "Canceled") {
    status = {
      status: req.body.status,
      color: "danger",
    };
  }
  if (req.body.status === "Success") {
    status = {
      status: req.body.status,
      color: "success",
    };
  }
  let {
    name,
    description,
    company,
    leader,
    deadline,
    clientName,
    clientNumber,
    clientLocation,
    telegram,
    totalPayment,
    workers,
    workerPayment,
  } = req.body;
  let works;

  if (!(workers instanceof Array)) {
    workers = [workers];
    workerPayment = [workerPayment];
  }
  if (workers && workerPayment) {
    const newWork = workers.map((c) => {
      return workerPayment.map((o) => {
        return {
          worker: c,
          payment: o,
        };
      });
    });
    let k = -1;
    works = newWork.map((g) => {
      k++;
      return g[k];
    });
  }
  const newProject = {
    name,
    description,
    status,
    company,
    leader,
    deadline,
    clientName,
    clientNumber,
    clientLocation,
    telegram,
    totalPayment,
    date: project.date,
    works,
  };
  await Project.findByIdAndUpdate(req.params.id, newProject);
  res.redirect("/projects");
});

router.get("/delete/:id", adminMan, async (req, res) => {
  await Project.findByIdAndDelete(req.params.id);
  res.redirect("/projects");
});

module.exports = router;
