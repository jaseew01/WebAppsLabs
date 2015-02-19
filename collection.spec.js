/*
 * collection.spec.js
 *
 * Test file for your collection class
 */
var expect, Task, TaskCollection, myCollection;

expect = require('./chai.js').expect;

Task = require('./task.js');
TaskCollection = require('./collection.js');

myCollection = TaskCollection.new();
myCollection2 = TaskCollection.new([Task.new, Task.new]);

// ADD YOUR TESTS HERE
describe("Testing the collection constructor", function() {
	"use strict";
	it("Testing with no arguments", function() {
		expect(myCollection.hasOwnProperty("values")).to.equal(true);
		expect(myCollection.values.length).to.equal(0);
	});
	it("Testing with arguments", function() {
		expect(myCollection2.values.length).to.equal(2);
	});
});

describe("Testing collection prototype methods", function() {
	"use strict";
	it("Testing the length method", function() {
		expect(myCollection.length()).to.equal(0);
		expect(myCollection2.length()).to.equal(2);
	});
});