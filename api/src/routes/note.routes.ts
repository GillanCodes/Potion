import {Router} from 'express';
let router: Router = Router();

import { bannerEdit, createNote, getNotes, insertContent } from '../controllers/note.controller';

import multer = require('multer')
const upload = multer()




router.get('/', getNotes)

router.post('/new', createNote)

router.patch('/:id/banner', upload.single('banner'), bannerEdit);
router.patch('/:id', insertContent);

export default router;