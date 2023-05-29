import React from 'react';
import { Link } from 'react-router-dom';

export default function LandingPage() {
	const containerStyle = {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		height: '100vh',
		backgroundImage:
			"url('https://www.muycomputer.com/wp-content/uploads/2016/04/Tierra-en-4K.jpg')",
		backgroundSize: 'cover',
		backgroundPosition: 'center',
	};

	const titleStyle = {
		fontSize: '24px',
		fontWeight: 'bold',
		marginBottom: '20px',
		color: '#fff',
		textShadow: '2px 2px 4px #000',
	};

	const buttonStyle = {
		padding: '10px 20px',
		fontSize: '16px',
		borderRadius: '5px',
		backgroundColor: '#007bff',
		color: '#fff',
		textDecoration: 'none',
	};

	return (
		<div style={containerStyle}>
			<h1 style={titleStyle}>Bienvenidos a mi PI-Countries</h1>
			<Link to='/home'>
				<button style={buttonStyle}>Ingresar</button>
			</Link>
		</div>
	);
}
