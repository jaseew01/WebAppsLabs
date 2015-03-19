/*
 * history.js
 *
 * Contains implementation for a CmdHistory "class"
 */

var DLList, CmdHistory, proto;

DLList = require("./dllist");

/*
 *       Constructors
 */

function makeNewHistory() {
   var hist = Object.create(proto);
   hist.list = DLList.new();
   //the command that is the last to have been executed
   hist.current = null;
   return hist;
}


/*
 *       Prototype / Instance methods
 */

proto = {
   add: function(command) {
   		command.execute();
         if (this.list.isEmpty()) {
            this.current = this.list.push(command);
         } else {
            this.current = this.list.insertAt(command, this.current);
            this.list.endAt(this.current);
         }
   },

   canRedo: function() {
   		if(!this.list.isLast(this.current)) {
   			return true;
   		}
   		return false;
   },

   canUndo: function() {
   		if(this.list.isEmpty()) {
            return false;
         }
         return true;
   },

   redo: function() {
   		if(this.current.next === null) {
   			throw new Error("no more commands");
   		}
   		this.current = this.current.next;
   		this.current.value.execute();
   },

   undo: function() {
   		if(this.current === null) {
   			throw new Error("no more commmands");
   		}
   		this.current.value.unexecute();
   		this.current = this.current.prev;
   },

   undoableIterator: function() {
      if (this.canUndo()) {
         return this.list.reverseIteratorFrom(this.current);
      } else {
         throw new Error("no more commands");
      }
   },

   redoableIterator: function() {
      if (this.canRedo()) {
         return this.list.iterateFrom(this.current.next);
      } else {
         throw new Error("no more commands");
      }
   }
};

// DO NOT MODIFY ANYTHING BELOW THIS LINE
CmdHistory = {
   new: makeNewHistory
};

Object.defineProperty(CmdHistory, "prototype", {
   value: proto,
   writable: false
});

module.exports = CmdHistory;
