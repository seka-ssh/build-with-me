const express=require('express');const {getViews,trackView}=require('../controllers/analyticsController');const router=express.Router();
router.get('/views',getViews);router.post('/view',trackView);module.exports=router;
