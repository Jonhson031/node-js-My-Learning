// ? 1. OS Module
// The OS module provides information about the operating systym
// Like: CPU, memory, uptime, Platform differences (Windows / Linux / macOS), etc.

const os = require('os');

// 1.  os.platform() - Returns the user's OS platform.
console.log(`Your OS platform is: ${os.platform()}`); 

// 2. os.arch() - Returns CPU architechture
console.log(`Your CPU architecture is: ${os.arch()}`);

// 3. os.cpus() - Returns CPU information in an object
const cpus = os.cpus();
console.log(cpus);
console.log(cpus[0].model);

// 4. os.freemem() - Returns free memory in bytes
console.log(`Free memory: ${os.freemem() / (1024 * 1024 * 1024)} GB`); // Convert bytes to GB

// 5. os.totalmem() - Returns total memory in bytes
console.log(`Total memory: ${os.totalmem() / (1024 * 1024 * 1024)} GB`); // Convert bytes to GB

// 6. os.uptime() - Returns system uptime in seconds
console.log(`System uptime: ${os.uptime() / 3600} hours`); // Convert seconds to hours

// 7. os.homedir() - Returns the home directory of the current user
console.log(`Home Directory: ${os.homedir()}`);

// 8. os.tmpdir() - Returns the default directory for temporary files
console.log(`Temporary Directory: ${os.tmpdir()}`);

// 9. os.hostname() - Returns the hostname of the operating system. Very useful in AWS / Docker / Kubernetes.
console.log(`Hostname: ${os.hostname()}`);

// 10. os.userInfo() - Returns information about the current user in an object
console.log('User Info:', os.userInfo());

// 11. os.networkInterfaces() - Returns network interfaces in an object
console.log('Network Interfaces:', os.networkInterfaces());