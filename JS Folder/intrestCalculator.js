class SIPCalculator {
  constructor(principalAmount, NumberOfPayments, rate) {
    this.p = principalAmount;
    this.n = NumberOfPayments;
    this.r = rate;
    this.i = 0; //monthly intrest
    this.finalValue = 0;
    this.monthInvested = 0;
    this.investedAmount = 0;
    this.profit = 0;
    this.monthlyAmount = 0;
    this.yearlyAmount = 0;
    this.taxAmount = 0;
    this.platformFee = 0;
    this.finalAmountCollected();
  }
  finalAmountInIndianValue(value) {
    return value.toLocaleString("en-IN");
  }
  //final value everytime
  finalAmountCollected() {
    {
      this.monthInvested = this.n * 12;
      this.i = this.r / 100 / 12;

      this.finalValue +=
        this.p *
        ((Math.pow(1 + this.i, this.monthInvested) - 1) / this.i) *
        (1 + this.i);
    }
  }
  //monthly SIP Calculator
  monthlySIP() {
    // this.monthInvested = this.n * 12;
    // this.i = this.r / 100 / 12;

    // this.finalValue =
    //   this.p *
    //   ((Math.pow(1 + this.i, this.monthInvested) - 1) / this.i) *
    //   (1 + this.i);

    this.finalValue = Math.round(this.finalValue);
    let TotalInIndianCurrency = this.finalAmountInIndianValue(this.finalValue);
    return TotalInIndianCurrency;
  }
  monthlyIncreamentOfValue() {
    let monthlyIncreamentValue = [];
    for (let i = 1; i <= this.n * 12; i++) {
      this.monthlyAmount =
        this.p * ((Math.pow(1 + this.i, i) - 1) / this.i) * 1 + this.i;
      monthlyIncreamentValue.push(this.monthlyAmount);
    }

    return monthlyIncreamentValue;
  }
  yearlyIncreamentOfValue() {
    let yearlyAmountArray = [];
    for (let i = 1; i <= this.n; i++) {
      this.yearlyAmount =
        this.p * ((Math.pow(1 + this.i, i * 12) - 1) / this.i) * (1 + this.i);
      yearlyAmountArray.push(this.yearlyAmount);
    }
    return yearlyAmountArray;
  }

  totalInvestedAmount() {
    this.investedAmount = this.p * this.n * 12;
    let TotalInIndianCurrency = this.finalAmountInIndianValue(
      this.investedAmount
    );
    return TotalInIndianCurrency;
  }
  totalProfit() {
    this.profit = this.finalValue - this.investedAmount;
    let TotalInIndianCurrency = this.finalAmountInIndianValue(this.profit);
    return TotalInIndianCurrency;
  }

  inflationAdjustedAmount(inflationRate) {
    inflationRate = inflationRate / 100;
    let inlfationAdjustedPerYear = [];
    let afterInflationAmount = 0;
    let inflations = [];
    for (let i = 1; i <= this.n; i++) {
      afterInflationAmount =
        this.finalValue / Math.pow(1 + inflationRate, this.n);
      inlfationAdjustedPerYear.push(Math.round(afterInflationAmount));
    }
    inflations.push(Math.round(afterInflationAmount));
    inflations.push(inlfationAdjustedPerYear);

    return inflations;
  }
  deductedInflationAmount(inflationRate) {
    let inflation = this.inflationAdjustedAmount(inflationRate);
    inflation = this.finalValue - inflation[0];
    return inflation;
  }

  longTermCapitalGainTax(taxPercentage, sasTax) {
    taxPercentage = taxPercentage || 12.5;

    //tax exeption under 1 lakh
    if (this.profit >= 125000) {
      this.taxAmount = ((this.profit - 125000) * taxPercentage) / 100;
    }
    let TotalInIndianCurrency = this.finalAmountInIndianValue(
      Math.round(this.taxAmount)
    );
    return TotalInIndianCurrency;
  }

  // having issues in inflation
  finalProfitWithoutInflation() {
    let profit = this.profit - this.taxAmount - this.platformFee;

    profit = Math.round(profit);
    let profitIndian = this.finalAmountInIndianValue(profit);

    return profitIndian;
  }
  finalProfitWithInflation(inflationRate) {
    let inflationAdjustedProfit = this.inflationAdjustedAmount(inflationRate);
    let adjustedProfit = inflationAdjustedProfit[0];
    let profit =
      adjustedProfit - this.investedAmount - this.taxAmount - this.platformFee;

    profit = Math.round(profit);

    return profit;
  }
  //upto here i have some problems

  platformChargesReduction(platformRate) {
    this.platformFee = this.finalValue * (platformRate / 100);
    this.platformFee = Math.round(this.platformFee);
    let TotalInIndianCurrency = this.finalAmountInIndianValue(this.platformFee);
    return TotalInIndianCurrency;
  }

  withInitalAmountSIPCalculate(initalAmount) {
    let initial = initalAmount || 0;
    this.p += initial;
  }
  //think it after completing git hub and frotend - i know if implement it now i
  // will break the code beyond repair

  //   withMonthlyWithdrawlSIP(withdrawlAmount, afterYear) {}
}

