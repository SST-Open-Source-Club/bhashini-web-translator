How to Create a NPM Package ?
=============================

An NPM package is a collection of JavaScript files and a package.json file that describes the package's metadata, dependencies, and other information. It allows developers to share and distribute code easily, making it simple for others to install and use their code in their own projects. NPM packages can include libraries, frameworks, tools, and other resources that enhance the development process.

**Prerequisites:**

-   Basic knowledge of programming or any basic programming language
-   Basic understanding of JavaScript

Follow the steps carefully, and by the end, you will understand everything about how to create and publish an npm package.

**Steps for Creating an Javascript Library:**

1.  **Create a fresh directory for your project.**

Overview of How package.json File Looks Like
--------------------------------------------

```json
{
  "name": "npm-package",
  "version": "1.0.0",
  "description": "A description of your package",
  "main": "index.js",
  "scripts": {
    "test": "echo /"Hey This is a NPM Packge Creationn /" "
  },
  "keywords": [
    "npm",
    "package",
    "javascript"
  ],
  "author": "Your Name",
  "license": "ISC"
}
```

-   **name**: The name of your NPM package.

-   **version**: The version number of your NPM package.

-   **description**: A brief description of what your NPM package does.

-   **main**: The entry point file of your NPM package (usually `index.js`).

-   **scripts**: A collection of scripts that can be executed using `npm run <script-name>`. The default script is the "test" script, which in this example simply echoes an error message.

-   **keywords**: An array of keywords that describe your NPM package, helping others find it.

-   **author**: Your name or the name of the package creator.

-   **license**: The license under which your NPM package is distributed.

    These are the basic parts of a package.json file. You can add more information and configure additional settings based on your package's needs.

1.  Make sure you have [Node JS](https://nodejs.org/en/) installed

    1.  If Node JS is installed, open the terminal in your directory and use the command `npm init`. To enter the details of your project in the terminal, follow these steps after running the `npm init` command:
    2.  Enter the name of your project. **My package name: is-abc** `Remember your library will be accessed by others using this name`
    3.  Enter the version number of your project.
    4.  Enter the description of your project.
    5.  Enter the entry point of your project (usually `index.js`).
    6.  Enter the test command for your project (Exceptional).
    7.  Enter the git repository for your project (Exceptional).
    8.  Enter the keywords related to your project (Exceptional).
    9.  Enter the author of your project.
    10. Choose the license for your project (press enter to use the default license).

    Once you have entered these details, you can press Enter to confirm and create the package.json file for your NPM package. This will initialize a new NPM package for your project.

2.  Try writing a small code. Here's an example: Go and create a new file the one you gave in the entry point of Your Project `index.js` file and write the following code:

    ```JavaScript
    function isABC(str){
    if(str === "ABC"){
    return true;
    }
    return false;
    }

    module.exports = isABC;
    ```

    So, now we have written a function `isABC` to check if a string is "ABC".

    Here, The `module.exports` is a special object in Node.js that is used to define the functionality that can be imported and used in other files. In this case, `module.exports = isABC;` exports the `isABC` function, making it available for other modules to use. When another file requires this module, they can access and execute the `isABC` function. It allows for modularity and code reusability in JavaScript projects.

3.  Now that we have written the code, we can Publish the package, But let's test it First.

To Test the package,

a. open Terminal b. use the command `npm link` c. **`npm link`** is a command in Node.js and npm that allows you to create a symbolic link between a package that you are developing and a project where you want to use that package. This is particularly useful during the development phase of a package when you want to test it in the context of another project without having to publish it to the npm registry or manually copy files. d. As we linked your library now lets create a new folder , I will name it as "test-folder" e. now go into the new folder , inside the folder create a new JS File and write the following code

```JavaScript
const isABC = require("is-abc");
//In Step 2 i mentioned the package name
// Inside the require we need to write the package name
// And our function can be used in this way
console.log(isABC("ABC"));
```

f. now after writing this code in a javascript file ,
   i created a file name `script.js`
   again open terminal and use the command
   `npm link <'npm package name'>`
   for me i.e,
   `npm link is-abc`
g. Now you can find that a new folder named `node modules`
    is created and if you explore , it contains the code you have written
    ,The Complete library by you.
f. now for us to test the code,
   Open Terminal and Type the command,
   `node <js_file_name>.js`
    i.e,
   `node script.js`
   now You can see the terminal is returning true.

1. Now we have tested our code successfully, lets publish this package
use the command `npm publish`,
You will get Errors here beacuse you did not login,
you need to create and NPM account on [npm](<https://www.npmjs.com/>),
then In the terminal type `npm login`,
It asks for username and password,
[ Remeber that you need to verify your emai ]
now use the keyword `npm publish`

Now, you have successfully publish your npm package.

**Key Point:**

- while publishing use `npm publish --access=public`
to make the published repository public