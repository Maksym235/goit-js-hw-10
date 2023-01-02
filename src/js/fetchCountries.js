const BASE_URL = `https://restcountries.com/v3.1/name/`;

export function fetchCountries(names) {
  return fetch(
    `${BASE_URL}${names}?fields=name,capital,population,languages,flags`
  ).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}