//for the DOM Manipulation
const monthlyAmount = document.getElementById("monthlyAmount");
const intrestRate = document.getElementById("rate");
const years = document.getElementById("years");
const inflationInput = document.getElementById("inflationInput");
const longTaxValue = document.getElementById("longTax");
const initalAmountValue = document.getElementById("initialAmountValue");
const platformRateValue = document.getElementById("platformRate");
const amountMonthlySpan = document.getElementById("AmountMontlySpan");
const yearSpan = document.getElementById("yearSpan");
// Select the h1 element
const heading = document.getElementById("headingLost");
// Select the span element
const span = document.querySelector("span#finalProfitfinal.gained");

const finalAmountDiv = document.getElementById("finalAmount");
const investedAmount = document.getElementById("investedAmount");
const profit = document.getElementById("profit");
const calculateBtn = document.getElementById("calculateBtn");
const inflationsDiv = document.getElementById("inflations");
const taxDiv = document.getElementById("tax");
const platformFeeDiv = document.getElementById("platformFee");
const finalProfitDiv = document.getElementById("finalProfit");
const finalProfitInflation = document.getElementById("finalProfitfinal");

const deductedInflationDiv = document.getElementById("deductedInflation");

calculateBtn.addEventListener("click", () => {
  const principalAmount = Number(monthlyAmount.value);
  const rate = Number(intrestRate.value);
  const noOfPayments = Number(years.value);
  const initialAmount = Number(initalAmountValue.value);

  if (!principalAmount || !rate || !noOfPayments) {
    return alert("Please input principal amount,intrestrate and years");
  }

  const monthyinvestment = new SIPCalculator(
    principalAmount,
    rate,
    noOfPayments
  );

  const principalAmountIndian =
    monthyinvestment.finalAmountInIndianValue(principalAmount);
  amountMonthlySpan.innerText = principalAmountIndian;

  const finalAmount = monthyinvestment.monthlySIP();
  const totalInvestedAmount = monthyinvestment.totalInvestedAmount();
  const profits = monthyinvestment.totalProfit();
  const inflations = monthyinvestment.inflationAdjustedAmount(
    inflationInput.value
  );
  const inflationValue = monthyinvestment.finalAmountInIndianValue(
    inflations[0]
  );
  const deductedInflation = monthyinvestment.deductedInflationAmount(
    inflationInput.value
  );
  const deductedInflationAmount =
    monthyinvestment.finalAmountInIndianValue(deductedInflation);
  const taxation = monthyinvestment.longTermCapitalGainTax(longTaxValue.value);
  const platformRateValues = monthyinvestment.platformChargesReduction(
    platformRateValue.value
  );

  const finalProfitWithoutInflation =
    monthyinvestment.finalProfitWithoutInflation();

  let finalProfitWithInflation = monthyinvestment.finalProfitWithInflation(
    inflationInput.value
  );
  //for style changes
  if (finalProfitWithInflation < 0) {
    heading.classList.remove("gained");
    span.classList.remove("gained");
    heading.classList.add("lost");
    span.classList.add("lost");
  }
  //for adding the commas
  finalProfitWithInflation = monthyinvestment.finalAmountInIndianValue(
    finalProfitWithInflation
  );

  monthyinvestment.withInitalAmountSIPCalculate(initialAmount);

  finalAmountDiv.innerText = finalAmount;
  investedAmount.innerText = totalInvestedAmount;
  profit.innerText = profits;
  inflationsDiv.innerText = inflationValue;
  deductedInflationDiv.innerText = deductedInflationAmount;
  taxDiv.innerText = taxation;
  platformFeeDiv.innerText = platformRateValues;
  finalProfitDiv.innerText = finalProfitWithoutInflation;
  finalProfitInflation.innerText = finalProfitWithInflation;
  yearSpan.innerText = noOfPayments;
});
