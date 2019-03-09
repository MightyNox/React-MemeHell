const statusMessages = {
    //Error - danger
    //Success - success

    //0 - 20 General
    0 : [
        "Oops! Something went wrong!", 
        "danger"
    ],

    //21 - 50 Auth
    21 : [
        "You have to fill all gaps correctly!", 
        "danger"
    ],

    //81-150  Data status
    51 : [
        "This nickname is free!", 
        "success"
    ],
    52 : [
        "This nickname is taken!", 
        "danger"
    ],
    53 : [
        "Incorrect nickname! Min. 3 signs", 
        "danger"
    ],
    54 : [
        "This email is free!", 
        "success"
    ],
    55 : [
        "This email is taken!", 
        "danger"
    ],
    56 : [
        "Incorrect email!", 
        "danger"
    ],
    57 : [
        "Acceptable", 
        "success"
    ],
    58 : [
        "Password is too weak! Min. 8 signs",
        "danger"
    ],
    59 : [
        "Matches", 
        "success"
    ],
    60 : [
        "Passwords have to match!",
        "danger"
    ],
    61 : [
        "First you have to set password!",
        "danger"
    ]

} 

export default statusMessages