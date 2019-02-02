exports.convertToAverageRating = (rates) => {
   let totalFrequency = 0; totalValue = 0;
   let i = 0;
   console.log(rates);
   for(let item in rates) {
      totalFrequency += rates[item].length;
      for (let rateData of rates[item]){
         totalValue += rateData.value;
      }
      i++;
   }

   // console.log(outputRates);
   return totalFrequency!==0 ? totalValue/totalFrequency : 0;
};