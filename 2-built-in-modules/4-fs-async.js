// ? fs moddule in ASYNC way (non-blocking) 
// const { readFile, writeFile } = require('fs');

// Using callback based fs, we get call-back hell. To avoid this, we can use Promises or async/await.
// readFile('../content/first.txt', 'utf8', (err, result) => {
//     if(err){
//         console.log('Error reading first file:', err);
//         return;
//     }
//     const first = result;
//     readFile('../content/second.txt', 'utf8', (err, result) => {
//         if(err){
//             console.log(err);
//             return;
//         }
//         const second = result;
//         writeFile('../content/async-result.txt', `Here is the result: ${first}, ${second}`, (err, result) => {
//             if(err){
//                 console.log(err);
//                 return;
//             }
//             console.log('File written successfully');
//         });
//     });
// })

// ? Using ES modules and async/await to avoid callback hell
const { readFile, writeFile, unlink, access } = require('fs/promises');

// Note: To use ES modules in Node.js, ensure "type": "module" is set in package.json

// import { readFile, writeFile, unlink, access } from 'fs/promises'; // ES (modern JS) modules

// Best practice is to use async/await
const combineFiles = async function () {
    try {
        const first = await readFile('../content/first.txt', 'utf8');
        const second = await readFile('../content/second.txt', 'utf8');

        await writeFile('../content/async-result.txt', `Here is the result: ${first}, ${second} with ES modules and async/await`);

        await access('../content/async-result.txt'); // to check if file exists

        await unlink('../content/async-result.txt') // delete files
        console.log('File deleted succesfully');
    } catch (err) {
        if (err.code === 'ENOENT') {
            console.log('File does not exist'); // if file doesn't exists, throw error
        }
        console.log(err);
    }
}

combineFiles();

// ? Top level await:
// const firstFileData = await readFile('../content/first.txt', 'utf8');
// console.log(firstFileData);

// const secondFileData = await readFile('../content/second.txt', 'utf8');
// console.log(secondFileData);

// await writeFile('../content/async-result.txt', `Here is the result: ${firstFileData}, ${secondFileData}`);

/* ❌ Wrong
    ES modules = promises
    ❌ Wrong
    async/await = ES modules

    ✅ Correct
    ES modules → how files are imported/exported
    Promises → how async work is represented
    async/await → nicer syntax for promises
    fs/promises → fs API that returns promises */

