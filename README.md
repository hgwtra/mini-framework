# Mini-framework

## Overview

Mini-framework is a simple javascript framwork for frontend development. 

Mini-framework is not a professional framework and as a result, it does not come with all the features and functionalities that real frameworks have. 

## Features

- Abstracting the DOM Routing System
- State Management
- Event Handling
- A todoMVC project using the framework

## How it works

#### Creating HTML elements

The `createStructure()`function creates an HTML element with its type and properties. It takes the following arguments:
- `tag`: The tag name of the element to be created (eg.: "div", "span").
- `attri (optional)`: An array that contains the attributes of the HTML element (eg., "id", "class").
- `children (optional)`: An array of child elements of the HTML element.


Example Usage:

```javascript
const container = createStructure({
  tag: "section",
  attri: ["class", "content-container"],
  children: [
    createStructure({
      tag: "h2",
      children: ["Welcome"],
    }),
    createStructure({
      tag: "p",
      children: ["Explore our site."],
    }),
    createStructure({
      tag: "button",
      attri: ["class", "cta-button"],
      children: ["Get Started"],
    }),
  ],
});
```

In this example, we created a section element with a class of "content-container". Inside this container, there are three child elements: 
- An h2 element containing the heading "Welcome"
- A p element with the text "Explore our site."
- A button element with a class of "CTA-button" and the text "Get Started."

#### Adding Attributes to an Element & Nesting Elements

The `createStructure()` function addes attributes to an HTML element with specified attributes and children. 
The `createChild()` function nest HTML elements to a parent element. To remove a child element from a parent element, you can use function `removeChild()`

Example Usage:

```javascript
// Create a div element with two child p elements
const parentDiv = createStructure({
  tag: "div",
  children: [
    createStructure({
      tag: "p",
      children: ["First child paragraph"],
    }),
    createStructure({
      tag: "p",
      children: ["Second child paragraph"],
    }),
  ],
});

// Get the body element and append the parent div
const body = document.querySelector("body");
createChild(body, parentDiv);
```

In this example, we created two child p elements inside the parentDiv. Then, the parentDiv is appended to the body of the HTML document.

#### Event Management: Creating Event

The `addEvent()` function creates an event in the Mini-framework, you can add an event listener to your HTML element by using the `addEventListener()` syntax. It takes the following arguments:

- `eventType`: The type of event to listen for (e.g. "click").
- `element`: The element to attach the event listener to.
- `callback`: The function to be called when the event is triggered.

Example usage:

```javascript
// Add an event listener for the "Enter" key press on the input field
addEvent("keypress", this.input, this.handleNewTodo);

// Add an event listener for the "Click" action on the clear button
addEvent("click", this.clear, this.handleClearChecked);

// Add an event listener for the checkbox state change
addEvent("change", this.checkAllBox, this.handleCheckAll);
```

#### Event Management: Removing an Event

The `removeEvent()` function removes an event listener to your HTML element by using the `removeEventListener()` syntax. It takes the following arguments:

- `eventType`: The type of event that was previously added.
- `element`: The element from which the event listener will be removed.
- `callback`: The function that was previously attached as the event listener.

Example Usage:

```javascript
// Remove the "blur" event listener from the target element
removeEvent("blur", targetElement, this.handleChangeTodoText);

// Remove the "keypress" event listener from the target element
removeEvent("keypress", targetElement, this.handleChangeTodoText);
```

#### State Management

The Mini-framework provides state management capabilities through two functions `saveState()` and `loadState()`

`loadState()` returns the current state of the application. 

`saveState()` sets the state of the application to the new state passed as an argument. 

Exmample Usage:

```javascript
const initialState = {
  text: "Hello Stranger"
};

saveState(initialState);

const state = loadState();
console.log("Initial State:", state); // { text: "Hello Stranger" }

const updatedState = {
  text: "Let's be friends"
};

saveState(updatedState);
console.log("Updated State:", loadState()); // { text: "Let's be friends" }
```

#### URL Redirection 

The Mini-framework can redirect users to a new URL using `redirect(url)` function, which performs redirection using the browser's history

Exmample Usage:

```javascript
function redirect(url) {
  window.history.pushState(null, null, url);
}

const newUrl = "/new-page";
redirect(newUrl);

// The browser URL will be updated to "/new-page"
```

In this example, the redirect function is used to update the browser's URL using the pushState method. When you call the redirect function with a new URL, it updates the browser's URL without actually triggering a full page reload.