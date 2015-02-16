/*
* task.js
*
* Contains implementation for a "task" "class"
*/
var Task, proto, temp;
// Helper method. You should not need to change it.
// Use it in makeTaskFromString
function processString(s) {
   "use strict";
   var tags, title;
   tags = [];
   title = s.replace(/\s*#([a-zA-Z]+)/g, function(m, tag) {
      tags.push(tag);
      return "";
   });
   return { title: title, tags: tags };
}

function idCounter() {
   "use strict";
   var num = 0;
   return function() {
      num += 1;
      return num;
   };
}

/*
* Constructors
*/
function makeNewTask() {
   "use strict";
   var myObj = Object.create(proto);
   myObj.arr = [];
   myObj.title = "";
   myObj.completedTime = null;

   Object.defineProperty(myObj, "id", {
      enumerable: true,
      configurable: false,
      writable: false,

      value: idCounter()
   });
   Object.defineProperty(myObj, "tags", {
      get: function() {
         return myObj.arr;
      }
   });

   Object.preventExtensions(myObj);
   return myObj;
}

function makeTaskFromObject(o) {
   "use strict";
   var newTask = Task.new;
   newTask.setTitle(o.title);
   newTask.addTags(o.tags);
   return newTask;
}

function makeTaskFromString(s) {
   "use strict";
    return Task.fromObject(processString(s));
}

/*
* Prototype / Instance methods
*/
proto = {
   setTitle: function setTitle(s) {
      "use strict";
      this.title = s.trim();
      return this;
   },

   isCompleted: function() {
      "use strict";
      if (this.completedTime == null) {
         return false;
      }
      return true;
   },

   toggleCompleted: function() {
      "use strict";
      var date = new Date();
      if (this.completedTime === null) {
         this.completedTime = date;
      } else {
         this.completedTime = null;
      }
      return this;
   },

   hasTag: function(s) {
      "use strict";
      if (this.tags.indexOf(s) !== -1) {
         return true;
      }
      return false;
   },

   addTag: function(s) {
      "use strict";
      if (this.hasTag(s) === false) {
         this.tags.push(s);
      }
      return this;
   },

   removeTag: function(s) {
      "use strict";
      var ind = this.tags.indexOf(s);
      if (ind !== -1) {
         this.tags.splice(ind, 1);
      }
      return this;
   },

   toggleTag: function(s) {
      "use strict";
      if (this.hasTag(s)) {
         this.removeTag(s);
      } else {
         this.addTag(s);
      }
      return this;
   },

   addTags: function(arr) {
      "use strict";
      temp = this;
      arr.forEach(function(v, i) {
         temp.addTag(v);
      });
      return temp;
   },

   removeTags: function(arr) {
      "use strict";
      temp = this;
      arr.forEach(function(v, i) {
         temp.removeTag(v);
      });
      return temp;
   },

   toggleTags: function(arr) {
      "use strict";
      temp = this;
      arr.forEach(function(v, i) {
         temp.toggleTag(v);
      });
      return temp;
   },

   clone: function() {
      "use strict";
      var newObj = new makeNewTask();
      newObj.title = this.title;
      newObj.completedTime = this.completedTime;
      newObj.addTags(this.tags);
      return newObj;
   }
};
// DO NOT MODIFY ANYTHING BELOW THIS LINE
Task = {
   new: makeNewTask,
   fromObject: makeTaskFromObject,
   fromString: makeTaskFromString
};

Object.defineProperty(Task, proto, {
   value: proto,
   writable: false
});

module.exports = Task;
