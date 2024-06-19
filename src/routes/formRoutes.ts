// src/routes/formRoutes.ts

import { Router } from 'express';
import { ping, submitForm, readForm, deleteFormEntry, editFormEntry, searchForms } from '../controllers/formController';

const router = Router();

router.get('/ping', ping);
router.post('/submit', submitForm);
router.get('/read', readForm);
router.delete('/delete', deleteFormEntry);
router.put('/edit', editFormEntry);
router.get('/search', searchForms);

export default router;
