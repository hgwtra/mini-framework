# Goal: Create your own framework.

# Objectives:

Your framework should implement:

- Abstracting the DOM Routing System
- State Management
- Event Handling
- A todoMVC project using your framework
- Create documentation for your framework: The user has to be presented to a folder structure that allows him to run the app from the root of that folder structure. The user testing your framework will have to implement some simple code in order to test the features described below.

# Documentation
- Explanation on the features of your framework
- Code examples and explanations on how to:
> create an element
> create an event
> nest elements
> add attributes to an element
- Explanation on why things work the way they work
- Abstracting the DOM

# Here are some methods you can use:

- Virtual DOM - Using a second DOM with the wanted changes, to compare with the real DOM and change just what is needed
- Data Binding - binds together two data sources and keeps them synchronized
- Templating - refers to the client side data binding method implemented with the JavaScript language.
- There are a lot of ways to achieve this. Above are just some examples, what matters is that the DOM must respond to certain actions of the user.

> You have to take into account the events, children and attributes of each element of the DOM.

# Routing System
Routing in this case refers to the synchronization of the state of the app with the url. In other words you will have to develop a simple way to change the url through actions of the user that will also change the state (explained in the next topic).

# State Management
The state of an app can be seen as the outcome of all of the actions that the user has taken since the page loaded. In other words, if a user clicks on a button to execute an action, the state should then change.
What you will need to do is to implement a way to handle this state. Remember that multiple pages can need to interact with the same state, so you need to find a way to let the state be reachable at every time.

# Event Handling
You will also have to implement a way to handle the events triggered by the user, like: scrolling, clicking, certain keybindings, etc.... Note that this new way of handling events must different from the addEventListener() method that already exists.

# TodoMVC
A todoMVC project consists on creating a webpage (this example is written in VanillaJS) with the same elements present in the example, so we advise you to test it around first. You have to make your todoMVC project, a pretty much perfect copy of the examples given in the links above, but using your framework.
Be aware that every thing that we can't visually see has to be present too (ids, classes, etc.).