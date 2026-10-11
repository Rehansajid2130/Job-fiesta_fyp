const express = require('express');
const router = express.Router();
const {
  enhanceResumeContent,
  suggestSkills,
  analyzeAtsScore,
  uploadAndParseResume
} = require('../controllers/resumeController');
const { uploadResume } = require('../middleware/upload');

router.post('/upload-and-parse', uploadResume.single('resume'), uploadAndParseResume);
router.post('/enhance', enhanceResumeContent);
router.post('/enhance-profile', (req, res) => {
  // Backwards compatibility endpoint for any legacy form calls
  req.body.type = 'summary';
  req.body.text = req.body.profile || '';
  return enhanceResumeContent(req, res);
});
router.post('/suggest-skills', suggestSkills);
router.post('/ats-analyze', analyzeAtsScore);

module.exports = router;
