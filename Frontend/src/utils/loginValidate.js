

const loginValidate = (input) => {
    let error = {}
    const { username, password } = input;

    if (!username.trim()) {
        error.email="Email is Required!"
    }
    else if(!username.includes("@maduracollege.edu.in")) {
        error.custom="Invalid Crendetials !"
    }

    if (!password.trim()) {
        error.password="Password is Required !"
    }
    else if (password.length < 6) {
        error.password="Enter Valid Password"
    }
    return error;
}

export default loginValidate