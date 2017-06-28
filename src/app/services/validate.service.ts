import { Injectable } from '@angular/core';

@Injectable()
export class ValidateService {

    constructor() { }

    //Check if user enter all of fields on Login page
    validateRequiredFieldOnLogin(user) {
        if (user.username == undefined || user.password == undefined) {
            return false;
        } else {
            return true;
        }
    }

    // validateRequiredFieldOnRegisterUser(user) {
    //     if (user.username == undefined || user.name == undefined
    //         || user.dob == undefined || user.email == undefined
    //         || user.password == undefined) {
    //         return false;
    //     } else {
    //         return true;
    //     }
    // }

    validateDate(dateString) {
        // First check for the pattern
        if (!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateString))
            return false;

        // Parse the date parts to integers
        var parts = dateString.split("/");
        var day = parseInt(parts[0], 10);
        var month = parseInt(parts[1], 10);
        var year = parseInt(parts[2], 10);

        // Check the ranges of month and year
        if (year < 1000 || year > 3000 || month == 0 || month > 12)
            return false;

        var monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

        // Adjust for leap years
        if (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
            monthLength[1] = 29;

        // Check the range of the day
        return day > 0 && day <= monthLength[month - 1];
    };

    validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    validatePhoneNumber(phone) {
        var phoneno = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
        return phoneno.test(phone);
    }
}
