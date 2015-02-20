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
	var myObj = Object.create(proto), val = [];

	if (Array.isArray(arr)) {
		arr.forEach(function(v, i) {
			val.push(v);
		});
	}

	Object.defineProperty(myObj, "values", {
		writable: false,
		value: val
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
		if (this.length() === 0) {
			return true;
		}
		return false;
   },

	get: function(arg){
		"use strict";
		var type = typeof arg, task = this.values[ 0 ], acc = 0;
		if (type === "function" && this.length() !== 0){
			while (arg(task) !== true && acc+1<this.length()){
				acc += 1;
				task = this.values[ acc ];
			}
			if (arg(task) === true) {
				return task;
			}
		}else if (type === "number" && this.length() !== 0) {
			while (arg !== task.id && acc+1<this.length()) {
				acc += 1;
				task = this.values[ acc ];
			}
			if (arg === task.id) {
				return task;
			}
		}else if (type === "string" && this.length() !== 0) {
			while (task.title.indexOf(arg) === -1 && acc+1<this.length()) {
				acc += 1;
				task = this.values[ acc ];
			}
			if (task.title.indexOf(arg) !== -1) {
				return task;
			}
		}else if (type === "object" && this.length() !== 0) {
			while (arg.test(task.title) === false && acc+1<this.length()) {
				acc += 1;
				task = this.values[ acc ];
			}
			if (arg.test(task.title) === true) {
				return task;
			}
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
		var that = this;
		var addOneTask = function(val, index) {
			if (that.has(val.id) === false) {
				that.values.push(val);
			}
		};
		if (Array.isArray(arg)) {
			arg.forEach(addOneTask);
			return that;
		}
		if(this.has(arg.title) === false) {
			this.values.push(arg);
		}
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
		var that = this;

		if (Array.isArray(arg)) {
			for(var i=0; i<this.values.length; i+=1) {
				if (arg.indexOf(this.values[i].id) >= 0) {
					that.values.splice(i, 1);
					i=-1;
				}
			}

			return that;
		}

		this.values.forEach(function(val, index) {
			if (val.id === arg) {
				that.values.splice(index, 1);
			}
		});

		return that;
	},

	filter: function(arg) {
		"use strict";
		var type = typeof arg, acc = 0, collection = TaskCollection.new();

		if (type === "function"){
			while (acc < this.values.length){
				if (arg(this.values[ acc ])) {
					collection.add(this.values[ acc ]);
				}
				acc += 1;
			}
			return collection;
		} if (Array.isArray(arg)) {
			while (acc < this.values.length){
				if (arg.indexOf(this.values[ acc ].id) !== -1) {
					collection.add(this.values[ acc ]);
				}
				acc += 1;
			}
			return collection;
		} if (type === "string") {
			while (acc < this.values.length){
				if (this.values[ acc ].title === arg) {
					collection.add(this.values[ acc ]);
				}
				acc += 1;
			}
			return collection;
		} if (type === "object") {
			while (acc < this.values.length){
				if (arg.test(this.values[ acc ].title) === true) {
					collection.add(this.values[ acc ]);
				}
				acc += 1;
			}
			return collection;
		}
	},

	forEach: function(arg) {
		"use strict";
		this.values.forEach(arg);
		return this;
	},

	groupByTag: function() {
		"use strict";
		var finalObj = {};

		this.forEach(function(val, index) {
			val.tags.forEach(function(v, i) {
				if (!finalObj.hasOwnProperty(v)) {
					finalObj[ v ] = TaskCollection.new().add(val);
				} else {
					finalObj[ v ].add(val);
				}
			});
		});

		return finalObj;
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
	},

	concat: function() {
		"use strict";
		var i;
		for (i = 0; i < arguments.length; i += 1) {
			this.add(arguments[ i ]);
		}
		return this;
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
