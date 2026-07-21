const express=require('express');const {createContact}=require('../controllers/contactController');const {contactLimiter}=require('../middleware/rateLimiter');const router=express.Router();
router.post('/',contactLimiter,createContact);module.exports=router;
