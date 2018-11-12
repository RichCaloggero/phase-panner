function getValue (elementOrId) {
const element = elementOrId instanceof HTMLElement? elementOrId
: document.getElementById(elementOrId);
if (!element) return undefined;

if (element.getAttribute("type") === "checkbox") return element.checked;
else if (element.type === "text") return element.value;

const value = element.value;
return Number.isNaN(Number(value))?
value
: Number(value);
} // getValue

function setValue (element, noChangeEvent) {
element.value = value;
if (noChangeEvent) return;
else signal(element);
} // setValue


function signal (element, eventName = "change") {
console.log(`signal: ${element}`);

element.dispatchEvent(new CustomEvent(eventName, {bubbles: true}));
} // signal


function ui(id) {
return id? document.getElementById(id)
: null;
} // ui

function enumerateNumericControls () {
enumerateUiControls()
.filter(x => x.matches("input[type='range'], input[type='number']"));
} // enumerateNumericControls


function enumerateUiControls () {
return Array.from(document.querySelectorAll("#controls input"));
} // enumerateUiControls

function getControlIds () {
return enumerateUiControls().map(x => x.id);
} // getControlIds 
