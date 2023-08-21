
exports.getDate = ()=>{
    const finalDate = `${new Date().getDate()}-${new Date().getMonth()+1}-${new Date().getFullYear()}`;
    return finalDate;
}

exports.getMonth=()=>{
    return new Date().getMonth()+1;
}

exports.getYear=()=>{
    return new Date().getFullYear();
}

