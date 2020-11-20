import React, { useEffect, useState } from 'react';
import './App.css';

import { MenuItem,FormControl,Select,Card,CardContent } from "@material-ui/core";
import Infobox from './components/Infobox';
import Map from './components/Map';
import Table from './components/Table';
import { sortData } from './util';
import LineGraph from './components/LineGraph';




function App() {
  const [ countries,setCountries ] = useState([]);
  const [ country,setCountry ] = useState("worldwide");
  const [ countryInfo,setCountryInfo ] = useState({});
  const [ tableData,setTableData ] = useState([]);


  const onCountryChange = async(e) => {
    const countryCode = e.target.value;
    setCountry(countryCode);

    const url = countryCode === "worldwide" ? "https://disease.sh/v3/covid-19/all" : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url).then((response) => response.json()).then((data) => {
      setCountryInfo(data);
      setCountry(countryCode);
    })
  }



  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all").then(response => response.json()).then((data) => {
      setCountryInfo(data);
    })
  },[])

  useEffect(() => {
    const getCountriesData = async () => {
      fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));
          
          const sortedData = sortData(data);
          setTableData(sortedData);
          setCountries(countries);
        });
    };

    getCountriesData();
  }, []);


  useEffect(() => {
    
  },[country])

  // console.log("TABLE DATAAAA",tableData);


  return (
    <div className="app">
      <div className="app__left">
        <div className="app__header">
          <h1>Covid-19 Tracker</h1>
          <FormControl className="app__dropdown">
            <Select variant="outlined" value={country} onChange={onCountryChange}>
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {countries.map(country => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <div className="app__stats">
          <Infobox title="Coronavirus Cases" cases={countryInfo.todayCases} total={countryInfo.cases}/>
          <Infobox title="Recovered Cases" cases={countryInfo.todayRecovered} total={countryInfo.recovered}/>
          <Infobox title="Death" cases={countryInfo.todayDeaths} total={countryInfo.deaths}/>
        </div>

        <Map />

      </div>


      <Card className="app__right">
        <CardContent>
        <div className="app__information">
            <h3>Live Cases by Country</h3>
            <Table countries={tableData} />
            <h3>Worldwide new cases</h3>
              <LineGraph />
          </div>
        </CardContent>
      </Card>

    </div>
  );
}

export default App;
