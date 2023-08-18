
const date= new Date();


exports.getDate = ()=>{
    const finalDate = `${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}`;
    return finalDate;
}

exports.getMonth=()=>{
    return date.getMonth()+1;
}

exports.getYear=()=>{
    return date.getFullYear();
}

