const express=require('express');const c=require('../controllers/projectController');const router=express.Router();
router.get('/',c.getAllProjects);router.get('/featured',c.getFeaturedProjects);router.get('/status/:status',c.getProjectsByStatus);router.get('/:slug',c.getProjectBySlug);
module.exports=router;
