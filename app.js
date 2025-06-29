//declare as
let totalLoanAmount = parseFloat(document.getElementById("total-amount").value);

const interestRate = parseFloat(document.getElementById("rate").value);

let loanTime = parseInt(document.getElementById("tenure").value);
const resultDisplay = document.querySelector(".result-container");

const months = document.getElementById("month").checked;

const years = document.getElementById("year").checked;

const allTotal = document.querySelector(".total");

const caluBtn = document.getElementById("calculate");
//functions

let emi;
let monthsEmi;
let monthlyInterest = 0;
let totalMonthlyEmi;
let emiArray = [];
let remainingPrincipalArray = [];
let interestArray = [];
let totalMonthlyEmiArray = [];
let TotalEmI = 0;
let totalInterest = 0;
resultDisplay.innerHTML = "";

if (!years) {
  months;
}
function showEmi() {
  if (years) {
    loanTime = loanTime * 12;
  }
  monthlyEaI();

  ///total Interest

  totalInterest = interestArray.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );

  //total EMI

  TotalEmI = emiArray.reduce((a, b) => a + b, 0);

  //total payment
  totalAmountPayable = TotalEmI + totalInterest;
  allTotal.innerHTML = `<p>Total Interest =${totalInterest}</p>
  <p>Total Payment Amount=${totalAmountPayable}`;

  // monthlyEmi
  function monthlyEaI() {
    for (let i = loanTime; i > 0; i--) {
      //monthly emi only
      emi = Math.round(totalLoanAmount / i);
      totalLoanAmount -= emi;
      monthsEmi = totalLoanAmount;
      emiArray.push(emi);
      //remaining pricipal
      remainingPrincipalArray.push(totalLoanAmount);

      // Monthly interest only
      monthlyInterest = Math.round(monthsEmi * (interestRate / 1200));

      interestArray.push(monthlyInterest);
      totalMonthlyEmi = monthlyInterest + emi;
      totalMonthlyEmiArray.push(totalMonthlyEmi);
    }

    const table = document.createElement("table");
    table.classList.add("table");

    table.innerHTML = `<tr>
<th>Months</th>
<th>Net EMI</th>
<th>Remaining Principal</th>
<th>Monthly Interest</th>
<th>Total Monthly EMI</th>
</tr>`;

    for (let i = 0; i < loanTime; i++) {
      let row = document.createElement("tr");
      row.innerHTML = `<td>${i + 1}</td>
  <td>${emiArray[i]}</td>
  <td>${remainingPrincipalArray[i]}</td>
  <td>${interestArray[i]}</td>
  <td>${totalMonthlyEmiArray[i]}</td>
  `;
      table.appendChild(row);
    }

    resultDisplay.appendChild(table);
  }
}
//event
caluBtn.addEventListener("click", (e) => {
  e.preventDefault();

  if (totalLoanAmount) {
    resultDisplay.innerHTML = "";
    showEmi();
    allTotal.style.display = "grid";
    /// input field clear

    document.getElementById("total-amount").value = "";
    document.getElementById("rate").value = "";
    document.getElementById("tenure").value = "";
  } else {
    return;
  }
});
