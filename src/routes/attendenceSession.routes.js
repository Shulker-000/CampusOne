import { Router } from "express";
import {
  generateSessions,
  getFacultySessions,
  getBatchSessions,
  getStudentSessions,
  getInstitutionSessions,
  cancelSession,
  holidaySession,
  deleteSession,
  generateFacultySessionsManual
} from "../controllers/attendenceSession.controller.js";
import { validateInstitutionJWT } from "../middlewares/institutionAuth.middleware.js";
import { validateUserJWT } from "../middlewares/userAuth.middleware.js";


const router = Router();

router.get("/session/faculty/:facultyId", getFacultySessions);
router.get("/session/student/:studentId", getStudentSessions);
router.get("/session/batch", getBatchSessions);
router.get("/session/institution/:institutionId", getInstitutionSessions);

router.post("/session/generate", validateInstitutionJWT, generateSessions);
router.patch("/session/:sessionId/cancel", validateUserJWT, cancelSession);
router.patch("/session/:sessionId/holiday", validateUserJWT, holidaySession);
router.delete("/session/:sessionId", validateUserJWT, deleteSession);
router.post("/session/manual/faculty/:facultyId", validateUserJWT, generateFacultySessionsManual);

export default router;
