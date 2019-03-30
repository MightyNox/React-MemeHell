import React from 'react'

export default function formMessage(formAlert) {
    const message = formAlert.message
    const type = formAlert.type

    if(message !== null){
        return (
            <small className={"form-text text-"+type+""}>
                {message}
            </small>
        )
    }else{
        return null
    }
}
