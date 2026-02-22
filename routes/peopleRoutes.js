const { Router } = require('express');
const { getPeople, getPersonById, createPerson } = require('../controllers/peopleController');

const router = Router();

router.get('/', getPeople);
router.get('/:id', getPersonById);
router.post('/', createPerson);

module.exports = router;
