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
   		this.list.insertAt(command, this.current);
   		this.list.endAt(command);
   },
   canRedo: function() {
   		if(!this.list.isLast(this.current)) {
   			return true;
   		}
   		return false;
   },
   canUndo: function() {
   		//
   },
   redo: function() {
   		if(this.current.next === null) {
   			throw new Error("no more commands");
   		}
   		this.current = this.current.next;
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
