const toggleModeButton = document.getElementById('toggleMode');
const bodyElement = document.body;

toggleModeButton.addEventListener('click', () => {
    bodyElement.classList.toggle('light-mode');
    bodyElement.classList.toggle('dark-mode');

   
    if (bodyElement.classList.contains('light-mode')) {
        toggleModeButton.textContent = 'Light Mode';
    } else {
        toggleModeButton.textContent = 'Dark Mode';
    }

    
    document.querySelectorAll('.nav, .inputsearch, .searchdrop, .country-card').forEach((element) => {
        element.classList.toggle('light-mode');
        element.classList.toggle('dark-mode');
    });
});




const countriesContainer = document.getElementById('countries-container');
const searchInput = document.querySelector('.inputsearch');
const regionSelect = document.querySelector('.searchdrop');

let countriesData = [];


fetch('https://restcountries.com/v3.1/all')
    .then(response => response.json())
    .then(countries => {
        countriesData = countries;
        displayCountries(countries);
    })
    .catch(error => console.error('Error fetching countries:', error));


function displayCountries(countries) {
    countriesContainer.innerHTML = '';
    countries.forEach(country => {
        const countryCard = document.createElement('div');
        countryCard.classList.add('country-card');
        
        countryCard.innerHTML = `
            <img src="${country.flags.png}" alt="${country.name.common} Flag" class="country-flag">
            <h2 class="country-name">${country.name.common}</h2>
            <p class="country-info"><strong>Population:</strong> ${country.population.toLocaleString()}</p>
            <p class="country-info"><strong>Region:</strong> ${country.region}</p>
            <p class="country-info"><strong>Capital:</strong> ${country.capital ? country.capital[0] : 'N/A'}</p>
        `;
        
        countriesContainer.appendChild(countryCard);
    });
}


searchInput.addEventListener('input', () => {
    const searchValue = searchInput.value.toLowerCase();
    const filteredCountries = countriesData.filter(country =>
        country.name.common.toLowerCase().includes(searchValue)
    );
    displayCountries(filteredCountries);
});


regionSelect.addEventListener('change', () => {
    const regionValue = regionSelect.value;
    const filteredCountries = regionValue === 'All' 
        ? countriesData 
        : countriesData.filter(country => country.region === regionValue);
    
    displayCountries(filteredCountries);
});
