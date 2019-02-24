const convertToAverageRating = (rates) => {
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
const sortByTopRate = (allHotelsArr) => {
   let sortedHotelArr;
   sortedHotelArr = allHotelsArr.sort((a, b) => a.averageRating>b.averageRating ? -1 : 1);

   return sortedHotelArr;
};


//sorting by date
const sortByDate = (allHotelsArr) => {
   sortedHotelArr = allHotelsArr.sort((a, b) => a.date>b.date ? -1 : 1);
   return sortedHotelArr;
};

//sort by tea's rating
const sortForHome = (allHotels) => {
   //tea,lunch, meal, value of money, cleanliness
   const homeObject = {
      // each should have four
      tea: [],
      lunch: [],
      meal: [],
      expensiveness: [],
      hygiene: [],
      overall: [],
   };

   homeObject.tea = sortForHomeHelper(allHotels, 'tea');
   homeObject.lunch = sortForHomeHelper(allHotels, 'lunch');
   homeObject.meal = sortForMeal(allHotels);
   homeObject.expensiveness = sortForHomeHelper(allHotels, 'expensiveness');
   homeObject.hygiene = sortForHomeHelper(allHotels, 'hygiene');
   homeObject.overall = sortForOverall(allHotels);

   for(let quadruped in homeObject){
      homeObject[quadruped].sort((a,b) => a.averageRating>b.averageRating ? -1 : 1);
   }

   return homeObject;
};

//Helper for sort for home
const sortForHomeHelper = (allHotels, quadruped) => {
   quadrupedArray = allHotels.map((hotelProfile, index) => {
      let totalQuadValue = 0;
      let totalQuadFrequency = hotelProfile.rates[quadruped].length;
      for(pedObject of hotelProfile.rates[quadruped]){
         totalQuadValue += pedObject.value;
      }
      const averageRating = totalQuadFrequency>0?totalQuadValue/totalQuadFrequency:0
      return {
         averageRating: averageRating.toFixed(1),
         date: hotelProfile.hotel.date,
         _id: hotelProfile.hotel._id,
         name: hotelProfile.hotel.name,
         avatar: hotelProfile.hotel.avatar,
         location: hotelProfile.hotel.location,
         reviews: hotelProfile.reviews.length
      };
   });

   return quadrupedArray;
};

//Helper for meal
const sortForMeal = (allHotels) => {
   sortedMealArray = allHotels.map((hotelProfile, index) => {
      let totalMealValue = 0; totalMealFrequency = 0;
      const mealArray = ['dal','rice','curry','chutney','salad','sideDish'];
      for(let mealItem of mealArray){
         totalMealFrequency += hotelProfile.rates[mealItem].length;
         for(let mealItemObject of hotelProfile.rates[mealItem]){
            totalMealValue += mealItemObject.value;
         }
      }
      const averageRating = totalMealFrequency>0?totalMealValue/totalMealFrequency:0;
      return {
         averageRating: averageRating.toFixed(1),
         date: hotelProfile.hotel.date,
         _id: hotelProfile.hotel._id,
         name: hotelProfile.hotel.name,
         avatar: hotelProfile.hotel.avatar,
         location: hotelProfile.hotel.location,
         reviews: hotelProfile.reviews.length
      };
   });
   return sortedMealArray;
};
//Helper for overall
const sortForOverall = (allHotels) => {
   sortedOverallArray = allHotels.map((hotelProfile, index) => {
         return {
         averageRating: convertToAverageRating(hotelProfile.rates).toFixed(1),
         date: hotelProfile.hotel.date,
         _id: hotelProfile.hotel._id,
         name: hotelProfile.hotel.name,
         avatar: hotelProfile.hotel.avatar,
         location: hotelProfile.hotel.location,
         reviews: hotelProfile.reviews.length
      };
   });
   return sortedOverallArray;
};


module.exports = {
   convertToAverageRating,
   sortByTopRate,
   sortByDate,
   sortForHome
};