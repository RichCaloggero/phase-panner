function save () {
localStorage.userValues = getAllUserValues();
} // save 

function restore () {
setAllUserValues (localStorage.userValues);
} // restore

function setAllNodeValues () {
getAllUiIds().forEach(id => uiToNode(id)); // forEach
} // setAllNodeValues 

function setAllUiValues () {
getAllUiIds().forEach(id => nodeToUi(id)); // forEach
} // setAllUiValues 

function uiToNode (id) {
const value = getValue(id);
if (value === undefined) return;

const [node, parameterName] = nodeMap.get(id);
if (node && node instanceof AudioNode) {
const parameter = node[parameterName];
if (parameter instanceof AudioParam) {
parameter.value = value;
} else {
node[parameterName] = value;
} // if
} // if
} // uiToNode

function nodeToUi (id) {
const [node, parameterName] = nodeMap.get(id);
if (node && node instanceof AudioNode) {
const parameter = node[parameterName];
if (parameter instanceof AudioParam) {
ui(id).value = parameter.value;
} else {
ui(id).value = node[parameterName];
} // if
} // if
} // uiToNode

function getAllUiIds () {
return enumerateUiElements().map(x => x.id);
} // getAllUiIds

function getAllUiValues () {
return getAllUiIds().map(id => [id, getValue(id)]);
} // getAllUiValues 

function setAllUiValues (values) {
values.forEach(x => {
const [id, value] = x;
ui(id).value = value;
}); // forEach
} // setAllUiValues 

function enumerateUiElements () {
return Array.from(document.querySelectorAll("#parameters input"))
.filter(x => (
["text", "number", "range", "checkbox", "radio", "select"]
.includes(x.type)
)); // filter
} // enumerateUiElements

function getValue (id) {
if (!(ui(id) instanceof HTMLElement)) return undefined;

if (ui(id).getAttribute("type") === "checkbox") return ui(id).checked;

const value = ui(id).value;
return Number.isNaN(Number(value))?
value
: Number(value);
} // getValue

function ui(id) {
return document.getElementById(id);
} // ui
