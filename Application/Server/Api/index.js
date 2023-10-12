require("dotenv").config()
const express = require("express")
const {sequelize} = require('./models/init-models')
const router = require("./router/index")
//const errorMiddleWare = require('./middlewares/error-middleware')
let PORT = process.env.PORT || 5001

let app = express()

app.use(express.json())
app.use("/api", router)
//app.use(errorMiddleWare)

let start = async () => {
    try{
        await sequelize.authenticate()
        app.listen(PORT, () => console.log(`Запуск на ${PORT}`))
    }catch(e){
        console.log(e)
    }
}
start()