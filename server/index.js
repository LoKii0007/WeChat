const express = require("express")
const Connection = require("./database/db.js")
const cors = require("cors")
const Routes = require("./routes/route.js")
const bodyParser = require("body-parser")


Connection()
const app = express()
const PORT = 8000

app.use(cors())
app.use(bodyParser.json({extended: true}))
app.use(bodyParser.urlencoded({extended: true}))
// app.use(express.json())


// ----routes
app.use('/', Routes)


app.listen(PORT, ()=>{
    console.log(`listeneing to port ${PORT}`)
})