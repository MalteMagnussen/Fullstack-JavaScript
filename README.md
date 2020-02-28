# Fullstack-JavaScript
 4th Semester Fullstack JavaScript - Malte Hviid-Magnussen cph-mh748

1. [Week 1 Exercises](https://github.com/MalteMagnussen/Fullstack-JavaScript/tree/master/week1)
2. [Week 2 Exercises](https://github.com/MalteMagnussen/Fullstack-JavaScript/tree/master/week2/Exercises)



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
    
-   this in JavaScript and how it differs from what we know from Java/.net.
    
-   Function Closures and the JavaScript Module Pattern
    
-   User-defined Callback Functions (writing your own functions that take a callback)
    
-   Explain the methods map, filter  and reduce
    
-   Provide examples of user-defined reusable modules implemented in Node.js (learnynode - 6)
    
-   Provide examples and explain the es2015 features: let, arrow functions, this, rest parameters, destructuring objects and arrays, maps/sets etc.
    
-   Provide an example of ES6 inheritance and reflect over the differences between Inheritance in Java and in ES6.
    
-   Explain and demonstrate, how to implement your own events, how to emit events and how to listen for such events
    

#### ES6,7,8,ES-next and TypeScript

-   Provide examples with es-next, running in a browser, using Babel and Webpack
    
-   Explain the two strategies for improving JavaScript: Babel and ES6 (es2015) + ES-Next, versus Typescript. What does it require to use these technologies: In our backend with Node and in (many different) Browsers
    
-   Provide a number of examples to demonstrate the benefits of using TypeScript, including, types, interfaces, classes and generics
    
-   Explain the ECMAScript Proposal Process for how new features are added to the language (the TC39 Process)
    

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

