
import axios from 'axios'

const instance = axios.create()
instance.defaults.timeout = 3000

export default async function postData(route, request) {

    try{
        
        return await instance.post(route, request)

    }catch(error){
        if(error.response === undefined) {
            return ({
                error : {
                    message : "Connection error!", 
                    type : "danger"
                }
            })
        }

        const status = error.response.status
        const message =error.response.data.message
        if(status === 400 && message !== "Topology was destroyed"){
            return ({
                error : {
                    message : message, 
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