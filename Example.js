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
