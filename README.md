# nexus
A javscript & CSS Lazy Loader

This one page script lazy loader is simple to use and is written in pure vanilla js

This Lazy Loader loads js and CSS scripts in the order you add them to the list(s)

There are 2 lists..a Primary load list and a Secondary load list

You can also add a list of functions to be called upon completion of the Primary Load List and then also further functions to be called upon completion of the Secondary Load List

This Loader is designed to work using the "JS Prototype" approach, however, if you are not using js in this manner then simply comment out LINES 261-265

To use:

1. Add the nexus.js script to your index header
2. Add the full paths to your scripts in the EXACT order you want them to load
3. Add any callbacks you desire
4. Job done!

IMPORTANT!!

If you are using the JS Prototype style of programming then you must adhere to the following:

1. The NAME of the script must be EXACTLY the same as the name of the function (case sensitive), and have an "init" at the top, for example: 
    Example.js = 

        function init(){

            return new Example();
        }

        function Example() {

            this.variable1='';
            this.variable2='';
            this.variable3='';
            this.variable4='';
        }

        // this function does some stuff
        Example.prototype.exampleFunction = function() {
          console.log('doing stuff!);
        }
      
2. If you're using a library (i.e Jquery) OR pre-compiled templates then you MUST add them into a folder called "libs" or "preCompiledTemplates" Please LOOK at lines 236 and 237 and you will see what I mean...feel free to change these to suit your situation/setup

If you are using the Prototype approach then you will be able to access everthing in the NEXUS object from any of the scripts by using the following example: Nexus.Example.exampleFunction();

Simple as that ;)




