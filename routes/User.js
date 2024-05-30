const express=require('express')
const router=express.Router();
const {Get_allelements,Delete_element,Update_element,Create_element}=require('../controllers/User_Controller')
router.route('/')
    .get(Get_allelements)
    .post(Create_element)
        .patch(Update_element)
        .delete(Delete_element)
        
module.exports=router;