
import axios from 'axios'

export default async function getData(route, request) {

    try{
        
        return await axios.get(route, request)

    }catch(error){
        const status = error.response.status
        if(status === 400){
            return ({
                error : {
                    message : error.response.data.message, 
                    type : "danger"
                }
            })
        }else if(status === 500){
            return ({
                error : {
                    message : "Oops! Server error! 👿", 
                    type : "danger"
                }
            })
        }else{
            return ({
                error : {
                    message : "Oops! Something went wrong! 👿", 
                    type : "danger"
                }
            })
        }
    }
}