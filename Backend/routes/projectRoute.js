import *as projectController from "../controllers/projectController.js"
import express from "express";
const router = express.Router();

router.post("/",projectController.addProject);
router.get("/:id",projectController.getProject);
router.get("/",projectController.getAllProjects);
router.put("/:id",projectController.updateProject);
router.delete("/:id",projectController.deleteProject);

export default router;
