const express = require('express')
const config = require('config')
const mongoose = require("mongoose");

const app = express()
const PORT = config.get('port') || 5000;

app.use(express.json({extended:true}))
app.use('/api/auth',require('./routes/auth.routes'))
app.use('/api/links',require('./routes/link.routes'))
app.use('/t',require('./routes/resirect.routes'))

async function start() {
    try {
        await mongoose.connect(config.get('mongoUri') )
    } catch (e) {
        process.exit(1)
    }
}
start().then(()=> app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`)))

