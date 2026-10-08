const express = require('express');
const router = express.Router();
const {
  enhanceResumeContent,
  suggestSkills,
  analyzeAtsScore
} = require('../controllers/resumeController');

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
