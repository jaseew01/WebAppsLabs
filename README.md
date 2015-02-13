# Lab 5, Collections, sets
a
In this lab we will continue building our TODO / TaskList application.

You should have a working version of the Task class from Lab3. This lab assumes that you have such a version in a file named `task.js`. You will need to copy that file over from your Lab3. The following line should accomplish this, do it after you are in the Lab5 branch:

```bash
git checkout Lab3 -- task.js
```

Remember that you should always lint your code, and you should NEVER commit something that does not pass the linter on your main code files. (You can choose whether to lint test files or not)

For your convenience, a MAKEFILE is provided:

- Doing `make lint` will run eslint on your collection file.
- Doing `make lintall` will run eslint on code files and test files.
- Doing `make testCollection` will run the tests in `collection.spec.js`.
- Doing `make all` will run lint on your code files, and if they pass it will then run the test files.

There are 2 files that you need to work with:

- `collection.js`: Contains a "class" for managing a "collection of tasks".
- `collection.spec.js`: Contains tests for the collection class.

We will continue testing from the command line / terminal. You can do

```
mocha collection.spec.js
```
or
```
make testCollection
```

## collection.js

This file exports a TaskCollection "class", that implements collections of tasks. This is little more than a wrapper around Javascript arrays, with a more specific interface.

As before, make sure to create issues and make individual commits for each function, and never commit without passing the linter first.

### Properties and construction

A task collection has a single property, `values`, which must be not writable and initialized to equal an empty array. This array will hold the task objects.

The TaskCollection object must implement the following constructor:

- **TaskCollection.new**: This will be implemented in the function `makeNewCollection`. It must use `Object.create` and possibly `Object.defineProperty` to create a new object with the appropriate properties. It must use `Object.preventExtensions` to prevent later additions to this object, before returning it.

    This constructor takes an optional first parameter, `arr`. If that parameter is provided and is an array, then its elements (and not the array itself) must be used to initialize the `values` property. You will likely want to use one of the prototype methods to add those elements.

### Prototype / Instance methods

These will all go into the `proto` object. It should contain no other properties.

- **length**: Returns the number of tasks currently stored.
- **isEmpty**: Returns a boolean indicating whether the collection is empty.
- **get**: Returns a task, given some condition prescribed by the first argument, as described below. It should return `null` if no task satisfies the condition.

    Takes one argument, which may take several forms (you can assume the argument will be there and will have one of these forms):
    - It could be a function `f(task)`. `f` should expect to receive a task as the first argument, and it should return a boolean as to whether this task is "acceptable". This method `get` should then return the first task for which the function is `true`.
    - It could be a number. In this case if there is a task with an `id` equal to that number, then *it* will be returned. (Careful, the number must match the task's id, not its position in the `values` array)
    - It could be a string. In this case you return the first task, if any, for which the title contains the string.
    - It could be a regular expression. In this case you return the first task, if any, for which the title matches the regular expression.

    You may find it helpful to create a private helper function that takes arguments in the same format at `get`, but returns instead the index of the `values` array in which the matched task resides, or `-1` if there isn't any matching task.

    You should implement the method as if the first type of argument (a function) is the only one you have to deal with. After that, extend it to all other types by creating a function "turnArgIntoFunc" that turns all those other types of arguments into an appropriate function type.
- **has**: Behaves exactly like `get`, but returns a boolean indicating whether a task was found, rather than returning the task. This should be very short.
- **add**: Expects as argument a Task object (no need to check for this). It will add the object to the list, if it does not already exist (don't forget that id's are unique for each task).

    It may also instead be given as argument an array of task objects. In that case, it should add all the task objects, if they do not already exist in the list. You may find it helpful to use some sort of private "addOneTask" function.

    Returns `this` (the collection).
- **new**: Not to be confused with the class-level method new, nor the Task class's new. Takes no arguments. Creates a new task object (by calling `Task.new`), adds it to the collection, then returns the new task object.
- **remove**: Expects as argument a single number or array of numbers. It interprets those numbers as the id's of the tasks you want to have removed. Then removes those tasks from the list, if they were present. Returns `this` (the collection).
- **filter**: Expects its argument in the same formats as `get`, except that in the case of a single number it expects to be provided an array of numbers instead. It returns a *new* TaskCollection containing those tasks that match the criteria (not clones, the tasks themselves; only the collection would be new).
- **forEach**: Takes as argument a function `f(task)`. It will call the function on each element in its `values` array, passing it the task as the single argument. Returns `this`.
- **groupByTag**: Takes no arguments. Returns the tasks grouped by tag. Namely the return value should be an object, whose keys are all the different tags of the various tasks in the collection. The value corresponding to a key/tag should be a new TaskCollection containing the tasks that had that key/tag (not clones, the tasks themselves). A task with no keys would not appear at all in this object.
- **print**: Takes no arguments. Should return a printed representation of the task collection as follows:
    - It should return a string (not console.logging).
    - Each task starts on a new line.
    - The title of a task goes first.
    - If the task is completed, then after an extra space the completion date should appear in parentheses, in the format "yyyy/mm/dd".
    - If there are any tags, there should be an extra space and then the tags each prepended by the hash sign (`#`) and with a space inbetween tags.
    - There should be no extra space after the last tag.
    - The last task should include a newline at its end.
    - An empty collection should return an empty string.

    You will probably want to create a local helper function, "printTask", that is given a task and returns the corresponding string. Then your "print" method can more or less join those strings.
- **concat**: Takes one or more arguments, that it may assume are TaskCollection objects. It then proceeds to add all their elements to the collection in `this` (the elements themselves, not clones of them). Returns `this`. It should be able to handle an arbitrary number of arguments. It should not alter the passed TaskCollection objects (i.e. they will retain their objects).
