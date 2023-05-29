import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	getCountries,
	filterCountriesByContinent,
	orderByName,
	orderByPop,
} from '../actions';
import { Link } from 'react-router-dom';
import Card from '../components/Card/Card';
import Paginado from '../components/Paginado/Paginado';
import style from '../components/Card/Card.module.css';
import SearchBar from './SearchBar/SearchBar';

export default function Home() {
	const dispatch = useDispatch();
	const allCountries = useSelector((state) => state.countries);
	const [orden, setOrden] = useState('');
	const [currentPage, setCurrentPage] = useState(1);
	const [countriesPerPage, setCountriesPerPage] = useState(10);
	const indexOfLastCountry = currentPage * countriesPerPage;
	const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
	const currentCountries = allCountries.slice(
		indexOfFirstCountry,
		indexOfLastCountry
	);

	const paginado = (pageNumber) => {
		setCurrentPage(pageNumber);
	};

	useEffect(() => {
		dispatch(getCountries());
	}, [dispatch]);

	function handleClick(e) {
		e.preventDefault();
		dispatch(getCountries());
	}

	function handleFilterContinent(e) {
		const selectedContinent = e.target.value;
		setCurrentPage(1);
		dispatch(filterCountriesByContinent(selectedContinent));
	}

	function handleSortName(e) {
		e.preventDefault();
		dispatch(orderByName(e.target.value));
		setCurrentPage(1);
		setOrden(`Ordenado ${e.target.value}`);
	}

	function handleSortPop(e) {
		e.preventDefault();
		dispatch(orderByPop(e.target.value));
		setCurrentPage(1);
		setOrden(`Ordenado ${e.target.value}`);
	}

	return (
		<div className={style.container}>
			<Link to='/activities'>Nueva actividad</Link>
			<h1>PI-COUNTRIES</h1>
			<button
				onClick={(e) => {
					handleClick(e);
				}}
			>
				Recargar paises
			</button>
			<div>
				<select onChange={(e) => handleSortName(e)}>
					<option value='ascAlf'>A-Z</option>
					<option value='descAlf'>Z-A</option>
				</select>
				<select onChange={(e) => handleSortPop(e)}>
					<option value='ascPop'>Mayor Poblacion</option>
					<option value='descPop'>Menor Poblacion</option>
				</select>
				<select onChange={(e) => handleFilterContinent(e)}>
					<option value='All'>Todos los continentes</option>
					<option value='North America'>America del Norte</option>
					<option value='South America'>America del Sur</option>
					<option value='Africa'>Africa</option>
					<option value='Asia'>Asia</option>
					<option value='Europe'>Europa</option>
					<option value='Oceania'>Oceania</option>
					<option value='Antarctica'>Antarctica</option>
				</select>
				<Paginado
					countriesPerPage={countriesPerPage}
					allCountries={allCountries.length}
					paginado={paginado}
				/>
				<SearchBar></SearchBar>

				<div className={style.cardContainer}>
					{currentCountries?.map((e) => (
						<Card
							key={e.id}
							id={e.id}
							flag={e.flag}
							name={e.name}
							continent={e.continent}
						/>
					))}
				</div>
			</div>
		</div>
	);
}
