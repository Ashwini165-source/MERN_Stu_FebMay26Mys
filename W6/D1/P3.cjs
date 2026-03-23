// Using Custom CommonJs Module

const {calculateTax,applyDiscount,formatCurrency} = require("./P2.cjs");

const itemName = "Laptop";
const basePrice = 60000;

const discountedPrice = applyDiscount(basePrice,10);
const taxAmount = calculateTax(discountedPrice);
const finalPrice = discountedPrice + taxAmount;

console.log("Item : ",itemName);
console.log("BasePrice : ",formatCurrency(basePrice));
console.log("Discounted Price: ",formatCurrency(discountedPrice));
console.log("GST TAX @18%: ",formatCurrency(taxAmount));
console.log("Final Price: ",formatCurrency(finalPrice));