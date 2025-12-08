import express, { Request, Response }  from 'express'

import {Pool} from "pg"
import dotenv from "dotenv"
import path from "path"
const app = express()
const port = 3000

dotenv.config({path: path.join(process.cwd(),".env")})

app.use(express.json())

const pool=new Pool({
   connectionString:`${process.env.CONNECTION_STRING}`
})


const initDB=async()=>{
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL,
    age INT,
    phone VARCHAR(15),
    adress TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
    )
    `)


    await pool.query(`
      
      CREATE TABLE IF NOT EXISTS todos(
      id SERIAL PRIMARY KEY,
      user_id INT REFERENCES users(id) ON DELETE CASCADE,
      title VARCHAR(200) NOT NULL,
      description TEXT,
      completed BOOLEAN DEFAULT false,
      due_date DATE,
      created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()

      )
      `)
}
initDB()

app.get('/', (req:Request, res:Response) => {
  res.send('Hello World!')
})


// user CRUD oparetion


//  user post api

app.post("/users",async (req:Request,res:Response)=>{
   const {name,email}=req.body

   try{
   const result=await pool.query(`INSERT INTO users(name,email) VALUES($1,$2) RETURNING *`,[name,email])
    res.status(201).json({
    success:false,
    message: "data inserted success fully",
    data:result.rows[0]
   })
   }catch(err:any){
    res.status(500).json({
    success:false,
    message: err?.message
   })
   }


  
})


//  get user api 

app.get('/users', async(req:Request,res:Response)=>{
  try{
   const result = await pool.query(`SELECT * FROM users`)
     res.status(201).json({
    success:false,
    message: "data inserted success fully",
    data:result.rows
   })

  }catch(err:any){
    res.status(500).json({
    success:false,
    message: err?.message
   })
  }
})



//  get dynamic user api

app.get('/users/:id', async (req:Request, res: Response)=>{
    try{
     const result = await  pool.query(`SELECT * FROM users WHERE id=$1`,[req.params.id])
     if(result.rows.length===0){
      res.status(404).json({
        success:false,
        message:'User not found'
      })
     }else{
        res.status(201).json({
    success:false,
    message: "data inserted success fully",
    data:result.rows
   })
     }
    }catch(err:any){
    res.status(500).json({
    success:false,
    message: err?.message
   })
   }
})


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
