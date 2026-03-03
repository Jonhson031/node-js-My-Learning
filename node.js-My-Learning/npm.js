// npm - global command, comes preinstalled with Node
// npm --version // check npm version

// Local dependency 
// npm i <packageName> - install packange inside your project

// Global dependency 
// npm install <packageName> -g - install package globally
// ⚠️ Avoid global installs for projects.

// package.json - manifest file (stores important info about project/package)'
// Manual approach: (create package.json in the root, create properties etc)

// npm init (step by step, press enter to skip)
// npm init -y (everything default)

// ? Nodemon 
// Monitor for any changes in your source and automatically restart your server. (Live server, development only)
// npm i nodemon -D (install nodemon as dev dependency, -D or --save-dev)
// npx nodemon <fileName> (run file with nodemon, npx comes with npm 5.2+ and higher)
// "dev": "nodemon app.js" (add this script in package.json to run nodemon easily)
// npm run dev (run nodemon using the script defined in package.json)


// npm uninstall <packageName> - to uninstall a package
// npm outdated - check for outdated packages
// npm update <packageName> - to update a package