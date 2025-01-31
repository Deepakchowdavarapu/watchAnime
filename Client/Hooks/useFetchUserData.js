import { useState } from "react"
const useFetchUserData=()=>{
    const [userData , setUserData] = useState({})

    const fetchTokenData = ()=>{
        try{
            const tokenData = localStorage.getItem('authToken')
            if(tokenData){
                const parsedData = JSON.parse(tokenData)
                setUserData(parsedData)
                // console.log('Parsed token data:', parsedData)
            }
        }catch(err){
                console.log(`Error parsing token data:`,err)
                setUserData({})
        }
    }

    return {fetchTokenData , userData}
}

export default useFetchUserData