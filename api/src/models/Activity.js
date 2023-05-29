const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
	const Activity = sequelize.define('activity', {
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			allowNull: false,
			primaryKey: true,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		difficulty: {
			type: DataTypes.INTEGER,
			allowNull: false,
			validate: {
				min: 1,
				max: 5,
			},
		},
		duration: {
			type: DataTypes.INTEGER,
			allowNull: true,
		},
		season: {
			type: DataTypes.ENUM('verano', 'otoño', 'invierno', 'primavera'),
			allowNull: false,
		},
	});
};
