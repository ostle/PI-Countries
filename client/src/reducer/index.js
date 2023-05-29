import { all } from 'axios';

const initialState = {
	countries: [],
	allCountries: [],
	activities: [],
};

function rootReducer(state = initialState, action) {
	switch (action.type) {
		case 'GET_COUNTRIES':
			return {
				...state,
				countries: action.payload,
				allCountries: action.payload,
			};
		case 'FILTER_BY_CONTINENT':
			const allCountries = state.allCountries;
			const continentFilter =
				action.payload === 'All'
					? allCountries
					: allCountries.filter((e) => e.continent === action.payload);
			return {
				...state,
				countries: continentFilter,
			};
		case 'ORDER_BY_NAME':
			const sortedArr =
				action.payload === 'ascAlf'
					? state.countries.sort(function (a, b) {
							if (a.name > b.name) {
								return 1;
							}
							if (b.name > a.name) {
								return -1;
							}
							return 0;
					  })
					: state.countries.sort(function (a, b) {
							if (a.name > b.name) {
								return -1;
							}
							if (b.name > a.name) {
								return 1;
							}
							return 0;
					  });
			return {
				...state,
				countries: sortedArr,
			};
		case 'ORDER_BY_POP':
			const sortedCountries = state.countries.slice().sort((a, b) => {
				if (action.payload === 'descPop') {
					return a.population - b.population;
				} else {
					return b.population - a.population;
				}
			});
			return {
				...state,
				countries: sortedCountries,
			};
		case 'GET_NAME_COUNTRIES':
			return {
				...state,
				countries: action.payload,
			};
		case 'POST_ACTIVITY':
			return { ...state };
		case 'GET_ACTIVITIES':
			return {
				...state,
				activities: action.payload,
			};
		case 'GET_DETAILS':
			return {
				...state,
				detail: action.payload,
			};

		default:
			return state;
	}
}

export default rootReducer;
