'use strict';

const should         = require('chai').should(); 
const payrollService = require('../../lib/services/payroll-service');

describe('payroll-service test', () => {
  describe('producePayroll test', () => {
    it('should return correct data for 12 months from jan 2021', () => {
      const expected = [
        ['January', 29, 15],
        ['February', 26, 15],
        ['March', 31, 15],
        ['April', 30, 15],
        ['May', 31, 19],
        ['June', 30, 15],
        ['July', 30, 15],
        ['August', 31, 18],
        ['September', 30, 15],
        ['October', 29, 15],
        ['November', 30, 15],
        ['December', 31, 15]
      ];
    
      const twelveMonthsPayrollRecords = 
                payrollService.producePayroll(new Date(2021, 0, 1), 12);
            
      twelveMonthsPayrollRecords.should.deep.equal(expected);
    });

    it('should return correct data for 2 months from feb 2020', () => {
      const expected = [
        ['February', 28, 19],
        ['March', 31, 18]
      ];
    
      const twelveMonthsPayrollRecords = 
                payrollService.producePayroll(new Date(2020, 1, 1), 2);
            
      twelveMonthsPayrollRecords.should.deep.equal(expected);
    });

    it('should return correct data for 4 months from nov 2020 wrapping year', () => {
      const expected = [
        ['November', 30, 18],
        ['December', 31, 15],
        ['January', 29, 15],
        ['February', 26, 15],
      ];
    
      const twelveMonthsPayrollRecords = 
                payrollService.producePayroll(new Date(2020, 10, 1), 4);
            
      twelveMonthsPayrollRecords.should.deep.equal(expected);
    });
  });
});