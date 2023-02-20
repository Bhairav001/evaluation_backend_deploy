const express = require("express")
const { connection } = require("./db")

const { userRouter } = require("./routes/User.route")

const swaggerUI = require("swagger-ui-express")
const swaggerJsDoc = require("swagger-jsdoc")

const cors = require("cors")
const { postRouter } = require("./routes/Post.route")
const { authenticate } = require("./middlewares/authenticate.middleware")

const app = express()
require("dotenv").config()

app.use(express.json())
app.use(cors())

app.get("/",(req,res)=>{
    res.send("Fullstack Linkedin App")
})

//swagger
const options ={
    definition:{
          openapi:"3.0.0",
          info:{
            title:"Learning swagger for first time",
            version:"1.0.0"
          },
          server:[
            {
                url:"http://localhost:8080"
            }
          ]
    },
    apis:["./routes/*.js"]
}


const swaggerSpec = swaggerJsDoc(options)

app.use("/api-docs",swaggerUI.serve,swaggerUI.setup(swaggerSpec))


app.use("/users",userRouter)
app.use(authenticate)
app.use("/posts",postRouter)

app.listen(process.env.port,async()=>{
    try {
        await connection
        console.log("connected to DB")
    } catch (error) {
        console.log(error)
    }
    
    console.log(`Server runing at port ${process.env.port}`)
})