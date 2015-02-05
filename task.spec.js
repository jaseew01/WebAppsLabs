/*
 * task.spec.js
 *
 * Test file for your task class
 */
var expect, Task, myTask;

expect = require("./chai.js").expect;

Task = require("./task.js");
myTask = Task.new();

// ADD YOUR TESTS HERE
describe("Testing task prototype methods", function() {
	"use strict";
	it("Testing the id", function() {
		expect(myTask.id()).to.equal(1);
	});
	it("Testing setTitle: sets the Tasks title", function() {
		expect(myTask.setTitle("testing").title).to.equal("testing");
	});
	it("Testing isCompleted: returns true/false depending on the objects completion", function() {
		expect(myTask.isCompleted()).to.equal(false);
		myTask.completedTime = new Date();
		expect(myTask.isCompleted()).to.equal(true);
	});
	it("Testing toggleCompleted: should toggle the isCompleted between null and Date", function() {
		expect(myTask.toggleCompleted().completedTime).to.equal(null);
		expect(myTask.toggleCompleted().completedTime).to.not.equal(null);
	});
	it("Testing addTag and hasTag", function() {
		expect(myTask.hasTag("something")).to.equal(false);
		myTask.addTag("something");
		expect(myTask.hasTag("something")).to.equal(true);
	});
	it("Testing removeTag: should remove argument s from the tags array", function() {
		myTask.addTag("something");
		expect(myTask.removeTag("something").hasTag("something")).to.equal(false);
	});
	it("Testing toggleTag: if exists, removes it, else adds it.", function() {
		expect(myTask.hasTag("something")).to.equal(false);
		expect(myTask.toggleTag("something").hasTag("something")).to.equal(true);
		expect(myTask.toggleTag("something").hasTag("something")).to.equal(false);
	});
	it("Testing addTags: will add an array of string to tags array", function() {
		var temp = [ "one", "two", "three" ];
		temp.forEach(function(v, i) {
			expect(myTask.hasTag(v)).to.equal(false);
		});
		myTask.addTags(temp);
		temp.forEach(function(v, i) {
			expect(myTask.hasTag(v)).to.equal(true);
		});
	});
	it("Testing removeTags: will take an array and remove each element in the array from tags", function() {
		var temp2 = [ "threee", "four", "five" ];
		temp2.forEach(function(v, i) {
			expect(myTask.hasTag(v)).to.equal(false);
		});
		myTask.addTags(temp2);
		temp2.forEach(function(v, i) {
			expect(myTask.hasTag(v)).to.equal(true);
		});
		myTask.removeTags(temp2);
		temp2.forEach(function(v, i) {
			expect(myTask.hasTag(v)).to.equal(false);
		});
	});
	it("Testing toggleTags: if array element in tags: remove; else: add to tags;", function() {
		var temp3 = [ "six", "seven", "eight" ];
		temp3.forEach(function(v, i) {
			expect(myTask.hasTag(v)).to.equal(false);
		});
		myTask.toggleTags(temp3);
		temp3.forEach(function(v, i) {
			expect(myTask.hasTag(v)).to.equal(true);
		});
	});
	it("Testing clone", function() {
		var myTaskClone, tags1, tags2;
		myTaskClone = myTask.clone();
		tags1 = myTask.tags;
		tags2 = myTaskClone.tags;

		expect(myTask.title).to.equal(myTaskClone.title);
		tags1.forEach(function(v, i) {
			expect(tags1[ i ]).to.equal(tags2[ i ]);
		});
	});
});
