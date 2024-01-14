import { HStack, Heading, Image, Text, VStack } from '@chakra-ui/react'
import { FaTemperatureHalf } from 'react-icons/fa6'
import { DayWeather } from '../hooks/useData'

interface Props{
    data: DayWeather | undefined;
}

const TodaysWeather = ({data}: Props) => {
  return (
    <>
    <Heading>{data?.location.name}, {data?.location.country}</Heading>
    <HStack justifyContent='space-around'>
        <HStack>
        <FaTemperatureHalf size={50} color="#2B6CB0"/>
            <Text fontSize='2xl' color="blue.600">{data?.current.temp_c}°</Text>
        </HStack>
          <VStack>
            {data?.current.temp_c ? 
            <>
              <Image src={data.current.condition.icon} width='200px'/>
              <Text fontSize='1xl'>{data.current.condition.text}</Text>
            </>: <Text></Text>}
          </VStack>
            
          </HStack>
          
    </>
  )
}

export default TodaysWeather