/*
 * dllist.js
 *
 * Contains implementation for a double-linked list "class"
 */

var Iterator, DLList, proto;

Iterator = require("./iterator");

/*
 *       Constructors
 */

function makeNewList() {
   var lst, sentinel;

   lst = Object.create(proto);
   sentinel = { value: null };
   sentinel.next = sentinel;
   sentinel.prev = sentinel;
   lst.sentinel = sentinel;
   return lst;
}


/*
 *       Prototype / Instance methods
 */

proto = {
   isEmpty: function() {
      if (this.sentinel.next === this.sentinel) {
         return true;
      }
      return false;
   },

   length: function() {
      var temp = this.sentinel, acc;
      while (temp.next !== this.sentinel) {
         acc += 1;
         temp = temp.next;
      }
      return acc;
   },

   first: function() {
      if (this.isEmpty()) {
         throw "List is empty";
      }
      return this.sentinel.next;
   },

   last: function() {
      if (this.isEmpty()) {
         throw "List is empty";
      }
      return this.sentinel.prev;
   },

   insertAt: function(value, element) {
      var newElem;
      newElem = { value: value };
      newElem.next = element.next;
      newElem.prev = element;
      element.next = newElem;
      return newElem;
   },

   unshift: function(value) {
      var newElem;
      newElem = { value: value };
      newElem.next = this.sentinel.next;
      newElem.prev = this.sentinel;
      this.sentinel.next = newElem;
      return newElem;
   },

   push: function(value) {
      var newElem;
      newElem = { value: value };
      newElem.next = this.sentinel;
      newElem.prev = this.sentinel.prev;
      this.sentinel.prev = newElem;
      return newElem;
   },

   endAt: function(element) {
      element.next = this.sentinel;
      this.sentinel.prev = element;
   },

   remove: function(element) {
      element.prev.next = element.next;
      element.next.prev = element.prev;
      return element.value;
   },

   pop: function() {
      var temp = this.sentinel.prev;
      if (this.isEmpty()) {
         throw "List is empty.";
      } else {
         this.sentinel.prev = this.sentinel.prev.prev;
         this.sentinel.prev.prev.next = this.sentinel;
         return temp.data;
      }
   },

   shift: function() {
      var temp = this.sentinel.next;
      if (this.isEmpty()) {
         throw "List is empty.";
      } else {
         this.sentinel.next = this.sentinel.next.next;
         this.sentinel.next.next.prev = this.sentinel;
         return temp.data;
      }
   },

   isFirst: function(element) {
      if (this.sentinel.next === element) {
         return true;
      }
      return false;
   }
};



// DO NOT MODIFY ANYTHING BELOW THIS LINE
DLList = {
   new: makeNewList
};

Object.defineProperty(DLList, "prototype", {
   value: proto,
   writable: false
});

module.exports = DLList;
