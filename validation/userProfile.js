const validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateUserProfileInput(data){
    let errors = {};

    data.handle = !isEmpty(data.handle) ? data.handle : '';
    data.year = !isEmpty(data.year) ? data.year : '';



    if(validator.isEmpty(data.handle)){
        errors.handle = 'Handle is required';
    }
    if(!validator.isLength(data.handle, {min: 2, max: 40})){
        errors.handle = 'Handle\'s length should be between 2 and 40';
    }


    if(validator.isEmpty(data.year)){
        errors.year = 'Year is required';
    }

    //check for the social links
    if(!isEmpty(data.facebook)){
        if(!validator.isURL(data.facebook)){
            errors.facebook = 'URL you entered is not valid';
        }
    }
    if(!isEmpty(data.twitter)){
        if(!validator.isURL(data.twitter)){
            errors.twitter = 'URL you entered is not valid';
        }
    }
    if(!isEmpty(data.linkedin)){
        if(!validator.isURL(data.linkedin)){
            errors.linkedin = 'URL you entered is not valid';
        }
    }
    if(!isEmpty(data.github)){
        if(!validator.isURL(data.github)){
            errors.github = 'URL you entered is not valid';
        }
    }

    return {
        errors,
        isValid: isEmpty(errors) //checks if error is empty
    };

};