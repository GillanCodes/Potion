import {Router} from 'express';
let router: Router = Router();

import { getUser } from "../controllers/user.controller";

router.get('/:id', getUser);


export default router;