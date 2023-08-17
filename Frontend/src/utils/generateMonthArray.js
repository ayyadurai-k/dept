
const generateMonthArray = () => {

    const nowMonth = new Date().getMonth() + 1;
    let month = []

    for (let i = 1; i <= nowMonth; i++){
        month.push(i);
    }
    return month;
}

export default generateMonthArray