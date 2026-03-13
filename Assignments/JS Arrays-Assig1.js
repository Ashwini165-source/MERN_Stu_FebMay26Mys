
// Support Ticket Queue Processor

let tickets = [
  { id: "T201", priority: "LOW", resolved: false },
  { id: "T202", priority: "MEDIUM", resolved: true },
  { id: "T203", priority: "HIGH", resolved: false },
  { id: "T204", priority: "LOW", resolved: true },
  { id: "T205", priority: "MEDIUM", resolved: false }
];

console.log("Initial Ticket Queue:");
console.log(tickets);


//Adding a new urgent ticket to the front using unshift
tickets.unshift({ id: "T200", priority: "HIGH", resolved: false });


//Adding two normal tickets to the end using push
tickets.push(
  { id: "T206", priority: "MEDIUM", resolved: false },
  { id: "T207", priority: "LOW", resolved: true }
);


//Removing the first ticket using shift and storing it in currentTicket
let currentTicket = tickets.shift();


//Removing the last ticket using pop & storing it in droppedTicket
let droppedTicket = tickets.pop();


//Creating pending array using filter (only unresolved)
let pending = tickets.filter(ticket => ticket.resolved === false);

// getting only ticket IDs from pending tickets using map
let pendingIds = pending.map(ticket => ticket.id);


console.log("\nCurrent Ticket:");
console.log(currentTicket);

console.log("\nDropped Ticket:");
console.log(droppedTicket);

console.log("\nPending:");
console.log(pending);

console.log("\nPending IDs:");
console.log(pendingIds);