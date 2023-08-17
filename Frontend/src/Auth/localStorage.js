const setItem = (data,select) => {
    localStorage.setItem("token", data);
}

const removeItem = () => {
    localStorage.removeItem("token")
}
const isAuthenicated = () => {
    const token = localStorage.getItem("token");
    return token===null ? false : true; 
}

export {
    setItem,
    removeItem,
    isAuthenicated
}