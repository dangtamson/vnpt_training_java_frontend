var Util ={

    Url:{
        getParameterByName: function (name, url) {
            if (!url) url = window.location.href;
            name = name.replace(/[\[\]]/g, "\\$&");
            var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
                results = regex.exec(url);
            if (!results) return null;
            if (!results[2]) return '';
            return decodeURIComponent(results[2].replace(/\+/g, " "));
        }
    },

    Base64:{
        fromObject:function(oParams) {
            var sParams = JSON.stringify(oParams);
            return btoa(sParams);
        },
        toObject: function (sBase64) {
            sParams = atob(sBase64);
            return JSON.parse(sParams);
        }
    },

    Validate: {
        isDate: function (txtDate, separator) {
            console.log('Validate.isDate',txtDate);
            var aoDate,           // needed for creating array and object
                ms,               // date in milliseconds
                month, day, year; // (integer) month, day and year
            // if separator is not defined then set '/'
            if (separator === undefined) {
                separator = '/';
            }
            // split input date to month, day and year
            aoDate = txtDate.split(separator);
            // array length should be exactly 3 (no more no less)
            if (aoDate.length !== 3) {
                return false;
            }
            // define month, day and year from array (expected format is m/d/yyyy)
            // subtraction will cast variables to integer implicitly
            month = aoDate[1] - 1; // because months in JS start from 0
            day = aoDate[0] - 0;
            year = aoDate[2] - 0;
            // test year range
            if (year < 1000 || year > 3000) {
                return false;
            }
            // convert input date to milliseconds
            ms = (new Date(year, month, day)).getTime();
            // initialize Date() object from milliseconds (reuse aoDate variable)
            aoDate = new Date();
            aoDate.setTime(ms);
            // compare input date and parts from Date() object
            // if difference exists then input date is not valid
            if (aoDate.getFullYear() !== year ||
                aoDate.getMonth() !== month ||
                aoDate.getDate() !== day) {
                return false;
            }
            // date is OK, return true
            return true;
        }
    },

    Convert: {
        getAge: function (strBirth ) {
            var age = '-';
            try {
                const [day, month, year] = strBirth.split("/")
                var birth  = new Date(year, month - 1, day);
                var today = new Date();
                var nowyear = today.getFullYear();
                var nowmonth = today.getMonth();
                var nowday = today.getDate();

                var birthyear = birth.getFullYear();
                var birthmonth = birth.getMonth();
                var birthday = birth.getDate();

                age = nowyear - birthyear;
                var age_month = nowmonth - birthmonth;
                var age_day = nowday - birthday;

                if(nowyear == birthyear){
                    return age_month + ' tháng tuổi';
                }

                if (age_month < 0 || (age_month == 0 && age_day < 0)) {
                    age = parseInt(age) - 1;
                }
                return age + ' tuổi';
            } catch (error) {
                console.error('Util.Convert.getAge | ',error);
                return age;
            }
            
            
        }
    }
}