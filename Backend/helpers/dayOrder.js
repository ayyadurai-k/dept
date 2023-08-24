const axios = require('axios');
const {JSDOM} = require("jsdom");


exports.getDayOrder=async()=>{
    let dayOrder;
   await axios
  .get("https://www.maduracollege.edu.in/")
  .then((response)=> {
    const dom = new JSDOM(response.data);
       const result = dom.window.document.querySelector('.day-order-part span').innerHTML;
    dayOrder=result.trim()
   }).catch((error)=>{
        dayOrder = null
   });

   return dayOrder
}