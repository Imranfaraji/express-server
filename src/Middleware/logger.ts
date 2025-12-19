import { NextFunction } from "express"

const loggger = (req:Request,res:Response, next:NextFunction)=>{
  console.log((`[${new Date().toISOString()}]`))
  next()
}