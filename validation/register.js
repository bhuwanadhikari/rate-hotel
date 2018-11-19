const validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data){
    let errors = {};

    data.name = !isEmpty(data.name) ? data.name : ''; //data.name has to be string
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    data.password2 = !isEmpty(data.password2) ? data.password2 : '';
    data.faculty = !isEmpty(data.faculty) ? data.faculty : '';

    if(validator.isEmpty(data.name)){
        errors.name = 'Name field should not be empty';
    }
    if(!validator.isLength(data.name, {min: 2, max: 30})){
        errors.name = 'Name must be between 2 and 30 characters';
    }


    if(validator.isEmpty(data.email)){
        errors.email = 'Email field should not be empty';
    }
    if(!validator.isEmail(data.email)){
        errors.email = 'Email you entered is not valid';
    }


    if(validator.isEmpty(data.password)){
        errors.password = 'Password field should not be empty';
    }
    if(!validator.isLength(data.password, {min: 6, max: 30})){
        errors.password = 'Length of password should be 6 to 30 characters';
    }


    if(validator.isEmpty(data.password2)){
        errors.password2 ='Confirm password field should not be empty';
    }
    if(!validator.equals(data.password, data.password2)){
        errors.password2 = 'Passwords must match';
    }


    if(validator.isEmpty(data.faculty)){
        errors.faculty = "Faculty field should not be empty";
    }



    return {
        errors,
        isValid: isEmpty(errors) //checks if error is empty
    };

};