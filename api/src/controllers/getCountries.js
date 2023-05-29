const axios = require('axios');
const { Country, Activity } = require(`../db.js`);

const getApiInfo = async () => {
	const { data } = await axios.get(
		'https://rest-countries.up.railway.app/v3/all'
	);

	const countries = data.map(
		({
			cca3,
			name,
			flags,
			continents,
			capital,
			subregion,
			area,
			population,
		}) => ({
			id: cca3,
			name: name.common,
			flag: flags[0],
			continent: continents.join(', '),
			capital: Array.isArray(capital) ? capital.join(', ') : '',
			subregion,
			area,
			population,
		})
	);

	return countries;
};

const saveCountriesToDatabase = async (countries) => {
	try {
		await Country.bulkCreate(countries);
		console.log(
			'Los países se han guardado en la base de datos correctamente.'
		);
	} catch (error) {
		console.error('Error al guardar los países en la base de datos:', error);
	}
};

const getDbInfo = async () => {
	return await Country.findAll({
		include: {
			model: Activity,
			attributes: ['name'],
			through: {
				attributes: [],
			},
		},
	});
};

const getAllCountries = async () => {
	let infoTotal = [];

	try {
		// Intenta obtener los países de la base de datos
		const dbInfo = await getDbInfo();
		infoTotal = dbInfo;

		// Si no hay países en la base de datos, obtengo los datos de la API y guárdalos
		if (dbInfo.length === 0) {
			const apiInfo = await getApiInfo();
			await saveCountriesToDatabase(apiInfo);
			infoTotal = apiInfo;
		}
	} catch (error) {
		console.error('Error al obtener los países:', error);
	}

	return infoTotal;
};

const getCountries = async (req, res) => {
	const name = req.query.name;
	const countiresTotal = await getAllCountries();
	if (name) {
		const countryName = await countiresTotal.filter((e) =>
			e.name.toLowerCase().includes(name.toLowerCase())
		);
		countryName.length
			? res.status(200).send(countryName)
			: res.status(400).send('No se encontro el pais');
	} else {
		res.status(200).send(countiresTotal);
	}
};

const getCountriesById = async (req, res) => {
	const id = req.params.id;
	const countriesTotal = await getAllCountries();
	if (id) {
		const country = countriesTotal.find(
			(e) => e.id.toLowerCase() === id.toLowerCase()
		);
		if (country) {
			res.status(200).send(country);
		} else {
			res.status(400).send('No se encontró el país con el ID especificado');
		}
	}
};

module.exports = {
	getCountries,
	getCountriesById,
};
