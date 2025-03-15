import * as registrationController from "../controllers/registrationController.js";
import express from "express";
const router = express.Router();

router.post("/", registrationController.addRegistration);
router.get("/", registrationController.getAllRegistrations);
router.get("/my-registrations", registrationController.getMyRegistrations);
router.get("/:id", registrationController.getRegistrationById);
router.get("/project/:projectId", registrationController.getRegistrationsByProjectId);
router.put("/:id", registrationController.updateRegistration);
router.patch("/:id/status", registrationController.updateRegistrationStatus);
router.delete("/:id", registrationController.deleteRegistration);

export default router;
