function populateSelector(id, items) {
const element = (id instanceof HTMLElement)? id : ui(id);
if (element) {
console.log(`populateSelector: ${element.id}, #${items.length}, [${items}]`);
element.innerHTML = "";
items.forEach(item => {
let key, value;
if (item instanceof Array) {
key = item[0];
value = item[1];
} else if (typeof(item) === "boolean" || typeof(item) === "string" || typeof(item) === "number") {
key = value = item;
} // if

element.add(createOption(key, value));
}); // forEach
} // if


function createOption(value, text) {
const element = document.createElement("option");
element.value = value;
element.textContent = text;
return element;
} // createOption
} // populateSelector

function getValue (elementOrId) {
const element = elementOrId instanceof HTMLElement? elementOrId
: document.getElementById(elementOrId);
if (!element) return undefined;
const type = element.type;
const value = element.value;

if (type === "checkbox") {
return element.checked;
} else if (type === "text") {
return value;
} else if (element instanceof HTMLInputElement && (type === "number" || type === "range")) {
return Number(value);
} else {
return value;
} // if
} // getValue

function setValue (element, value, eventName) {
element.value = value;
if (eventName) signal(element, eventName);
} // setValue


function signal (element, eventName = "change") {
//console.log("signal: ", element, eventName);
element.dispatchEvent(new CustomEvent(eventName, {bubbles: true}));
return element;
} // signal


function ui (id) {
return id? document.getElementById(id)
: null;
} // ui

function enumerateNumericControls () {
return enumerateUiControls ()
.filter(x => x.matches("input[type='range'], input[type='number']"));
} // enumerateNumericControls


function enumerateUiControls (selector = "*", root = document.querySelector("#controls") || document) {
if (typeof(root) === "string" || root instanceof String) root = document.querySelector(root);
return Array.from(root.querySelectorAll("input, select"))
.filter(element => element.matches(selector));
} // enumerateUiControls

function getControlIds () {
return enumerateUiControls().map(x => x.id);
} // getControlIds 
