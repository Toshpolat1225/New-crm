const { Router } = require("express");
const router = Router();
const fileMiddleware = require("../../middleware/file");
const Library = require("../../models/Library");
const toDelete = require("../../middleware/fileDelete");
const rootUser = require('../../middleware/rootUser')
const mongoose = require("mongoose");
const adminMan = require('../../middleware/adminManager')

router.get("/", async (req, res) => {
  const categories = await Library.find();
  res.render("library/category", {
    title: "Library",
    categories,
  });
});

router.get("/add",adminMan, (req, res) => {
  res.render("library/category-add", {
    title: "Add library category",
  });
});

router.post("/add",adminMan, fileMiddleware.single("img"), async (req, res) => {
  const { name } = await req.body;
  req.file ? (img = req.file.filename) : (img = "");
  const library = new Library({
    name,
    img,
  });
  await library.save();
  res.redirect("/library");
});

router.get("/:id", async (req, res) => {
  const { name } = await Library.findById(req.params.id);
  let lessons = await Library.aggregate([
    {
      $match: {
        _id: mongoose.Types.ObjectId(req.params.id),
      },
    },
    {
      $lookup: {
        from: "lessons",
        localField: "_id",
        foreignField: "libraryId",
        as: "lessons",
      },
    },
    {
      $unwind: {
        path: "$lessons",
      },
    },
    {
      $group: {
        _id: {
          _id: "$_id",
        },
        lessons: {
          $push: "$lessons",
        },
      },
    },
    {
      $project: {
        _id: "$_id._id",
        name: "$_id.name",
        img: "$_id.img",
        url: "$_id.url",
        lessons: "$lessons",
      },
    },
  ]);
  if (lessons.length) {
    lessons = lessons[0].lessons;
  } else {
    lessons = "";
  }
  res.render("library/category-page", {
    title: name,
    lessons,
  });
});

router.get("/edit/:id",adminMan, async (req, res) => {
  const category = await Library.findById(req.params.id);
  res.render("library/category-edit", {
    title: "Edit library",
    category,
  });
});

router.post("/edit/:id",adminMan, fileMiddleware.single("img"), async (req, res) => {
  const { img } = await Library.findById(req.params.id);
  const category = req.body;

  if (req.file) {
    category.img = req.file.filename;
    toDelete(img.img);
  } else {
    category.img = img;
  }

  await Library.findByIdAndUpdate(req.params.id, category, (err) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/library");
    }
  });
});

router.get("/delete/:id",adminMan, fileMiddleware.single("img"), async (req, res) => {
  const { img } = await Library.findById(req.params.id);
  toDelete(img);
  await Library.findByIdAndDelete(req.params.id);
  res.redirect("/library/category");
});

module.exports = router;
