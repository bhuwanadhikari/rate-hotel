exports.convertToAverageRating = (rates) => {
   let totalFrequency = 0; totalValue = 0;
   let i = 0;
   // console.log(rates);
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


//sorting by rate
let sortedHotelArr;
exports.sortByTopRate = (allHotelsArr) => {
    sortedHotelArr = allHotelsArr.sort((a, b) => a.averageRating>b.averageRating ? -1 : 1);

   return sortedHotelArr;
};


//sorting by date
exports.sortByDate = (allHotelsArr) => {
   sortedHotelArr = allHotelsArr.sort((a, b) => a.date>b.date ? -1 : 1);
   return sortedHotelArr;
};

//sort by tea's rating
exports.sortForHome = (rates) => {
   //tea,lunch, meal, value of money, cleanliness
   const teaArr = [], lunchArr = [], mealArr = [], expensiveness = [], hygiene = [];

     return 1;
};