const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'world',
});

connection.connect((err) => {
  if (err) {
    throw error;
  }
  console.log('Mysql Connected');
});

const selectNames =
  'SELECT Name,Population FROM country WHERE Population >8000000 ORDER BY Population ASC';
connection.query(selectNames, function (error, results, fields) {
  if (error) {
    throw error;
  }
  console.log(
    'Names of the country with population grater than 8 million:',
    results,
  );
});

const countryWithLand = 'SELECT Name FROM country WHERE Name LIKE "%land%"';
connection.query(countryWithLand, function (error, results, fields) {
  if (error) {
    throw error;
  }
  console.log(
    'The names of countries that have “land” in their names:',
    results,
  );
});

const cityWithPopulation =
  'SELECT Name,Population FROM city WHERE Population BETWEEN 500000 AND 1000000 ORDER BY Population ASC';
connection.query(cityWithPopulation, function (error, results, fields) {
  if (error) {
    throw error;
  }
  console.log(
    'The names of the cities with population in between 500,000 and 1 million:',
    results,
  );
});

const europeCountries = 'SELECT Name FROM country WHERE Continent = "Europe"';
connection.query(europeCountries, function (error, results, fields) {
  if (error) {
    throw error;
  }
  console.log('The name of all the countries on the continent Europe', results);
});

const countries_surfaces =
  'SELECT Name,SurfaceArea FROM country ORDER BY  SurfaceArea DESC';
connection.query(countries_surfaces, function (error, results, fields) {
  if (error) {
    throw error;
  }
  console.log(
    'All the countries in the descending order of their surface areas',
    results,
  );
});

const citiesInNetherlands = 'SELECT Name FROM city WHERE CountryCode = "NLD"';
connection.query(citiesInNetherlands, function (error, results, fields) {
  if (error) {
    throw error;
  }
  console.log('The names of all the cities in the Netherlands', results);
});

const populationOfRotterdam =
  'SELECT Population FROM city WHERE Name = "Rotterdam"';
connection.query(populationOfRotterdam, function (error, results, fields) {
  if (error) {
    throw error;
  }
  console.log('The population of Rotterdam is:', results);
});

const top10CountriesBySurfaceArea =
  'SELECT Name FROM country ORDER BY SurfaceArea DESC LIMIT 10';
connection.query(
  top10CountriesBySurfaceArea,
  function (error, results, fields) {
    if (error) {
      throw error;
    }
    console.log(' The top 10 countries by Surface Area are:', results);
  },
);

const top10CountriesByPopulation =
  'SELECT Name,Population FROM city ORDER BY Population DESC LIMIT 10';
connection.query(top10CountriesByPopulation, function (error, results, fields) {
  if (error) {
    throw error;
  }
  console.log(' The top 10 most populated cities are:', results);
});

const populationOfWorld =
  'SELECT SUM(Population) AS WorldPopulation FROM country';
connection.query(populationOfWorld, function (error, results, fields) {
  if (error) {
    throw error;
  }
  console.log(' The population number of the world is:', results);
});

connection.end();
