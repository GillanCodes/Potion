import {Router} from 'express';
let router: Router = Router();

import {signup, signin} from "../controllers/auth.controller";

router.post('/signup', signup);
router.post('/signin', signin);

export default router;