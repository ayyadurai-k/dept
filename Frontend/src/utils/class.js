export const getClass =(dept,year)=>{
   return  `${year==="1"  ? '1st' : year==="2" ? '2nd' : '3rd'  }  ${dept.toUpperCase()}`
}