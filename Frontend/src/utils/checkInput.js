
const checkInput = (inputDept,inputYear) => {
    const dept = ["IT", "CS"]
    const year = [1, 2, 3]
    
    if (!inputDept && !inputYear) {
        return false
    }
   
    return dept.includes(inputDept) && year.includes(Number(inputYear))
}


export default checkInput