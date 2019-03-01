const convertToAverageRating = (rates) => {
   let totalFrequency = 0; totalValue = 0;
   // console.log(rates);
   for(let item in rates) {
      totalFrequency += rates[item].length;
      for (let rateData of rates[item]){
         totalValue += rateData.value;
      }
   }

   // console.log(outputRates);
   return totalFrequency!==0 ? totalValue/totalFrequency : 0;
};

const countTotalRatings = (rates) => {
   let frequencyArr = [];
   for(let item in rates){
      for(let rateData of rates[item])
         frequencyArr.push(rateData.user);
   }

   //convert to string array from object array
   frequencyArr = frequencyArr.map(user => user.toString());
   // console.log("All array-----------------------------------------");
   frequencyArr = frequencyArr.filter((user, index) => {
      return frequencyArr.indexOf(user) === index;
   });
   return frequencyArr.length;

};



//sorting by rate
const sortByTopRate = (allHotelsArr) => {
   let sortedHotelArr;
   sortedHotelArr = allHotelsArr.filter(hotelData => hotelData.reviews>2);
   sortedHotelArr = sortedHotelArr.sort((a, b) => a.averageRating>b.averageRating ? -1 : 1);
   return sortedHotelArr;
};


//sorting by date
const sortByDate = (allHotelsArr) => {
   // console.log("Before sorting------------------------", allHotelsArr);
   let sortedHotelArr = allHotelsArr.sort((a, b) => {
         a= new Date(a.date).getTime();
         b= new Date(b.date).getTime();
         console.log(a);
         if(a>=b){
            return -1;
         }
         else {
            return 1;
         }
      }
   );

   // for(let hotel of allHotelsArr){
   //    console.log(hotel.date);
   // }

   // console.log("Before sorting------------------------", sortedHotelArr);

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
   homeObject.hygiene = sortForHomeHelper(allHotels, 'hygiene'); //as carromboard
   homeObject.overall = sortForOverall(allHotels);

   for(let quadruped in homeObject){
      homeObject[quadruped].sort((a,b) => a.averageRating>b.averageRating ? -1 : 1);
      homeObject[quadruped] = homeObject[quadruped].filter(hotelObj => {
         if(hotelObj) {
            return true;
         } else {
            return false;
         }
      });
      // console.log(homeObject[quadruped].length);

   }
   return homeObject;
};

//Helper for sort for home
const sortForHomeHelper = (allHotels, quadruped) => {
   unsortedQuadrupedArray = allHotels.map((hotelProfile, index) => {
      let totalQuadValue = 0;
      let totalQuadFrequency = hotelProfile.rates[quadruped].length;
      for(pedObject of hotelProfile.rates[quadruped]){
         totalQuadValue += pedObject.value;
      }
      const averageRating = totalQuadFrequency>0?totalQuadValue/totalQuadFrequency:0;
      if(totalQuadFrequency>2) {
         return {
            averageRating: averageRating.toFixed(1),
            date: hotelProfile.hotel.date,
            _id: hotelProfile.hotel._id,
            name: hotelProfile.hotel.name,
            avatar: hotelProfile.hotel.avatar,
            location: hotelProfile.hotel.location,
            reviews: countTotalRatings(hotelProfile.rates)
         };
      }
   });

   return unsortedQuadrupedArray;
};

//Helper for meal
const sortForMeal = (allHotels) => {
   unsortedsortedMealArray = allHotels.map((hotelProfile, index) => {
      let totalMealValue = 0; totalMealFrequency = 0;
      const mealArray = ['dal','rice','curry','chutney','salad','sideDish'];
      for(let mealItem of mealArray){
         totalMealFrequency += hotelProfile.rates[mealItem].length;
         for(let mealItemObject of hotelProfile.rates[mealItem]){
            totalMealValue += mealItemObject.value;
         }
      }
      const averageRating = totalMealFrequency>0?totalMealValue/totalMealFrequency:0;
      if(totalMealFrequency>4) {
         return {
            averageRating: averageRating.toFixed(1),
            date: hotelProfile.hotel.date,
            _id: hotelProfile.hotel._id,
            name: hotelProfile.hotel.name,
            avatar: hotelProfile.hotel.avatar,
            location: hotelProfile.hotel.location,
            reviews: countTotalRatings(hotelProfile.rates)
         };
      }
   });
   return unsortedsortedMealArray;
};
//Helper for overall
const sortForOverall = (allHotels) => {
   unsortedsortedOverallArray = allHotels.map((hotelProfile, index) => {
      if(countTotalRatings(hotelProfile.rates)> 3) {
         return {
            averageRating: convertToAverageRating(hotelProfile.rates).toFixed(1),
            date: hotelProfile.hotel.date,
            _id: hotelProfile.hotel._id,
            name: hotelProfile.hotel.name,
            avatar: hotelProfile.hotel.avatar,
            location: hotelProfile.hotel.location,
            reviews: countTotalRatings(hotelProfile.rates)
         };
      }
   });
   return unsortedsortedOverallArray;
};


module.exports = {
   convertToAverageRating,
   sortByTopRate,
   sortByDate,
   sortForHome,
   countTotalRatings
};