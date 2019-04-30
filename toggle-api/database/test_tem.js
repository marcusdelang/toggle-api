var devicesDB = require('./devices');

devicesDB(function(devices){
    console.log(devices[2]);
    console.log(devices["2"]);

});