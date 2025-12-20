import express, { NextFunction, Request, response, Response }  from 'express'


import config from './config'
import initDB, { pool } from './config/db'
import { userRoute } from './modules/users/user.router'
import { todoRoutes } from './modules/todo/todo.routes'

const app = express()
const port = config.port




app.use(express.json())


initDB()


// logger 


app.get('/', (req:Request, res:Response) => {
  res.send('Hello World!')
})


// user CRUD oparetion

  //  routes -> controller -> service
//  user post, get api



app.use('/users',userRoute)









//  todos crud opretion


app.use('/todos',todoRoutes)





app.post("/",(req:Request,res:Response)=>{
  console.log(req.body)
  res.status(200).json({
    success:true,
    message:"api os working"
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
