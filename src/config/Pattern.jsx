const pattern = {
    "nickname" : /^[\w\d-]{3,}$/,
    "email" : /^[\w-]+@[\w-]+(\.[a-zA-Z]{2,3}){1,2}$/,
    "password" : /^.{8,}$/,
    "title" : /^.{6,}$/,
    "comment" : /^.{10,}$/
}

export default pattern