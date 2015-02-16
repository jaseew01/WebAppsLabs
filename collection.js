/*
 * collection.js
 *
 * Contains implementation for a "TaskCollection" "class"
 */

var TaskCollection, Task, proto;

Task = require("./task");

/*
 *       Constructors
 */

function makeNewCollection(arr) {
	"use strict";
	var myObj = Object.create(proto);
	Object.defineProperty(myObj, "values", {
      writable: false,

      value: []
	});

	Object.preventExtensions(myObj);
	return myObj;
}

/*
 *       Prototype / Instance methods
 */

proto = {
   length: function(){
		"use strict";
		return this.arr.length;
   },

   isEmpty: function(){
		"use strict";
		if (this.length === 0) {
			return true;
		}
		return false;
   }
};

// DO NOT MODIFY ANYTHING BELOW THIS LINE
TaskCollection = {
   new: makeNewCollection
};

Object.defineProperty(TaskCollection, "prototype", {
   value: proto,
   writable: false
});

module.exports = TaskCollection;
