'use strict';

const payrollService            = require('./lib/services/payroll-service');
const createArrayCsvStringifier = require('csv-writer').createArrayCsvStringifier;

const csvStringifier = createArrayCsvStringifier({
  header: ['MONTH', 'FIXED SALARY DATE', 'BONUS SALARY DATE']
});


const twelveMonthsPayrollRecords = payrollService.producePayroll(new Date(), 12);
console.log(csvStringifier.getHeaderString()); 
console.log(csvStringifier.stringifyRecords(twelveMonthsPayrollRecords));