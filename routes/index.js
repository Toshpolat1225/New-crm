const {
    Router
} = require('express')
const router = Router()

router.get('/', (req, res) => {
    res.render('user/index', {
        title: 'Home'
    })
})

router.get('/notfound',(req,res)=>{
    res.render('notfound/404',{
        title: 'Page is not found!'
    })
})

module.exports = router