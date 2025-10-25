export function calculateBasicEmi(principalAmount, loanTime) {
  const basicEmi = [];
  for (let i = 1; i <= loanTime; i++) {
    basicEmi.push(Math.round(principalAmount / loanTime));
  }
  return basicEmi;
}

export function calRemainingPrincipal(principalAmount, loanTime) {
  const remainingPrincipal = [];
  remainingPrincipal.push(principalAmount);
  const emi = Math.round(principalAmount / loanTime);
  for (let i = 1; i <= loanTime; i++) {
    remainingPrincipal.push((principalAmount -= emi));
  }
  return remainingPrincipal;
}

export function calInterestEmi(principalAmount, loanTime, interestRate) {
  let principal = calRemainingPrincipal(principalAmount, loanTime);
  const interestPerEmi = [];

  principal.forEach((amount) => {
    const interest = Math.round(amount * (interestRate / 1200));
    interestPerEmi.push(interest);
  });
  return interestPerEmi;
}
export function calTotalEmi(principalAmount, loanTime, interestRate) {
  let principal = calRemainingPrincipal(principalAmount, loanTime);
  const totalEmiPerMonth = [];

  principal.forEach((amount) => {
    const interest = amount * (interestRate / 1200);
    const totalEmi = Math.round(principalAmount / loanTime + interest);
    totalEmiPerMonth.push(totalEmi);
  });
  return totalEmiPerMonth;
}

export function calculateTotal(arr) {
  let sum = 0;
  arr.forEach((num) => {
    sum += num;
  });
  return sum;
}
