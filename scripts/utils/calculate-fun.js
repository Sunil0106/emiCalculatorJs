export function calculateSchedule(principalAmount, loanTime, interestRate) {
  const schedule = [];
  const monthlyRate = interestRate / 1200;

  // const basicPrincipal = Math.floor(principalAmount / loanTime);
  let remainingAmount = principalAmount;

  for (let month = 1; month <= loanTime; month++) {
    const outstandingBalance = remainingAmount;

    const principalPortion =
      month === loanTime ? remainingAmount : basicPrincipal;

    const interest = Math.round(outstandingBalance * monthlyRate);

    const monthlyEmi = principalPortion + interest;

    remainingAmount -= principalPortion;

    schedule.push({
      month,
      outstandingBalance,
      principalPortion,
      interest,
      monthlyEmi,
      remainingAmount,
    });
  }

  return schedule;
}
