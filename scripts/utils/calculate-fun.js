export function calculateEmi() {
  console.log(calculateBasicEmi(12000, 10));
  console.log(calInterestEmi(12000, 10, 10));
  console.log(calRemainingPrincipal(12000, 10));
}

function calculateBasicEmi(principalAmount, loanTime) {
  const basicEmi = [];
  for (let i = 1; i <= loanTime; i++) {
    basicEmi.push(principalAmount / loanTime);
  }
  return basicEmi;
}

function calRemainingPrincipal(principalAmount, loanTime) {
  const remainingPrincipal = [];
  remainingPrincipal.principalAmount;
  for (let i = loanTime; i > 0; i--) {
    const emi = principalAmount / loanTime;

    remainingPrincipal.push((principalAmount -= emi));
  }
  return remainingPrincipal;
}

function calInterestEmi(principalAmount, loanTime, interestRate) {
  const principal = calRemainingPrincipal(principalAmount, loanTime);
  const interestPerEmi = [];
  principal.forEach((amount) => {
    const interest = (amount * loanTime * interestRate) / 1200;
    interestPerEmi.push(interest);
  });
  return interestPerEmi;
}
