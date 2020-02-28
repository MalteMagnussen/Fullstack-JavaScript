
# Fullstack-JavaScript
 4th Semester Fullstack JavaScript - Malte Hviid-Magnussen cph-mh748

| Week # and Exercise-Description Links:                                                                                                                     | Link to Answer Folder:                                                                                                                          |
|------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------|
| Week One - [29-01-2020](https://docs.google.com/document/d/1ad-D5zPpobOUAG5cdcFt1YU3yCAqilN2KOGzrjvWnq8/edit) - FullStack Intro, Repetition of 3. semester | [Answer](https://github.com/MalteMagnussen/Fullstack-JavaScript/tree/master/week1)                                                              |
| Week Two - [05-02-2020](https://docs.google.com/document/d/16uX1YKzWGGz4tG112zlxp93oSTtH7SNiNvpXtdLW7nM/edit) - Node Intro, Simple Servers                 | [Answer](https://github.com/MalteMagnussen/Fullstack-JavaScript/tree/master/week2/Exercises                                                     |
| Week Three - [12-02-2020](https://docs.google.com/document/d/1jpqmitlHKeIcWzDdbe-jO281xFQiGywP3c2iKCDeffQ/edit) - Promises, Async Await                    | [Answer](https://github.com/MalteMagnussen/Fullstack-JavaScript/tree/master/week3/exercises)                                                    |
| Week Four - [19-02-2020](https://docs.google.com/document/d/1PIMMeYPqN8Qzo4qsgjjuNAC0_15RIEVjD0DbBhcaP-0/edit) - Webpack, Babel                            | [Answer](https://github.com/MalteMagnussen/Fullstack-JavaScript/tree/master/week4)<br>Didn't have a lot of success because of outdated guides.  |
| Week Five - [26-02-2020](https://docs.google.com/document/d/1Lxg0SkcKzBkARM3nzS-82xHZfqgDECJA9blTbIjaJTQ/edit) - TypeScript                                | [Answer](https://github.com/MalteMagnussen/Fullstack-JavaScript/tree/master/week5/typeScriptExercise/src)                                       |



## Period-1 Vanilla JavaScript, es2015/15.., Node.js, Babel + Webpack and TypeScript![](https://lh3.googleusercontent.com/fyt79j4dwu7q5XEw5MZ6ijPxP3cw5QKewj5t2LbZUF_15Zin-K2FJ-WtbVm1JQ0nzZ8b_FyFxbAy8rWptWo6AlEjGAL7ZRYFp6cMoepa3Z3N8TJ60utMTq3NxY0gIfry6RKr5qiF)

  

Note: _This description is too big for a single exam-question. It will be divided up into a number of smaller questions for the exam_

#### Explain and Reflect:

-   Explain the differences between Java and JavaScript and Java and node. Topics you could include:
    

	*  that Java is a compiled language and JavaScript a scripted language 
    
	-   Java is both a language and a platform 
    
	-   General differences in language features. 
    
	-   Blocking vs. non-blocking

> __Difference between Java and JavaScript:__
> - Java 
>   * kan køre i et VM eller direkte i fx NetBeans.
>   * Programming language.
>   * Compiled language. Dvs IDE kan fange errors i compiletime. 
>   
> - JavaScript 
>   * kan kun køre i browseren (og nu fx Node. Node simulerer en browser. Fx Chromes V8 engine)
>   * Scripting language.
>   * Normalt kan IDE ikke hjælpe særlig meget. (Kan den dog nu med TypeScript, men det kræver så også at man transpilerer det ned til JavaScript, før det kan køres i browser.)
> - Blocking vs Non-Blocking
>    * If something is blocking, that means the rest of the code needs to wait, until that blocking call is done. 
>    * This is usually tied to external API calls. 
>    * You wanna make as much of your code non-blocking as possible as to avoid wasting time where your program is just stalling while a server responds, which it might never. 
>    * JavaScript is natively single-threaded, but with the event-loop (https://youtu.be/8aGhZQkoFbQ) we can avoid most of the blocking issues tied to this. 

-   Explain generally about node.js, when it “makes sense” and npm, and how it “fits” into the node echo system.
> I'm assuming this was meant to be "eco-system"? 
> 
> Node helps manage packages, so that if you have many people working on the same project, everyone is using the same packages and on the same versions.
> 
> It manages this in the package.json file.
> 
> Node Package Manager (npm) also makes it easy to install and uninstall new packages in different scopes (project or global or developer only). 
> 
> Node can also run JavaScript via a shell, without needing to run it in the browser and then checking the developer tools there, which would be cumbersome after a while. Then its easier to just run the file via Node. 
    
-   Explain about the Event Loop in JavaScript, including terms like: blocking, non-blocking, event loop, callback que and "other" API's. Make sure to include why this is relevant for us as developers.
> JavaScript is by design single-threaded, but the engines in the browsers have WEB APIs that help make it asynchronous. 
> 
> I explained a bit about blocking vs non-blocking above
> 
> [Good site for understanding the event loop.](http://latentflip.com/loupe)
    
-   Explain the terms JavaScript Engine (name at least one) and JavaScript Runtime Environment (name at least two)
> V8 is chromes JavaScript Engine.
> 
> It is what the browsers use to run javascript. 
> 
> It helps with WEB APIs to fx make JS asyncronous. 
>
> Unlike C and other compiled languages, Javascript runs in a container - a program that reads your js codes and runs them. This program must do two things
>
>-   parse your code and convert it to runnable commands
>-   provide some objects to javascript so that it can interact with the outside world.
>
>The first part is called Engine and the second is Runtime.
>
> For example, the Chrome Browser and node.js use the same Engine - V8, but their Runtimes are different: in Chrome you have the  `window`, DOM objects etc, while node gives you  `require`, Buffers and processes. 
   
-   Explain (some) of the purposes with the tools Babel and WebPack and how they differ from each other. Use examples from the exercises.
> Babel helps compile JavaScript down to a previous version, so that if you're using next-gen JS features from fx ES2019, but the browser only handles up to ES5, then you can compile it down to ES5 and still have it work in the browser, while still writing modern code while developing. 

> WebPack puts all of your code into one file. This makes your app into a Single Page Application. Everything loads at once (by default). But this can cause issues with debugging the code. You can however enable "mapping" so you can debug once again. 

> Examples found here: [https://github.com/MalteMagnussen/Fullstack-JavaScript/tree/master/week4](https://github.com/MalteMagnussen/Fullstack-JavaScript/tree/master/week4) 
   

#### Explain using sufficient code examples the following features in JavaScript (and node)

-   Variable/function-Hoisting
> Hoisting is that variables is taken to the top of the code.
> 
> This means you can declare something below where you use it. 
    
-   this in JavaScript and how it differs from what we know from Java/.net.
> I still don't really understand `this` in JavaScript. 

> In Java it just refers to whatever class you're in. 
    
-   Function Closures and the JavaScript Module Pattern 
> Closure:
> `var add = (function () {  `
> 
>`var counter = 0;  `
>
>`return  function () {counter += 1; return counter}  `
>
>`})();`
>  
>`add();  `
>
>`add();  `
>
>`add();`  
>
>`// the counter is now 3`

> Not sure about what the JavaScript Module Pattern is. 

> [https://ultimatecourses.com/blog/mastering-the-module-pattern](https://ultimatecourses.com/blog/mastering-the-module-pattern)

> `const example require ('example')` <- Node Module

> `const MyModule require ('./MyModule')` <- Selfmade Module in same folder. 

> You can also destructure the element. If you only wish to use Feature X and Y from module Z: `const {X,Y} require ('Z')` 

> [https://www.w3schools.com/nodejs/nodejs_modules.asp](https://www.w3schools.com/nodejs/nodejs_modules.asp)
    
-   User-defined Callback Functions (writing your own functions that take a callback)
> In JavaScript everything is an Object.

> Even a function is an Object. 
>
>So how can we use this? 

>We can pass functions as parameters to other functions, so they can get called conditionally. 
    
-   Explain the methods map, filter  and reduce
> They are all used on iterables / collections / arrays. They all return a new array and dont edit the original one. 

> Map calls the function you gave as callback on each element in the list. 

> Filter calls a function with return boolean on each element, and filters them out of the return list if the callback returns false. 

> Reduce accumulates based on the callback function you hand it: [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce)
    
-   Provide examples of user-defined reusable modules implemented in Node.js (learnynode - 6)
> [https://github.com/MalteMagnussen/Fullstack-JavaScript/blob/master/week2/Programming%20with%20Mosh/logger.js](https://github.com/MalteMagnussen/Fullstack-JavaScript/blob/master/week2/Programming%20with%20Mosh/logger.js)

> Learn You Node [https://github.com/MalteMagnussen/Fullstack-JavaScript/tree/master/learnyounode](https://github.com/MalteMagnussen/Fullstack-JavaScript/tree/master/learnyounode)
    
-   Provide examples and explain the es2015 features: let, arrow functions, this, rest parameters, destructuring objects and arrays, maps/sets etc.

> let is a reduced scope version of var.

> arrow functions are lambdas. instead of writing `function myName() {}` you can write `const myName = () => {}` 

> I don't understand `this` in JavaScript.

> Rest parameters takes the rest of the parameters given to a function. So we can give a variable amount of parameters: [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters)

> We can destructure objects. 
> `myObject` or `{myFunction}`
> So instead of having to do `myObject.myFunction` we can do `myFunction`

> A set is a collection where each value may only occur once.

> a map is a collection of key value pairs.
    
-   Provide an example of ES6 inheritance and reflect over the differences between Inheritance in Java and in ES6.

> [https://github.com/MalteMagnussen/Fullstack-JavaScript/blob/master/week5/typeScriptExercise/src/inheritance.ts](https://github.com/MalteMagnussen/Fullstack-JavaScript/blob/master/week5/typeScriptExercise/src/inheritance.ts)

> ES6 inheritance is just syntactic sugar to make it look like java inheritance. Instead its under the hood using prototype.
    
-   Explain and demonstrate, how to implement your own events, how to emit events and how to listen for such events
> [https://github.com/MalteMagnussen/Fullstack-JavaScript/tree/master/week2/Programming%20with%20Mosh](https://github.com/MalteMagnussen/Fullstack-JavaScript/tree/master/week2/Programming%20with%20Mosh)

> Have a look at logger.js and emitter.js

> You can raise events (emitting) when something happens.

> You can listen to events (listening) when X event happens and then trigger something. 

> Its basically an Observer pattern
    

#### ES6,7,8,ES-next and TypeScript

-   Provide examples with es-next, running in a browser, using Babel and Webpack
> Examples of _what_, exactly? 
    
-   Explain the two strategies for improving JavaScript: Babel and ES6 (es2015) + ES-Next, versus Typescript. What does it require to use these technologies: In our backend with Node and in (many different) Browsers
> If you wanna write modern JavaScript you can either use Babel to transpile your code (source-to-source compiling), down to a previous version of JavaScript, that can be read by all browsers (because they don't all implement all new JavaScript features instantly. 

> Or you can use Typescript, which kinda does the same thing, but provides another layer of features on top of JavaScript, and also transpiles down to more primitive code, runnable by all browsers engines. 
    
-   Provide a number of examples to demonstrate the benefits of using TypeScript, including, types, interfaces, classes and generics
> [https://github.com/MalteMagnussen/Fullstack-JavaScript/tree/master/week5](https://github.com/MalteMagnussen/Fullstack-JavaScript/tree/master/week5)    

-   Explain the ECMAScript Proposal Process for how new features are added to the language (the TC39 Process)

> I don't understand it at all, but here are some links:

 > [https://tc39.es/process-document/](https://tc39.es/process-document/)
 
> [https://github.com/tc39/proposals](https://github.com/tc39/proposals)

> [https://medium.com/swlh/understanding-tc39-process-and-stage-3-specifications-f0b6914d5d24](https://medium.com/swlh/understanding-tc39-process-and-stage-3-specifications-f0b6914d5d24)

### Callbacks, Promises and async/await

Explain about (ES-6) promises in JavaScript including, the problems they solve, a quick explanation of the Promise API and:

-   Example(s) that demonstrate how to avoid the callback hell (“Pyramid of Doom")
    
-   Example(s) that demonstrate how to execute asynchronous (promise-based) code in serial or parallel
    
-   Example(s) that demonstrate how to implement our own promise-solutions.
    
-   Example(s) that demonstrate error handling with promises
    

  

Explain about JavaScripts async/await, how it relates to promises and reasons to use it compared to the plain promise API.

  

Provide examples to demonstrate

-   Why this often is the preferred way of handling promises
    
-   Error handling with async/await
    
-   Serial or parallel execution with async/await.


> This folder contains all the above: [https://github.com/MalteMagnussen/Fullstack-JavaScript/tree/master/week3](https://github.com/MalteMagnussen/Fullstack-JavaScript/tree/master/week3)
> Can't be bothered to sit and filter it all down into github links here. I got it all named so I can find it easily in VS Code. 
