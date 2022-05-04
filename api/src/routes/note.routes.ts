import {Router} from 'express';
import { createNote, getNotes } from '../controllers/note.controller';
let router: Router = Router();

router.get('/', getNotes)

router.post('/new', createNote)

export default router;