function getValue (elementOrId) {
const element = elementOrId instanceof HTMLElement? elementOrId
: document.getElementById(elementOrId);
if (!element) return undefined;

if (element.getAttribute("type") === "checkbox") {
return element.checked;
} else if (element.type === "text") {
return element.value;

} else {
const value = element.value;
return Number.isNaN(Number(value))?
value
: Number(value);
} // if
} // getValue

function setValue (element, value, noChangeEvent) {
element.value = value;
if (noChangeEvent) return;
else signal(element);
} // setValue


function signal (element, eventName = "change") {
console.log("signal: ", element, eventName);

element.dispatchEvent(new CustomEvent(eventName, {bubbles: true}));
} // signal


function ui(id) {
return id? document.getElementById(id)
: null;
} // ui

function enumerateNumericControls () {
return enumerateUiControls ()
.filter(x => x.matches("input[type='range'], input[type='number']"));
} // enumerateNumericControls


function enumerateUiControls () {
return Array.from(document.querySelectorAll("#controls input, #controls select"));
} // enumerateUiControls

function getControlIds () {
return enumerateUiControls().map(x => x.id);
} // getControlIds 
