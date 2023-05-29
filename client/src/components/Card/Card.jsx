import React from 'react';
import { Link } from 'react-router-dom';
import style from './Card.module.css';

export default function Card({ id, flag, name, continent }) {
	return (
		<div className={style.card}>
			<img src={flag} alt='flag not found' />
			<Link to={`/countries/${id}`}>
				<h3>{name}</h3>
			</Link>
			<h5>{continent}</h5>
		</div>
	);
}
