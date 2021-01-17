'use strict';

const should           = require('chai').should();  

const payrollDateUtils = require('../../lib/utils/payroll-date-utils');
const SalaryType       = require('../../lib/utils/payroll-date-utils').SalaryType;

describe('payroll-date-utils test', () => {
  describe('getLastDateOfMonth test', () => {
    it('should return 31 for Jan 2021', () => {
      const lastDate = payrollDateUtils.getLastDateOfMonth(new Date(2021, 0));
      lastDate.should.equal(31);
    });

    it('should return 28 for Jan 2021', () => {
      const lastDate = payrollDateUtils.getLastDateOfMonth(new Date(2021, 1));
      lastDate.should.equal(28);
    });

    it('should return 29 for Jan 2020', () => {
      const lastDate = payrollDateUtils.getLastDateOfMonth(new Date(2020, 1));
      lastDate.should.equal(29);
    });

    it('should return 30 for Sep 2020', () => {
      const lastDate = payrollDateUtils.getLastDateOfMonth(new Date(2020, 8));
      lastDate.should.equal(30);
    });
  });

  describe('adjustForWeekend fixed payroll test ', () => {
    it('should return 29 for Jan 2021 fixed pay date as last day is sunday', () => {
      let payrollDate = new Date(2021, 0, 31);
      payrollDateUtils.adjustForWeekend(payrollDate, SalaryType.FIXED);
      payrollDate.getDate().should.equal(29);
    });

    it('should return 30 for July 2021 fixed pay date as last day is saturday', () => {
      let payrollDate = new Date(2021, 6, 31);
      payrollDateUtils.adjustForWeekend(payrollDate, SalaryType.FIXED);
      payrollDate.getDate().should.equal(30);
    });

    it('should return 26 for Feb 2021 fixed pay date as last day is sunday', () => {
      let payrollDate = new Date(2021, 1, 28);
      payrollDateUtils.adjustForWeekend(payrollDate, SalaryType.FIXED);
      payrollDate.getDate().should.equal(26);
    });

    it('should return 31 for March 2021 fixed pay date as last day is not weekend', () => {
      let payrollDate = new Date(2021, 2, 31);
      payrollDateUtils.adjustForWeekend(payrollDate, SalaryType.FIXED);
      payrollDate.getDate().should.equal(31);
    });

    it('should return 28 for Feb 2020 fixed pay date as last day is Saturday', () => {
      let payrollDate = new Date(2020, 1, 29);
      payrollDateUtils.adjustForWeekend(payrollDate, SalaryType.FIXED);
      payrollDate.getDate().should.equal(28);
    });
  });

  describe('adjustForWeekend bonus payroll test ', () => {
    it('should return 15 for Jan 2021 bonus pay date 15th not weekend', () => {
      let payrollDate = new Date(2021, 0, 15);
      payrollDateUtils.adjustForWeekend(payrollDate, SalaryType.BONUS);
      payrollDate.getDate().should.equal(15);
    });

    it('should return 19 for May 2021 bonus pay date 15th is saturday', () => {
      let payrollDate = new Date(2021, 4, 15);
      payrollDateUtils.adjustForWeekend(payrollDate, SalaryType.BONUS);
      payrollDate.getDate().should.equal(19);
    });

    it('should return 18 for August 2021 bonus pay date 15th is sunday', () => {
      let payrollDate = new Date(2021, 7, 15);
      payrollDateUtils.adjustForWeekend(payrollDate, SalaryType.BONUS);
      payrollDate.getDate().should.equal(18);
    });
  });
});