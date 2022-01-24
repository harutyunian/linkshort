const {Router} = require('express')
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken")
const config = require('config')
const User = require('../model/User')
const {check, validationResult} = require('express-validator')

const router = Router()

router.post('/register',
    [
        check('email', 'Wrong email').isEmail(),
        check('password', 'Password should be minimum 6 character').isLength({min: 6})
    ],
    async (req, res) => {
        try {

            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    messages: 'Authentication fail'
                })
            }

            const {email, password} = req.body
            const candidate = await User.findOne({email})
            if (candidate) {
                return res.status(400).json({message: 'This email address is already being used'})
            }
            const hashedPassword = await bcrypt.hash(password, 12)

            const user = new User({email, password:hashedPassword})
            await user.save()
            res.status(201).json({message: 'Successful created user'})

        } catch (error) {
            return res.status(500).json({message: error})
        }
    })

router.post('/login', [
        check('email', 'Wrong email').isEmail(),
        check('password', 'Password should be minimum 6 character').isLength({min: 6})
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    messages: 'Authentication fail'
                })
            }
            const {email, password} = req.body
            const user = await User.findOne({email})
            if (!user) {
                return req.status(400).json({message: 'User dont exist'})
            }
            const isMatch = bcrypt.compare(password, user.password)
            if (!isMatch) {
                return res.status(400).json({message: 'Wrong password'})
            }
            const token = await jwt.sign(
                {userId: user.id},
                config.get("jwtKey"),
                {expiresIn: '1h'}
            )

            return res.json({token, userId: user.id,message:'Success'})
        } catch (error) {
            return res.status(500).json({message: error})
        }
    })

module.exports = router