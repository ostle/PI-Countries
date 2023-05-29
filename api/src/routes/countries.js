const { Router } = require('express');
const {
	getCountries,
	getCountriesById,
} = require('../controllers/getCountries');
const { postCountry } = require('../controllers/postCountry');

const router = Router();

router.get('/', getCountries);
router.get('/:id', getCountriesById);
router.post('/', postCountry);

module.exports = router;
