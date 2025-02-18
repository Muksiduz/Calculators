class ProjectRunningCostCalculator {
  constructor(
    hostingCost,
    dataStorageCost,
    compliancesCost,
    employeeCost,
    personalCost
  ) {
    this.hostingCost = hostingCost || 0;
    this.dataStorageCost = dataStorageCost || 0;
    this.compliancesCost = compliancesCost || 0;
    this.employeeCost = employeeCost || 0;
    this.personalCost = personalCost || 0;
    this.amountRecived = 0;
    this.buildMonths = 0; //month
    this.profit = 0;
  }
  overallProjectMakeAmount(
    amountRecived,
    buildMonths,
    freeHostingMonths,
    freeDataStorageMonths
  ) {
    //project building days
    this.buildMonths = buildMonths;
    this.amountRecived = amountRecived;
    this.profit = amountRecived;
    //personal cost per month
    this.profit -= this.personalCost * this.buildMonths;
    //employee cost per month
    this.profit -= this.employeeCost * this.buildMonths;
    //complainces cost
    this.profit -= this.compliancesCost * this.buildMonths;
    //hosting for 1 motnths
    this.profit -= this.hostingCost * freeHostingMonths;
    //datastorage
    this.profit -= this.freeDataStorageMonths * freeDataStorageMonths;

    return this.profit;
  }

  maintananceCostYearly(yearlyRecivedAmount) {
    let maintanaceCost = 0;

    //personal cost per month
    maintanaceCost += this.personalCost * 12;
    //employee cost per month
    maintanaceCost += this.employeeCost * 12;
    //complainces cost
    maintanaceCost += this.compliancesCost * 12;
    //hosting for 1 motnths
    maintanaceCost += this.hostingCost * 12;
    //datastorage
    maintanaceCost += this.freeDataStorageMonths * 12;

    let profit = yearlyRecivedAmount - maintanaceCost;

    return profit;
  }
  maintananceCostMonthly(monthlyRecivedAmount) {
    let maintanaceCost = 0;

    //personal cost per month
    maintanaceCost += this.personalCost;
    //employee cost per month
    maintanaceCost += this.employeeCost;
    //complainces cost
    maintanaceCost += this.compliancesCost;
    //hosting for 1 motnths
    maintanaceCost += this.hostingCost;
    //datastorage
    maintanaceCost += this.freeDataStorageMonths;

    let profit = monthlyRecivedAmount - maintanaceCost;

    return profit;
  }
}
