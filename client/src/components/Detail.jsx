import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDetail } from '../actions/index';
import { Link } from 'react-router-dom';

export default function Detail(props) {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getDetail(props.match.params.id));
	}, [dispatch, props.match.params.id]);

	const myCountry = useSelector((state) => state.detail);

	return (
		<div style={styles.container}>
			{myCountry && (
				<div>
					<h1 style={styles.heading}>{myCountry.name}</h1>
					<img src={myCountry.flag} alt={myCountry.name} style={styles.image} />
					<p style={styles.text}>Capital: {myCountry.capital}</p>
					<p style={styles.text}>Continent: {myCountry.continent}</p>
					<p style={styles.text}>Subregion: {myCountry.subregion}</p>
					<p style={styles.text}>Area: {myCountry.area}</p>
					<p style={styles.text}>Population: {myCountry.population}</p>

					<h2 style={styles.activitiesTitle}>Activities:</h2>
					{myCountry.activities.length > 0 ? (
						<ul style={styles.activitiesList}>
							{myCountry.activities.map((activity) => (
								<li key={activity.id}>
									<p style={styles.text}>Name: {activity.name}</p>
								</li>
							))}
						</ul>
					) : (
						<p style={styles.text}>No activities found.</p>
					)}

					<Link to='/home' style={styles.link}>
						<button style={styles.button}>Back to Home</button>
					</Link>
				</div>
			)}
		</div>
	);
}

// Estilos en línea
const styles = {
	container: {
		margin: '20px auto',
		padding: '20px',
		border: '1px solid #ccc',
		borderRadius: '5px',
		background: '#f7f7f7',
		maxWidth: '400px',
	},
	heading: {
		fontWeight: 'bold',
		textDecoration: 'underline',
	},
	image: {
		width: '200px',
		height: 'auto',
		marginBottom: '10px',
	},
	text: {
		fontSize: '16px',
		marginBottom: '5px',
	},
	activitiesTitle: {
		fontSize: '20px',
		fontWeight: 'bold',
		marginTop: '20px',
		textDecoration: 'underline',
	},
	activitiesList: {
		listStyleType: 'none',
		paddingLeft: '0',
	},
	link: {
		textDecoration: 'none',
	},
	button: {
		padding: '10px 20px',
		background: '#f7f7f7',
		border: '1px solid #ccc',
		borderRadius: '5px',
		cursor: 'pointer',
	},
};
