import { Router } from "express"
import { userControllers } from "./controller"


const router=Router()
router.post('/',userControllers.createtUser)
router.get('/',userControllers.getUser)

export const userRoute=router