/*
 * history.spec.js
 *
 * Test file for your history class
 */
var expect, DLList, CmdHistory;

expect = require('./chai.js').expect;

DLList = require('./dllist.js');
CmdHistory = require('./history.js');

var LogEntries = [];
var Log = {
   add: function(s) { LogEntries.push(s); return this; },
   get: function() { return LogEntries; },
   clear: function() { LogEntries = []; return this; }
};
var id = 0;
function mockExecute() { Log.add(this.toString + " executed"); }
function mockUnexecute() { Log.add(this.toString + " unexecuted"); }
function mockCommand() {
   id += 1;
   return {
      execute: mockExecute,
      unexecute: mockUnexecute,
      toString: "command " + id
   };
}

// ADD YOUR TESTS HERE

var history1 = CmdHistory.new();
var history2 = CmdHistory.new();
var history3 = CmdHistory.new();

describe("Testing the proto methods", function () {
	"use strict";

	it("Testing the add method", function() {
		var temp = mockCommand(), temp2;
		history1.add(temp);
		expect(history1.list.last().value).to.equal(temp);
		expect(Log.get().pop()).to.equal("command 1 executed");

		temp2 = mockCommand();
		history1.add(temp2);
		expect(history1.list.last().value).to.equal(temp2);
		expect(Log.get().pop()).to.equal("command 2 executed");
	});

	it("Testing the canRedo method", function() {
		var temp3 = mockCommand();
		expect(history1.canRedo()).to.equal(false);
		history1.list.push(temp3);
		expect(history1.canRedo()).to.equal(true);
		history1.list.pop();
	});

	it("Testing the canUndo method", function() {
		expect(history1.canUndo()).to.equal(true);
		expect(history2.canUndo()).to.equal(false);
	});

	it("Testing the redo and undo methods", function() {
		var cmd4 = mockCommand(), cmd5 = mockCommand(), cmd6 = mockCommand();
		history2.add(cmd4);
		history2.add(cmd5);
		history2.add(cmd6);
		history2.undo();
		expect(history2.current.value).to.equal(cmd5);
		history2.redo();
		expect(history2.current.value).to.equal(cmd6);
	});
});