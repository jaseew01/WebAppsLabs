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
      var temp = this.sentinel, acc = 0;
      while (temp.next !== this.sentinel) {
         acc += 1;
         temp = temp.next;
      }
      return acc;
   },

   first: function() {
      if (this.isEmpty()) {
         throw new Error("List is empty");
      }
      return this.sentinel.next;
   },

   last: function() {
      if (this.isEmpty()) {
         throw new Error("List is empty");
      }
      return this.sentinel.prev;
   },

   insertAt: function(value, element) {
      var newElem;
      newElem = { value: value };
      newElem.next = element.next;
      newElem.prev = element;
      element.next.prev = newElem;
      element.next = newElem;
      return newElem;
   },

   unshift: function(value) {
      var newElem;
      newElem = { value: value };
      newElem.next = this.sentinel.next;
      newElem.prev = this.sentinel;
      this.sentinel.next = newElem;
      if (this.sentinel.prev === this.sentinel) {
         this.sentinel.prev = newElem;
         return newElem;
      }

      return newElem;
   },

   push: function(value) {
      var newElem;
      newElem = { value: value };
      this.sentinel.prev.next = newElem;
      newElem.prev = this.sentinel.prev;
      this.sentinel.prev = newElem;
      newElem.next = this.sentinel;
      return newElem;
   },

   endAt: function(element) {
      element.next = this.sentinel;
      this.sentinel.prev = element;
      return this;
   },

   remove: function(element) {
      element.prev.next = element.next;
      element.next.prev = element.prev;
      return element.value;
   },

   pop: function() {
      var temp = this.sentinel.prev;
      if (this.isEmpty()) {
         throw new Error("List is empty");
      } else {
         this.sentinel.prev = temp.prev;
         this.sentinel.prev.next = this.sentinel;
         return temp.value;
      }
   },

   shift: function() {
      var temp = this.sentinel.next;
      if (this.isEmpty()) {
         throw new Error("List is empty");
      } else {
         this.sentinel.next = temp.next;
         this.sentinel.next.next.prev = this.sentinel;
         return temp.value;
      }
   },

   isFirst: function(element) {
      if (this.sentinel.next === element) {
         return true;
      }
      return false;
   },

   isLast: function(element) {
      if (this.sentinel.prev === element) {
         return true;
      }
      return false;
   },

   iterator: function() {
      var itr;
      if (this.isEmpty()) {
         itr = Iterator.new(this.sentinel.next, false);
      } else {
         itr = Iterator.new(this.sentinel.next, true);
      }
      return itr;
   },

   forEach: function(f) {
      var itr = this.iterator();
      return itr.forEach(f);
   },

   toArray: function() {
      var itr = this.iterator();
      return itr.toArray();
   },

   iterateFrom: function(element) {
      var itr = this.iterator(), index;
      index = itr.find(element);
      return itr.sequence(index, this.length(), 1);
   },

   reverseIterateFrom: function(element) {
      var itr = this.iterator(), index;
      index = itr.find(element);
      return itr.sequence(index, this.first(), -1);
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
