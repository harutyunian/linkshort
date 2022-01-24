const {Router} = require('express')
const Link = require('../model/Link')
const config = require('config')
const auth = require('./../middleware/auth.middleware')
const shortid = require('shortid')

const router = Router()


router.post('/generate', auth, async (req, res) => {
    try {
        const baseUrl = config.get('baseUrl')
        const {from} = req.body


        const existing = await Link.findOne({from,owner: req.user.userId})
        if (existing) {
            return res.json({link: existing})
        }

        const code = shortid.generate()
        const to = baseUrl + '/t/' + code
        const link = new Link({
            code, to, from, owner: req.user.userId
        })
        await link.save()
        return res.status(201).json({link})

    } catch (e) {
        res.status(500).json({message: 'Something went wrong'})
    }
})
router.get("/", auth, async (req, res) => {
    try {
        const links = await Link.find(({owner: req.user.userId}))
        res.json(links)
    } catch (e) {
        res.status(500).json({message: 'Something went wrong'})
    }
})

router.get("/:id", auth, async (req, res) => {
    try {
        const link = await Link.findById(req.params.id)

        res.json(link)
    } catch (e) {
        res.status(500).json({message: 'Something went wrong'})
    }
})


module.exports = router
