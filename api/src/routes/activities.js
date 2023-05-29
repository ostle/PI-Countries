const { Router } = require('express');
const { getAllActivities } = require('../controllers/getActivities');
const { postActivity } = require('../controllers/postActivity');

const router = Router();

router.get('/', getAllActivities);
router.post('/', postActivity);

module.exports = router;
