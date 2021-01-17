'use strict';

const SATURDAY = 6;
const SUNDAY = 0;

const SalaryType = {
  'FIXED': {SATURDAY_ADJUSTMENT: -1, SUNDAY_ADJUSTMENT: -2}, 
  'BONUS':{SATURDAY_ADJUSTMENT: 4, SUNDAY_ADJUSTMENT: 3}
};

Object.freeze(SalaryType);

class PayrollDateUtils {

  /**
   * Return the last date of the month from the provided date 
   * @param {Date} date 
   */
  getLastDateOfMonth(date) {
    const lastDay = new Date(date.getYear(), date.getMonth() + 1, 0);
    return lastDay.getDate();
  }

  /**
     * Method to adjust the date if needed.
     * If the date falls on a weekend it will be adjusted depending on if its fixed or bonus. 
     * @param {Date} date the date to adjust if needed
     * @param {SalaryType} salaryType the salary type, fixed or bonus
     */
  adjustForWeekend(date, salaryType) {
    let adjustment = 0;
    if(date.getDay() === SUNDAY) {
      adjustment = salaryType.SUNDAY_ADJUSTMENT;
    }
    if(date.getDay() === SATURDAY) {
      adjustment = salaryType.SATURDAY_ADJUSTMENT;
    }
    date.setDate(date.getDate() + adjustment);
  }
}

module.exports = new PayrollDateUtils;
module.exports.SalaryType = SalaryType;
