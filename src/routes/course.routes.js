import { Router } from "express";
import { validateInstitutionJWT } from '../middlewares/institutionAuth.middleware.js';
import {
    createCourse,
    deleteCourse,
    findFacultiesByCourseAndBatch,
    findFacultiesByPrevCourseAndBatch,
    findFacultyByCourseId,
    findFacultyByPrevCourseId,
    findStudentByCourseId,
    findStudentByPrevCourseId,
    getCourseById,
    getCourseByInstitution,
    getCoursesByDepartment,
    modifyStatus,
    updateCourse
} from "../controllers/course.controller.js";


const router = Router();

// Public Routes
router.get("/department/:departmentId", getCoursesByDepartment);
router.get("/institution/:institutionId", getCourseByInstitution);
router.get("/:courseId", getCourseById);
router.get("/faculty/course/:courseId/institution/:institutionId", findFacultyByCourseId);
router.get("/faculty/prev-course/:courseId/institution/:institutionId", findFacultyByPrevCourseId);
router.get("/faculty/course/:courseId/institution/:institutionId/batch/:batch", findFacultiesByCourseAndBatch);
router.get("/faculty/prev-course/:courseId/institution/:institutionId/batch/:batch", findFacultiesByPrevCourseAndBatch);
router.get("student/course/:courseId/institution/:institutionId", findStudentByCourseId);
router.get("student/prev-course/:courseId/institution/:institutionId", findStudentByPrevCourseId);

// Protected Routes
router.post("/create-course", validateInstitutionJWT, createCourse);
router.put("/:courseId", validateInstitutionJWT, updateCourse);
router.delete("/:courseId", validateInstitutionJWT, deleteCourse);
router.put("/change-status/:courseId", validateInstitutionJWT, modifyStatus);

export default router;