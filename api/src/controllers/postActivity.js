const { Activity, Country } = require('../db');

const createActivity = async (
	name,
	difficulty,
	duration,
	season,
	countryIds
) => {
	try {
		const activity = await Activity.create({
			name,
			difficulty,
			duration,
			season,
		});

		const countries = await Country.findAll({
			where: {
				id: countryIds,
			},
		});

		await activity.setCountries(countries);

		console.log(
			`Activity '${name}' created with associated countries: ${countryIds.join(
				', '
			)}`
		);
	} catch (error) {
		console.log(error);
	}
};

const postActivity = async (req, res) => {
	const { name, difficulty, duration, season, countryIds } = req.body;

	if (
		name &&
		difficulty &&
		duration &&
		season &&
		countryIds &&
		countryIds.length > 0
	) {
		try {
			await createActivity(name, difficulty, duration, season, countryIds);

			// Obtener la actividad recién creada con los países asociados
			const activity = await Activity.findOne({
				where: { name },
				include: { model: Country, as: 'countries' },
			});

			return res.status(201).json({
				msg: `Activity '${name}' created`,
				activity,
			});
		} catch (error) {
			console.log(error);
			return res.status(500).json({
				msg: 'Error creating activity',
			});
		}
	} else {
		return res.status(400).json({
			msg: 'Missing fields to create activity',
		});
	}
};

module.exports = { postActivity };
