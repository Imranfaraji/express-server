import express, { NextFunction, Request, response, Response }  from 'express'


import config from './config'
import initDB, { pool } from './config/db'
import { userRoute } from './modules/users/user.router'

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


//  get user api 





//  get dynamic user api

// app.get('/users/:id', async (req:Request, res: Response)=>{
//     try{
//      const result = await  pool.query(`SELECT * FROM users WHERE id=$1`,[req.params.id])
//      if(result.rows.length===0){
//       res.status(404).json({
//         success:false,
//         message:'User not found'
//       })
//      }else{
//         res.status(201).json({
//     success:false,
//     message: "data inserted success fully",
//     data:result.rows
//    })
//      }
//     }catch(err:any){
//     res.status(500).json({
//     success:false,
//     message: err?.message
//    })
//    }
// })


// update user api


app.put("/users/:id", async(req:Request,res:Response)=>{
  const {name,email}=req.body
  try{
    const result= await pool.query(`UPDATE users SET name=$1, email=$2 WHERE id=$3 RETURNING *`,[name,email, req.params.id])

    

    if(result.rows.length===0){
       res.status(404).json({
        success:false,
        message:"user not found"
       })
    }else{
      res.status(200).json({
      success:true,
      message:"user update success fully",
      data:result.rows
    })
    }
  }catch(err:any){
     res.status(500).json({
      success:false,
      message:err?.message
     })
  }
})


app.delete("/users/:id", async(req:Request,res:Response)=>{
   const id=req.params.id
   try{
    const result = await pool.query(`DELETE FROM users WHERE id=$1 RETURNING *` , [id])

    if(result.rows.length===0){
      res.status(404).json({
        success:false,
        message:"user not found"
      })
    }else{
       res.status(200).json({
      success: true,
      message: "User deleted successfully",
      data: result.rows[0],
    });
    }
   }catch(err:any){
      res.status(500).json({
      success:false,
      message:err?.message
     })
   }
})



//  todos crud opretion


app.post("/todos", async(req:Request,res:Response)=>{
  const {user_id,title}=req.body

  try{
   const result=await pool.query(`INSERT INTO todos(user_id,title) VALUES($1,$2)`,[user_id,title])

   res.status(201).json({
      success: true,
      message: "User deleted successfully",
      data: result.rows[0],
   })
  }catch(err:any){
    res.status(500).json({
      success:false,
      message:err?.message
     })
  }
})

app.get('/todos', async( req:Request,res:Response)=>{
    try{
      const result= await pool.query(`SELECT * FROM todos`)
      res.status(201).json({
      success: true,
      message: "todos find successfully",
      data: result.rows[0],
   })
    }catch(err:any){
    res.status(500).json({
      success:false,
      message:err?.message
     })
  }
})



// Get single todo
app.get("/todos/:id", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM todos WHERE id = $1", [
      req.params.id,
    ]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Todo not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to fetch todo" });
  }
});

// Update todo
app.put("/todos/:id", async (req, res) => {
  const { title, completed } = req.body;

  try {
    const result = await pool.query(
      "UPDATE todos SET title=$1, completed=$2 WHERE id=$3 RETURNING *",
      [title, completed, req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Todo not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to update todo" });
  }
});

// Delete todo
app.delete("/todos/:id", async (req, res) => {
  try {
    const result = await pool.query(
      "DELETE FROM todos WHERE id=$1 RETURNING *",
      [req.params.id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Todo not found" });
    }

    res.json({ success: true, message: "Todo deleted", data: null });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to delete todo" });
  }
});

app.use((req,res)=>{
  res.status(404).json({
    success:false,
    message:"Route not found",
    path:req.path
  })
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
