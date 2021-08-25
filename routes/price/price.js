const {
  Router
} = require("express");
const router = Router();
const Price = require("../../models/Price");
const fileDelete = require('../../middleware/fileDelete')
const rootUser = require('../../middleware/rootUser')
const adminMan = require('../../middleware/adminManager')
const adminManWor =require('../../middleware/adminManWor')

router.get('/',adminManWor, async (req, res) => {
  const project = await Price.find()
  project.map(c => {
  })
  res.render('price/price', {
    title: 'Categories',
    layout: 'admin',
    project
  })
})


router.get('/addPrice/add',adminMan, (req, res) => {
  res.render('price/addPrice', {
    title: 'addProjects',
    layout: 'admin'
  })
})

router.post('/addPrice/add',adminMan, async (req, res) => {
  const {
    name,
    info,
    price
  } = await req.body
  const allInfo = info.map(c => {
    return {
      text: c
    }
  })
  const project = new Price({
    name,
    allInfo,
    price
  })
  await project.save()
  res.redirect('/price')
})

router.get('/edit/:id',adminMan, async (req, res) => {
  const category = await Price.findById(req.params.id)
  const info = category.allInfo
  res.render('price/editPrice', {
    title: 'edit categories',
    layout: 'admin',
    category,
    info
  })
})

router.post('/edit/:id',adminMan, async (req, res) => {

  const {
    name,
    info,
    price
  } = await req.body
  const allInfo = info.map(c => {
    return {
      text: c
    }
  })
  const newprice = {
    name,
    allInfo,
    price
  }

  await Price.findByIdAndUpdate(req.params.id, newprice)
  res.redirect('/price')
})

router.get('/delete/:id',adminMan, async (req, res) => {
  const {
    name
  } = await Price.findById(req.params.id)
  fileDelete(name.name)
  await Price.findByIdAndDelete(req.params.id)
  res.redirect('/price')
})

router.get('/add/input',adminMan, async (req, res) => {
  const category = await Price.find()
  res.status(200).json(category)
})




module.exports = router;