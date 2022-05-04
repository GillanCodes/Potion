import {Router} from 'express';
import { createNote } from '../controllers/note.controller';
let router: Router = Router();


router.post('/new', createNote)

export default router;