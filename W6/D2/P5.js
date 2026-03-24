// Microtask & Macrotask in Node.js
console.log("1.Synchronos start .");

// Promice.resolve(...).then(...) schedule a microtask
Promise.resolve().then(function () {
    console.log("3. Promice microtask executed.");
});
// setTimeout(...,0) schedules task for a later time.
// Even with 0 delay, it dosen't interrupt current sync code
setTimeout(() => {
    console.log("4.Timer callback executed");
}, 0);

console.log("2. Synchronous end.");