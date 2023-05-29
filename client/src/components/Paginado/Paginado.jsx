import React from 'react';
import style from './Paginado.module.css';

export default function Paginado({ countriesPerPage, allCountries, paginado }) {
	const pageNumbers = [];

	for (let i = 1; i < Math.ceil(allCountries / countriesPerPage); i++) {
		pageNumbers.push(i);
	}

	return (
		<nav>
			<ul className={style.paginado}>
				{pageNumbers &&
					pageNumbers.map((number) => (
						<li className={style.number} key={number}>
							<a onClick={() => paginado(number)}>{number}</a>
						</li>
					))}
			</ul>
		</nav>
	);
}
