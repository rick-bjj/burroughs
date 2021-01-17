'use strict';

const payrollDateUtils = require('../utils/payroll-date-utils');
const SalaryType       = require('../utils/payroll-date-utils').SalaryType;


const BONUS_PAYROLL_DATE = 15;

const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

class PayrollService {

  /**
     * Method to produce array of records for payroll for each month 
     * 
     * @param {Date} fromDate the date to start
     * @param {Number} numberMonths number of months to produce for
     */
  producePayroll(fromDate, numberMonths) {
    let startDate = new Date(fromDate.getTime());
    const twelveMonthsPayroll = [];

    for(let i = 0; i < numberMonths; i++) {
      const lastDateOfMonth = payrollDateUtils.getLastDateOfMonth(startDate);

      const fixedPayrollDate = new Date(
        startDate.getFullYear(), startDate.getMonth(), lastDateOfMonth);
      const bonusPayrollDate = new Date(
        startDate.getFullYear(), startDate.getMonth(), BONUS_PAYROLL_DATE);

      payrollDateUtils.adjustForWeekend(fixedPayrollDate, SalaryType.FIXED);
      payrollDateUtils.adjustForWeekend(bonusPayrollDate, SalaryType.BONUS);
            
      let payrollMonth = this.__getMonthName(startDate.getMonth());
      twelveMonthsPayroll.push(
        [payrollMonth, fixedPayrollDate.getDate(), bonusPayrollDate.getDate()]);
      startDate.setMonth(startDate.getMonth() + 1);
    }  

    return twelveMonthsPayroll;
  }

  __getMonthName(month) {
    return monthNames[month];
  }
}

module.exports = new PayrollService(); 