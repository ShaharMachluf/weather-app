import {
  Card,
  CardBody,
  CardFooter,
  Divider,
  HStack,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import { ForecastDay } from "../hooks/useData";

interface Props {
  day: ForecastDay;
  isMobile: boolean
}

const WeatherCard = ({ day, isMobile }: Props) => {
  const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return (
    <Card width={isMobile ? '350px' : '182px' }>
      <CardBody>
        <Stack mt="6" spacing="3">
          <Heading size="md" textAlign="center">
            {dayNames[new Date(day.date).getDay()]}
          </Heading>
          <Image src={day.day.condition.icon}/>
          <Text textAlign='center'>{day.day.condition.text}</Text>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter>
        <HStack spacing={isMobile ? 60 : 20}>
          <Text color="blue.600" fontSize="1xl">
            {day.day.mintemp_c}°
          </Text>
          <Text color="blue.600" fontSize="1xl">
            {day.day.maxtemp_c}°
          </Text>
        </HStack>
      </CardFooter>
    </Card>
  );
};

export default WeatherCard;
