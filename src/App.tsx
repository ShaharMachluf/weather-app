import { useState } from 'react'
import SearchCity from './components/SearchCity'
import { Grid, GridItem, HStack, Text } from '@chakra-ui/react'
import useData from './hooks/useData'
import { FaTemperatureHalf } from "react-icons/fa6";
import { TiWeatherSunny } from "react-icons/ti";
import { TiWeatherCloudy } from "react-icons/ti";
import { TiWeatherDownpour } from "react-icons/ti";
import { TiWeatherSnow } from "react-icons/ti";
import WeatherCard from './components/WeatherCard';

const weatherLogo = (temp:number) => {
  if(temp > 20){
    return (<TiWeatherSunny />)
  } else if(temp > 10){
    return (<TiWeatherCloudy />)
  } else if(temp > 0){
    return (<TiWeatherDownpour />)
  } else {
    return (<TiWeatherSnow />)
  }
}

function App() {
  
  const [location, setLocation] = useState('Tel Aviv')

  const {data, error}= useData('/forecast.json', {
    params: {
      q: location,
      days: '7',
      aqi: "no",
      alerts: "no"
    }}, [location])

  return (
    <>
    <Grid templateAreas={`"nav" "main" "forecast"`}>
    <GridItem area="nav" paddingX={10} paddingY={5}>
      <HStack style={{width:'100%'}}>
        <SearchCity onFilter={(loc)=>{setLocation(loc)}}/>
      </HStack>
          
        </GridItem>
        <GridItem area='main' paddingX={10}>
          <HStack>
          <FaTemperatureHalf />
            <Text>{data?.current.temp_c}°</Text>
            {data?.current.temp_c ? weatherLogo(data?.current.temp_c): <Text></Text>}
          </HStack>
          <Text>{data?.location.name}, {data?.location.country}</Text>
        </GridItem>
        <GridItem area='forecast' paddingX={10}>
          <HStack>
            {data?.forecast.forecastday.map((day) => 
            (<WeatherCard day={day}/>))}
          </HStack>
        </GridItem>
    </Grid>
      
    </>
  )
}

export default App
