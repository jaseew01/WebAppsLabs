/*
* task.js
*
* Contains implementation for a "task" "class"
*/
var Task, proto;
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
   var temp = Object.create(null), arr = [];
   temp.title = "";
   temp.completedTime = null;

   Object.defineProperty(temp, "id", {
      enumerable: true,
      configurable: false,
      writable: false,

      get: function() {
         return idCounter();
      }
   });
   Object.defineProperty(temp, "tags", {
      get: function() {
         return arr;
      }
   });

   Object.preventExtensions();
   return temp;
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
   setTitle: function(s) {
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
      if (this.completedTime == null) {
         this.completedTime = date;
      } else {
         this.completedTime = null;
      }
      return this;
   },

   hasTag: function(s) {
      "use strict";
      if (this.tags.includes(s)) {
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
      var temp = this.tags.indexOf(s);
      if (temp !== -1) {
         this.tags.splice(temp, 1);
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
      arr.forEach(function(v, i) {
         this.addTag(v);
      });
      return this;
   },

   removeTags: function(arr) {
      "use strict";
      arr.forEach(function(v, i) {
         this.removeTag(v);
      });
      return this;
   },

   toggleTags: function(arr) {
      "use strict";
      arr.forEach(function(v, i) {
         this.toggleTag(v);
      });
      return this;
   },

   clone: function() {
      "use strict";
      var newObj = new makeNewTask();
      newObj.title = this.title;
      newObj.completedTime = this.completedTime;
      newObj.tags = this.tags;
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
