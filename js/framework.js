//   STATE MANAGEMENT - STATE OBJECT    
  let state = {
    todo: [],    
    selectedBtn: 1, 
    page: "/#",      
    filter: "",      
    hideInfo: false,
    hideCleaCompletedButton: false,
    allChecked: false,
  };

//  STATE MANAGEMENT 
// Function to save the application state to the local storage
function saveState(currentState) {
    localStorage.setItem("state", JSON.stringify(currentState));
}

// Function to load the application state from the local storage
function loadState() {
    let data = localStorage.getItem("state");

    if (data) {
    state = JSON.parse(data);
    }
}

//   EVENT MANAGEMENT
// Utility function to add an event listener to an HTML element
function addEvent(eventType, element, callback) {
    element.addEventListener(eventType, callback);
}

// Utility function to remove an event listener from an HTML element
function removeEvent(eventType, element, callback) {
    element.removeEventListener(eventType, callback);
}

// ROUTING SYSTEM
//Function to set attributes on an HTML element
function handleAttri(d, at) {
    for (let i = 0; i < at.length; i += 2) {
      let k = at[i];
      let v = at[i + 1];
  
      d.setAttribute(k, v);
    }
  }
  
// Function to create a child element and append it to a parent element
function createChild(parent, child) {
    if (child instanceof Node) {
      parent.appendChild(child);
    } else {
      parent.appendChild(document.createTextNode(child));
    }
}
  
// Function to remove a child element from a parent element
function removeChild(parent, child) {
    parent.removeChild(child);
}
  
// Function to get the ancestor element of a given element (default is the grandparent element)
function getParent(element, num = 2) {
    let ret = element;
  
    for (let i = 0; i < num; i++) {
      ret = ret.parentElement;
    }
  
    return ret;
}
  
// Function to create an HTML element with specified attributes and children
function createStructure(st) {
    let parent = document.createElement(st.tag);
  
    // Set attributes on the element, if provided
    if ("attri" in st) {
      handleAttri(parent, st.attri);
    }
  
    // Append child elements, if provided
    if ("children" in st) {
      if (Array.isArray(st.children)) {
        for (const child of st.children) {
          createChild(parent, child);
        }
      } else {
        createChild(parent, st.children);
      }
    }
  
    return parent;
}
  
// Function to perform URL redirection using the browser's history
function redirect(url) {
    window.history.pushState(null, null, url);
}