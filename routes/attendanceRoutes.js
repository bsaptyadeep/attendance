const express = require('express');
const { studentAttendance, getallStudentAttendance } = require('../controllers/studentAttendance');
const router = express.Router();

router.post('/', studentAttendance);
router.get('/', getallStudentAttendance);

module.exports = router;