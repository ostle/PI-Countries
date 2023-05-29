import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { postActivity, getActivities, getCountries } from '../../actions/index';
import { useDispatch, useSelector } from 'react-redux';

function validate(input) {
	const errors = {};
	if (!input.name) {
		errors.name = 'Se requiere un nombre';
	} else if (
		input.difficulty < 1 ||
		input.difficulty > 5 ||
		!input.difficulty
	) {
		errors.difficulty = 'Dificultad debe ser un entero entre 1 y 5 inclusive';
	} else if (input.duration < 1 || !input.duration) {
		errors.duration = 'Duracion debe ser minimo 1 y no puede estar vacio';
	} else if (!input.countriesActivity.length) {
		errors.countriesActivity = 'Debes seleccionar al menos un pais';
	}
	return errors;
}

export default function ActivityCreate() {
	const dispatch = useDispatch();
	const history = useHistory();
	const countries = useSelector((state) => state.countries);
	const [errors, setErrors] = useState({});
	const [input, setInput] = useState({
		name: '',
		difficulty: '',
		duration: '',
		season: '',
		countriesActivity: [],
	});

	function handleChange(e) {
		setInput({
			...input,
			[e.target.name]: e.target.value,
		});
		setErrors(validate({ ...input, [e.target.name]: e.target.value }));
	}

	function handleCheck(e) {
		if (e.target.checked) {
			setInput({
				...input,
				season: e.target.value,
			});
		}
	}

	function handleSelect(e) {
		const selectedCountries = Array.from(
			e.target.selectedOptions,
			(option) => option.value
		);
		setInput({
			...input,
			countriesActivity: selectedCountries,
		});
	}

	function handleSubmit(e) {
		e.preventDefault();

		const formattedInput = {
			name: input.name,
			difficulty: parseInt(input.difficulty),
			duration: parseInt(input.duration),
			season: input.season,
			countryIds: input.countriesActivity,
		};

		console.log(formattedInput);
		dispatch(postActivity(formattedInput))
			.then(() => {
				window.alert('Actividad Creada');
				setInput({
					name: '',
					difficulty: '',
					duration: '',
					season: '',
					countriesActivity: [],
				});
				history.push('/home');
			})
			.catch((error) => {
				console.log('Error al crear la actividad:', error);
			});
	}

	useEffect(() => {
		dispatch(getCountries());
	}, [dispatch]);

	return (
		<div style={styles.container}>
			<Link to='/home' style={styles.link}>
				<button style={styles.button}>Volver</button>
			</Link>
			<h1 style={styles.heading}>Crea tu actividad</h1>
			<form onSubmit={handleSubmit} style={styles.form}>
				<div style={styles.formGroup}>
					<label style={styles.label}>Nombre:</label>
					<input
						type='text'
						value={input.name}
						name='name'
						onChange={handleChange}
						style={styles.input}
					/>
					{errors.name && <p style={styles.error}>{errors.name}</p>}
				</div>
				<div style={styles.formGroup}>
					<label style={styles.label}>Dificultad:</label>
					<input
						type='number'
						value={input.difficulty}
						name='difficulty'
						min={1}
						max={5}
						onChange={handleChange}
						style={styles.input}
					/>
					{errors.difficulty && <p style={styles.error}>{errors.difficulty}</p>}
				</div>
				<div style={styles.formGroup}>
					<label style={styles.label}>Duracion:</label>
					<input
						type='number'
						value={input.duration}
						name='duration'
						min={1}
						onChange={handleChange}
						style={styles.input}
					/>
					{errors.duration && <p style={styles.error}>{errors.duration}</p>}
				</div>
				<div style={styles.formGroup}>
					<label style={styles.label}>Temporada:</label>
					<div style={styles.radioGroup}>
						<input
							type='radio'
							id='primavera'
							name='season'
							value='primavera'
							checked={input.season === 'primavera'}
							onChange={handleCheck}
						/>
						<label htmlFor='spring' style={styles.radioLabel}>
							Primavera
						</label>
					</div>
					<div style={styles.radioGroup}>
						<input
							type='radio'
							id='verano'
							name='season'
							value='verano'
							checked={input.season === 'verano'}
							onChange={handleCheck}
						/>
						<label htmlFor='summer' style={styles.radioLabel}>
							Verano
						</label>
					</div>
					<div style={styles.radioGroup}>
						<input
							type='radio'
							id='otoño'
							name='season'
							value='otoño'
							checked={input.season === 'otoño'}
							onChange={handleCheck}
						/>
						<label htmlFor='autumn' style={styles.radioLabel}>
							Otoño
						</label>
					</div>
					<div style={styles.radioGroup}>
						<input
							type='radio'
							id='invierno'
							name='season'
							value='invierno'
							checked={input.season === 'invierno'}
							onChange={handleCheck}
						/>
						<label htmlFor='winter' style={styles.radioLabel}>
							Invierno
						</label>
					</div>
				</div>
				<div style={styles.formGroup}>
					<label style={styles.label}>Paises:</label>
					<select multiple onChange={handleSelect} style={styles.select}>
						<option value=''>Selecciona uno o más países</option>
						{countries.map((country) => (
							<option key={country.id} value={country.id}>
								{country.name}
							</option>
						))}
					</select>
					{errors.countriesActivity && (
						<p style={styles.error}>{errors.countriesActivity}</p>
					)}
				</div>
				<ul style={styles.selectedCountries}>
					{input.countriesActivity.map((countryId) => (
						<li key={countryId}>{countryId}</li>
					))}
				</ul>
				<button type='submit' style={styles.button}>
					Crear actividad
				</button>
			</form>
		</div>
	);
}

const styles = {
	container: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		margin: '20px',
	},
	link: {
		textDecoration: 'none',
		marginBottom: '10px',
	},
	button: {
		padding: '10px 20px',
		background: '#f0f0f0',
		border: 'none',
		cursor: 'pointer',
	},
	heading: {
		margin: '10px 0',
	},
	form: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'flex-start',
	},
	formGroup: {
		margin: '10px 0',
	},
	label: {
		marginRight: '10px',
		fontWeight: 'bold',
	},
	input: {
		padding: '5px',
		border: '1px solid #ccc',
	},
	error: {
		color: 'red',
		fontSize: '14px',
		marginTop: '5px',
	},
	radioGroup: {
		display: 'flex',
		alignItems: 'center',
		marginBottom: '5px',
	},
	radioLabel: {
		marginLeft: '5px',
	},
	select: {
		padding: '5px',
		border: '1px solid #ccc',
		width: '200px',
	},
	selectedCountries: {
		marginTop: '10px',
	},
};
