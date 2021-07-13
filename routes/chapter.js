var express = require('express');
var router = express.Router();

const {getAllChapters,getChapterById,addChapter,updateChapter,deleteChapter,chapterStatus,sortChapter}=require('../controllers/chapter')

router.get('/',getAllChapters);

router.get('/sort',sortChapter);

router.get('/:id',getChapterById);

router.post('/',addChapter);

router.put('/:id',updateChapter);

router.delete('/:id',deleteChapter);

router.put('/status/:id',chapterStatus); 

module.exports = router;