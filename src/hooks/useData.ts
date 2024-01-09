import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { AxiosRequestConfig, CanceledError } from "axios";


interface Location{
    name: string;
    country: string;
}
interface Condition{
    text:string;
}

interface Current{
    temp_c: number;
    condition: Condition;
}

interface Day{
    avgtemp_c: number;
}

export interface ForecastDay{
    date: string;
    day: Day;
    condition: Condition;
}

interface Forcast{
    forecastday: ForecastDay[];
}

export interface DayWeather{
    location: Location;
    current: Current;
    forecast: Forcast;
}

// interface FetchResponse {
//     count: number;
//     results: DayWeather;
// }



const useData = (endpoint: string, requestConfig?: AxiosRequestConfig, deps?:any[]) => {
    const [data, setData] = useState<DayWeather>();
    const [error, setError] = useState('');

    useEffect(() => {

        const controller = new AbortController();

        apiClient
        .get<DayWeather>(endpoint,{ 
        signal: controller.signal, ...requestConfig})
        .then(results => {
            setData(results.data)
            console.log(results.data.location.name)
        })
        .catch(err => {
            if (err instanceof CanceledError) {
                return;
            }
            setError(err.message)
        })
        
        return () => controller.abort();
    }, deps ? [...deps] : [])

    return {data, error}
}

export default useData;