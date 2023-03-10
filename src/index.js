import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix';
import { fetchCountries } from './js/fetchCountries';
const DEBOUNCE_DELAY = 300;
const input = document.querySelector('#search-box');
const list = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

input.addEventListener('input', debounce(onInputNames, DEBOUNCE_DELAY));

function onInputNames(e) {
  e.preventDefault();
  const searchQuery = e.target.value.trim();
  clearInput();
  if (!searchQuery) {
    return;
  }
  fetchCountries(searchQuery)
    .then(renderMarkup)
    .catch(err => Notify.failure('Oops, there is no country with that name'));
}

function clearInput() {
  list.innerHTML = '';
  countryInfo.innerHTML = '';
}

function renderMarkup(arr) {
  if (arr.length === 1) {
    createCountryInfoMarkup(arr);
  } else if (arr.length > 1 && arr.length <= 10) {
    createCountryListMarkup(arr);
  } else if (arr.length > 10) {
    Notify.info('Too many matches found. Please enter a more specific name.');
  }
}

function createCountryInfoMarkup(arr) {
  const markup = arr
    .map(
      item => `<img src="${item.flags.svg}" alt="${
        item.name.official
      }" width="60" height="40">
    <h2 class="country-title">${item.name.official}</h2>
    <p class="country-descriptoin">Capital: ${item.capital}</p>
    <p class="country-description">Languages: ${Object.values(
      item.languages
    )}</p>
    <p class="country-description">Population: ${item.population}</p>`
    )
    .join('');

  countryInfo.innerHTML = markup;
  list.innerHTML = '';
}

function createCountryListMarkup(arr) {
  const markup = arr
    .map(
      item => `<li class="country-list__item">
      <img class="country-list__flags" src="${item.flags.svg}" alt="${item.name.official}" width="25" />
      <h2 class="country-list__name">${item.name.official}</h2>
    </li>
    `
    )
    .join('');

  list.innerHTML = markup;
  countryInfo.innerHTML = '';
}
