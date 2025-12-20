import { Router } from "express"
import { userControllers } from "./controller"


const router=Router()
router.post('/',userControllers.createtUser)
router.get('/',userControllers.getUser)
router.get('/:id',userControllers.getSingleUser)
router.put('/:id',userControllers.updateUser)
router.delete('/:id',userControllers.deleteUser)
export const userRoute=router