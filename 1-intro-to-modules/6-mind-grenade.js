// ? Side-effect imports.
// Runs the code without exporting any module

/* 6️⃣ When is this a BAD idea? ⚠️

❌ If the file is expected to return data
❌ If behavior is hidden or unclear
❌ If it causes side effects without documentation

9️⃣ Summary (remember this)
require() always executes the file
Exporting is optional
No export → returns {}
    - Commonly used for:
    - DB connections
    - App setup
    - Global configs */

    
const num1 = 5;
const num2 = 10;
const addValues = function(a, b){
    return console.log(`The sum of ${a} and ${b} is ${a + b}`)
}
addValues(num1, num2);
addValues(55, 233);