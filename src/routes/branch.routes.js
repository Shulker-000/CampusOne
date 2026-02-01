import { Router } from 'express';
import {
  changeBranchStatus,
  checkBranchCodeExists,
  createBranch,
  deleteBranch,
  getBranchByDepartment,
  getBranchById,
  getBranchesByInstitution,
  updateBranch
} from '../controllers/branch.controller.js';
import { validateInstitutionJWT } from '../middlewares/institutionAuth.middleware.js';

const router = Router();

// public routes
router.get('/institutions/:institutionId/branches', getBranchesByInstitution);
router.get('/branches/:branchId', getBranchById);
router.get('/departments/:departmentId/branches', getBranchByDepartment);


router.post('/institutions/:institutionId/branches', createBranch);
router.put('/branches/:branchId', updateBranch);
router.delete('/branches/:branchId', deleteBranch);
router.patch('/branches/:branchId/status', changeBranchStatus);
router.post("/code-exists", validateInstitutionJWT, checkBranchCodeExists);

export default router;