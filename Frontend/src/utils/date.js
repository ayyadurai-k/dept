const dateNow = Date.now();

const date= new Date(dateNow);

export const getDate = ()=>{
    const finalDate = `${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}`;
    return finalDate;
}

export const getMonth=()=>{
    return date.getMonth()+1;
}

export const getYear=()=>{
    return date.getFullYear();
}

