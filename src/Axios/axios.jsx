import axios from "axios"

const api = "http://localhost:3001"

export const GetData  = async (setGetMatch) =>{
    try{
        const res = await axios.get(`${api}/matches`)
        setGetMatch(res.data)
    } catch (error){
        console.log(error);
    }
} 