const statusMessages = {
    //Error - danger
    //Success - success

    //0 - 20 General
    0 : [
        "Oops! Something went wrong! 👿", 
        "danger"
    ],

    //21 - 50 Auth
    21 : [
        "You have to fill all gaps correctly!", 
        "danger"
    ],
    22 : [
        "Incorrect login or password!", 
        "danger"
    ],
    31 : [
        "You are logged out!", 
        "success"
    ],
    32 : [
        "You are not signed in!", 
        "danger"
    ],
    33 : [
        "User successfully created! Now you can sign in 😈", 
        "success"
    ],
    34 : [
        "You are signed in! Have fun 👻",
        "success"
    ],

    //51-100  Data status
    49 : [
        "Acceptable", 
        "success"
    ],
    50 : [
        "Incorrect login!", 
        "danger"
    ],
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
    ],
    62 : [
        "Incorrect password!",
        "danger"
    ],
    63 : [
        "Acceptable title!",
        "danger"
    ],
    64 : [
        "Incorrect title! Min. 6 signs",
        "danger"
    ],

    //101-150
    101 : [
        "Meme added successfully! 😈",
        "success"
    ]

} 

export default statusMessages