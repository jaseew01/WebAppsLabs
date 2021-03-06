/*
 * history.spec.js
 *
 * Test file for your DLlist class
 */
var expect, DLList;

expect = require('./chai.js').expect;

DLList = require('./dllist.js');

var myList = DLList.new();
var myList2 = DLList.new();

describe("Testing the list constructor", function() {
	"use strict";
	it("Testing that it is empty", function() {
		expect(myList.isEmpty()).to.equal(true);
	});
});

describe("Testing the proto methods", function() {
	"use strict";
	it("Testing the length and push method", function() {
		expect(myList.length()).to.equal(0);
		myList.push(1);
		expect(myList.length()).to.equal(1);
		myList.push(2);
		expect(myList.length()).to.equal(2);
	});

	it("Testing the first method", function() {
		expect(myList.first().value).to.equal(1);
		// expect(myList2.first()).to.throw(Error);
	});

	it("Testing the last method", function() {
		expect(myList.last().value).to.equal(2);
		// expect(myList2.last()).to.throw(Error);
	});

	it("Testing the insertAt method", function() {
		myList.insertAt(3, myList.first());
		expect(myList.length()).to.equal(3);
		myList.insertAt(4, myList.last().prev);
		expect(myList.length()).to.equal(4);
	});

	it("Testing the unshift method", function() {
		myList.unshift(5);
		expect(myList.length()).to.equal(5);
		myList2.unshift(1);
		expect(myList2.length()).to.equal(1);
	});

	it("Testing the endAt method", function() {
		myList.endAt(myList.first().next);
		expect(myList.length()).to.equal(2);
		myList.endAt(myList.first());
		expect(myList.length()).to.equal(1);
	});

	it("Testing the remove method", function() {
		myList.remove(myList.first());
		expect(myList.isEmpty()).to.equal(true);
		myList.push(1);
		myList.push(2);
		myList.push(3);
		myList.push(4);
		myList.remove(myList.first().next);
		expect(myList.length()).to.equal(3);
	});

	it("Testing the pop method", function() {
		expect(myList.pop()).to.equal(4);
		expect(myList.length()).to.equal(2);
		expect(myList.pop()).to.equal(3);
		expect(myList.pop()).to.equal(1);
		expect(myList.length()).to.equal(0);
	});

	it("Testing the shift method", function() {
		myList.push(1);
		myList.push(2);
		myList.push(3);
		expect(myList.shift()).to.equal(1);
		expect(myList.length()).to.equal(2);
		expect(myList.shift()).to.equal(2);
		expect(myList.shift()).to.equal(3);
		expect(myList.isEmpty()).to.equal(true);
	});

	it("Testing the isFirst method", function() {
		myList.push(1);
		myList.push(2);
		myList.push(3);
		expect(myList.isFirst(myList.first())).to.equal(true);
		expect(myList.isFirst(myList.first().next)).to.equal(false);
	});

	it("Testing the isLast method", function() {
		expect(myList.isLast(myList.last())).to.equal(true);
		expect(myList.isLast(myList.last().prev)).to.equal(false);
	});

	it("Testing the forEach method", function() {
		var myFunc = function(f) {
			return f + 1;
		};

		myList = myList.forEach(myFunc);
		expect(myList.first().value).to.equal(2);
	});

	it("Testing the length method", function() {
		//
	});

	it("Testing the length method", function() {
		//
	});
});