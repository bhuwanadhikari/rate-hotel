# rate-hotel
Web app build in mern stack in which one can rate hotels and get the top recommended hotels 

## Usage

Clone the repo 
``` js
git clone https://github.com/bhuwanadhikari/rate-hotel.git
``` 
Go to root folder of the project and install node_modules by this command
``` js
npm install
``` 

Traverse to folder frontend and then install
``` js 
cd client
npm install
```

Create a file with name keys_dev.js in config folder and write required keys as in keys_prod.js
``` js
//code inside keys_dev.js
module.exports = {
   mongoURI: 'your mongo uri'
   secret: 'your own secret'
};
```

To run the project run this command from the root folder.
``` js 
npm run dev
```
Boom!! You are done!!



