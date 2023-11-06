require("dotenv").config()
const express = require("express")
const cors = require('cors')
const cookieParser = require("cookie-parser")
const {sequelize} = require('./models/init-models')
const router = require("./routers/index")
const errorMiddleWare = require('./middlewares/error-middleware')
let PORT = process.env.PORT || 5000

let app = express()

app.use(cors({
    origin: '*'
}));
app.use(express.json())
app.use(cookieParser())
app.use("/auth", router)
app.use(errorMiddleWare)

let start = async () => {
    try{
        await sequelize.authenticate()
        app.listen(PORT, () => console.log(`Запуск на ${PORT}`))
    }catch(e){
        console.log(e)
    }
}
start()