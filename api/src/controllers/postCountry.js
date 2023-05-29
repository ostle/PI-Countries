const { Activity, Country } = require('../db');

const createCountry = async (
	id,
	name,
	flag,
	continent,
	capital,
	subregion,
	area,
	poulation
) => {
	try {
		const country = await Country.create({
			id,
			name,
			flag,
			continent,
			capital,
			subregion,
			area,
			poulation,
		});

		return country;
	} catch (error) {
		console.log(error);
	}
};

const postCountry = async (req, res) => {
	const { id, name, flag, continent, capital, subregion, area, poulation } =
		req.body;
	const country = createCountry(
		id,
		name,
		flag,
		continent,
		capital,
		subregion,
		area,
		poulation
	);
	if (country) {
		return res.status(201).json({
			msg: `Country '${name}' created`,
			country,
		});
	} else {
		return res.status(400).json({
			msg: 'Missing fields to create activity',
		});
	}
};

module.exports = { postCountry };
