// ? Errors Outside Express: Unhandled Rejection
// * An unhandled rejection happens when a Promise fails but there is no .catch() or try/catch that can handles it:
const getUser = async () => {
    throw new Error("DB failed");
};

getUser(); // ❌ no await, no catch
// 👉 This creates an unhandledRejection event

// * Handling unhandledRejection
process.on("unhandledRejection", (err) => {
    console.error("💥 UNHANDLED REJECTION:", err);

    // Stops new requests > finishes existing ones > exits safely
    server.close(() => {
        process.exit(1);
    });
});


// ? uncaughtException
// * It's a process-level event that fires when sync error is NOT caught anywhere in the code
console.log(x) // x is undefined

// ! Should be declared before any other code to catch all unhandled exceptions
// * Handling uncaughtException
process.on('uncaughtException', (err) => {
    console.error("💥 UNHANDLED EXCEPTION:");
    process.exit(1);
})
