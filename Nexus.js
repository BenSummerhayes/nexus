/* 
  
  Written by Ben Summerhayes, free to use by anyone..but at your own risk!
  
	Add the scripts (path and full name) to the "primaryLoadList" and "secondaryLoadList" arrays (secondary is optional). you can ONLY load .js and .css scripts.

	PLEASE NOTE! ANY scripts in a "lib" folder will not be added to the "Nexus object" i.e. jquery

*/

function Nexus(){

	// Primary Load List, add the scripts you want to front load here (these will load in order!!)
	this.primaryLoadList=[

	      "Example.js"
	      //,"AnotherExample.js"
	];

	// Secondary Load List, add the scripts you want to load AFTER the Primary list (these will load in order!!)
	this.secondaryLoadList=[
		// "public/js/libs/ga/ga.js"

	];

	//add in here the functions you would like to be called AFTER the PRIMARY load list has loaded
	this.primaryCallbackList={

		 loadExample: function(Nexus){Nexus.Example.exampleFunction()}
		,consoleLog: function(Nexus){console.log(Nexus)}

	};

	//add in here the functions you would like to ba called AFTER the SECONDARY load list has loaded
	this.secondaryCallbackList={

		// consoleLog: function(Nexus){console.log(Nexus)}

	};


	//get loading!!
	this.launcher();

}



































































/*

  YOU DO NOT NEED TO WORRY ABOUT ANY OF THE SCRIPT BELOW THIS COMMENT....BUT FEEL FREE TO HAVE A LOOK!

  IF YOU CAN IMPROVE IT THEN GO FOR IT....BUT SHARE THE LOVE!

*/

// This method deals with the callbacks
Nexus.prototype.callBacks = function(){

	// if true call the PRIMARY callback
	if(this.primaryOrSecondaryCallback){

		//loop through the PRIMARY Callback List
		for(key in this.primaryCallbackList){

			//call the function
			this.primaryCallbackList[key](this);

		}

	}else{

		//loop through the SECONDARY Callback List
		for(key in this.secondaryCallbackList){

			//call the function
			this.secondaryCallbackList[key](this);

		}
		
	}

}

// this gets sets up the required properties and launches the script
Nexus.prototype.launcher = function(){

	// charge up the loadlist
	this.loadList=this.primaryLoadList;

	// This works in cunjuction with the callBack method
	this.primaryOrSecondaryCallback=true;

	// some house keeping
	delete(this.primaryLoadList);

	//select the first script and get loading!!
	this.selectAScript();

}

Nexus.prototype.selectAScript = function(){

	if(this.loadList.length>0){

		// load the selected script
		this.loadScript(this.loadList[0]);

	}else{

		// now check to see if there are any SECONDARY scripts to be loaded
		if(typeof this.secondaryLoadList != 'undefined' && this.secondaryLoadList.length>0){

		// call the CALLBACKs!
		this.callBacks();

			// re-charge the loadlist
			this.loadList=this.secondaryLoadList;

			//house keeping
			delete(this.secondaryLoadList);

			// flip this to false
			this.primaryOrSecondaryCallback=false;

			// load the selected script
			this.loadScript(this.loadList[0]);

		}else{

			// call the CALLBACKs!
			this.callBacks();

			// some house keeping
			delete(this.loadList);
			delete(this.primaryOrSecondaryCallback);
			delete(this.secondaryLoadList);
			delete(this.primaryCallbackList);
			delete(this.secondaryCallbackList);
			
		}

	}

}

Nexus.prototype.loadScript = function(file){

	// get the file type & name
	var type = file.split(".");
	var name = file.split('/');
	var name = name[Number(name.length)-1];
	var name = name.replace('.js','');
	var name = name.replace(/\?\d*/g,'');
	var type = type[Number(type.length)-1];
	var type = type.replace(/\?\d*/g,'');
	var obj = this;
	var libFolderCheck = file.search("public/js/libs/");
	var preCompiledTemplatesCheck = file.search("templates/preCompiledTemplates/");

    if (type=="css"){ // css do this

        var script=document.createElement("link")
        script.setAttribute("rel", "stylesheet")
        script.setAttribute("type", "text/css")
        script.setAttribute("href", file)
        script.onload = script.onreadystatechange = function(){
			script.onreadystatechange = script.onload = null;
			obj.loadList.shift();
			obj.selectAScript();
		}

    }else if (type=="js"){ // js do this
        
        var script=document.createElement('script')
        script.setAttribute("type","text/javascript")
        script.setAttribute("src", file)
		script.onload = script.onreadystatechange = function(){
			script.onreadystatechange = script.onload = null;
			obj.loadList.shift();

			// do NOT add this to the mainObject if it's in the 'lib' (libraries) folder OR it's the preCompiledTemplates.js
			if(libFolderCheck== -1 && preCompiledTemplatesCheck== -1){

				obj[name]=init();

			}

			obj.selectAScript();

		}

    }else{

    	console.log('loader error!');
    	return;

    }

    if (typeof script!="undefined"){

        document.getElementsByTagName("head")[0].appendChild(script);

    }

}

// and we're off!!
var Nexus = new Nexus(); 



