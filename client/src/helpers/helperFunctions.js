import store from '../redux/store/store';


export const   convertRates = (rates, userId) => {
   const ratingItems = Object.keys(rates);

   const outputRates ={};
   let i = 0;
   for(let item in rates) {
      outputRates[ratingItems[i]] = {
         alreadyRated: false,
         users: [],
         rateValue: 0,
         frequency: rates[item].length
      };
         for (let rateData of rates[item]) {
            if(userId === rateData.user){
               outputRates[ratingItems[i]].alreadyRated = true;
            }
            outputRates[ratingItems[i]].users.push(rateData.user);
            outputRates[ratingItems[i]].rateValue += rateData.value;
         }


      i++;
   }

   // console.log(outputRates);
   return outputRates;
};
