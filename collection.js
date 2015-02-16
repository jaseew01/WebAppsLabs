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
   },

	get: function(arg){
		"use strict";
		var type = typeof arg, task = this.values[ 0 ], acc = 0;
		if (type === "function"){
			while (arg(task) !== true){
				acc += 1;
				task = this.values[ acc ];
			}
		} if (type === "number") {
			while (arg !== task.id) {
				acc += 1;
				task = this.values[ acc ];
			}
		} if (type === "string") {
			while (task.title.indexOf(arg) === -1) {
				acc += 1;
				task = this.values[ acc ];
			}
		} if (type === "object") {
			while (task.title.test(arg) === false) {
				acc += 1;
				task = this.values[ acc ];
			}
		}

		return this.values[ acc ];
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
