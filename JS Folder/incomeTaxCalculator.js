class IncomeTaxCalculator {
  constructor(annualIncome) {
    this.annualIncome = annualIncome;
    this.taxAmount = 0;
  }
  incomeTax() {
    if (this.annualIncome > 1200000 && this.annualIncome <= 1600000) {
      this.taxAmount = (this.taxAmount * 15) / 100;
    } else if (this.annualIncome > 1600000 && this.annualIncome <= 2000000) {
      this.taxAmount = (this.taxAmount * 20) / 100;
    } else if (this.annualIncome > 2000000 && this.annualIncome <= 2400000) {
      this.taxAmount = (this.taxAmount * 25) / 100;
    } else if (this.annualIncome > 2400000) {
      this.taxAmount = (this.taxAmount * 30) / 100;
    } else {
      this.taxAmount = 0;
    }
  }
}
