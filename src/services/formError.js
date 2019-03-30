export default function formError(formAlert){
    let returnValue = "form-control"

    if(formAlert !== null){
        if(formAlert.type === "danger"){
            returnValue += " is-invalid"
        }
        else if(formAlert.type === "success"){
            returnValue += " is-valid"
        }
    }

    return returnValue
}