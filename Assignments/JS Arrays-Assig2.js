
// Payroll Cleanup and Net Pay Report

const payrollRecords = [
  { name: "Ravi", basePay: 42000, bonus: 3000, taxRate: 0.15 },
  { name: "Meera", basePay: 38000, bonus: 2500, taxRate: 0.12 },
  { name: "Kiran", basePay: -15000, bonus: 2000, taxRate: 0.1 },   // invalid basePay
  { name: "Anil", basePay: 45000, bonus: -500, taxRate: 0.18 },    // invalid bonus
  { name: "Divya", basePay: 50000, bonus: 5000, taxRate: 0.2 },
  { name: "Neha", basePay: 32000, bonus: 1500, taxRate: 1.2 }      // invalid taxRate
];

// Filter valid payroll records
const validRecords = payrollRecords.filter(emp =>
  emp.basePay > 0 &&
  emp.bonus >= 0 &&
  emp.taxRate >= 0 &&
  emp.taxRate <= 1
);

// Creating netPayReport using map
const netPayReport = validRecords.map(emp => {
  const gross = emp.basePay + emp.bonus;
  const netPay = gross - (gross * emp.taxRate);

  return {
    name: emp.name,
    netPay: netPay
  };
});

// Calculating totalNetPayout using reduce over netPayReport
const totalNetPayout = netPayReport.reduce((total, emp) => {
  return total + emp.netPay;
}, 0);

console.log("ValidRecords:", validRecords);
console.log("NetPayReport:", netPayReport);
console.log("TotalNetPayout:", totalNetPayout);