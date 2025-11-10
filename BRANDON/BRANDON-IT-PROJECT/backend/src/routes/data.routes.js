const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const {
  getAllData,
  getData,
  createData,
  updateData,
  deleteData,
  getMyData
} = require('../controllers/data.controller');
const { protect } = require('../middleware/auth.middleware');
const { validate } = require('../middleware/validation.middleware');

// Validation rules
const dataValidation = [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('description').trim().notEmpty().withMessage('Description is required'),
  body('category').isIn(['general', 'technical', 'academic', 'personal', 'other'])
    .withMessage('Invalid category')
];

// All routes require authentication
router.use(protect);

router.get('/', getAllData);
router.get('/my-data', getMyData);
router.get('/:id', getData);
router.post('/', dataValidation, validate, createData);
router.put('/:id', updateData);
router.delete('/:id', deleteData);

module.exports = router;
