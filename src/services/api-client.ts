import axios from "axios";

export default axios.create({
    baseURL: "https://api.weatherapi.com/v1",
    params: {
        key: '7a2ed8bfacc04835a45144307240901'
    }
})