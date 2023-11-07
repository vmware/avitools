const controller = require('../controllers/playbook.controller');
const express = require('express');
const router = express.Router();

router.post('/generatePlaybook', controller.generatePlaybook);
router.get('/getPlaybooks', controller.getPlaybooks);
router.get('/downloadPlaybook', controller.downloadPlaybook);

module.exports = router;
