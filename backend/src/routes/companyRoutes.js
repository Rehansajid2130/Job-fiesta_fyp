const express = require('express');
const router = express.Router();
const {
  getCompanies,
  getCompany,
  createCompany,
  updateCompany,
} = require('../controllers/companyController');
const { protect, authorize } = require('../middleware/auth');

router.route('/')
  .get(getCompanies)
  .post(protect, authorize('recruiter', 'employer', 'admin'), createCompany);

router.route('/:idOrSlug')
  .get(getCompany)
  .put(protect, authorize('recruiter', 'employer', 'admin'), updateCompany);

module.exports = router;
