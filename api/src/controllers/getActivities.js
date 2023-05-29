const { Activity, Country } = require('../db');

const getAllActivities = async (req, res) => {
	try {
		const activities = await Activity.findAll({
			include: {
				model: Country,
				attributes: ['id', 'name'],
				through: { attributes: [] },
			},
		});

		res.status(200).send(activities);
	} catch (error) {
		console.log(error);
		res.status(500).send('Error al obtener las actividades');
	}
};

module.exports = {
	getAllActivities,
};
