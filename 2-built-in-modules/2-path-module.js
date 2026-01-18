// ? Path module
// Used for handling and transforming file paths
// Normalize paths across OS, join paths, resolve absolute paths, etc.

// If you use Node.js on Windows + Linux (Docker, AWS) and don’t use path, your app will break sooner or later.

const path = require('path');

// 1. path.sep - Returns the platform specific path separator
console.log(`Path Separator: ${path.sep}`); // For win32: \ , For Linux/macOS: /

// 2. path.join - Joins paths segments safely
const pathJoin = path.join('users', 'images', 'photo.png');
console.log(pathJoin);

// 3. path.basename - Returns file name
console.log(`File name: ${path.basename(pathJoin)}`);

// 4. path.resolve - Returns an absolute path
const absolute = path.resolve(__dirname, '2-path-module.js');
console.log(`Absolute Path: ${absolute}`);

// 5. path.extname - Returns file extension
console.log(`File Extension: ${path.extname(absolute)}`);

// 6. path.parse - Breaks path into parts. Returns an object with root, dir, base, ext, name
const parsedPath = path.parse(absolute);
console.log('Parsed Path:', parsedPath);
