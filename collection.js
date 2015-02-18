/*
 * collection.js
 *
 * Contains implementation for a "TaskCollection" "class"
 */

var TaskCollection, Task, proto;

Task = require("./task");

function printTask(obj) {
	"use strict";
	var finalString = "";
	finalString += obj.title;
	if (obj.isCompleted()) {
		finalString += " (" + obj.completedTime + ")";
	} if (obj.tags.length > 0) {
		obj.tags.forEach(function(val, index) {
			finalString += " #" + val;
		});
		finalString += "\n";
	}

	return finalString;
}

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
		return this.values.length;
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
			return this.values[ acc ];
		} if (type === "number") {
			while (arg !== task.id) {
				acc += 1;
				task = this.values[ acc ];
			}
			return this.values[ acc ];
		} if (type === "string") {
			while (task.title.indexOf(arg) === -1) {
				acc += 1;
				task = this.values[ acc ];
			}
			return this.values[ acc ];
		} if (type === "object") {
			while (task.title.test(arg) === false) {
				acc += 1;
				task = this.values[ acc ];
			}
			return this.values[ acc ];
		}
		return null;
   },

	has: function(arg) {
		"use strict";
		if (this.get(arg) === null) {
			return false;
		}
		return true;
	},

	add: function(arg) {
		"use strict";
		var addOneTask = function(newTask, index) {
			if (!this.has(arg)) {
				this.values.push(newTask);
			}
		};
		if (Array.isArray(arg)) {
			arg.forEach(addOneTask);
			return this;
		}
		addOneTask(arg, -1);
		return this;
	},

	new: function() {
		"use strict";
		var task = Task.new;
		this.add(task);
		return task;
	},

	remove: function(arg) {
		"use strict";
		var removeTasks = function(val, index) {
			if (arg.indexOf(val.id) !== -1) {
				this.values.splice(index, 1);
			}
		};
		if (Array.isArray(arg)) {
			this.values.forEach(removeTasks);
			return this;
		}

		this.values.forEach(function(val, index) {
			if (val.id === arg) {
				this.values.splice(index, 1);
			}
		});
		return this;
	},

	forEach: function(arg) {
		"use strict";
		this.values.forEach(arg);
		return this;
	},

	print: function() {
		"use strict";
		var result = "";
		if (this.values.length !== 0) {
			this.values.forEach(function(val, index) {
				result += printTask(val);
			});
		}

		return result;
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
