function save () {
localStorage.userValues = JSON.stringify(getUserValues());
} // save 

function restore () {
try {
const values = JSON.parse(localStorage.userValues);
console.log("restoring ", values.length, " parameters from localStorage...");
setUserValues(values);
console.log("setUserValues completed");
allUiToNode();
console.log("allUiToNode completed");
} catch (e) {
console.log("restore: ", e);
} // catch
} // restore

function getUserValues () {
return getAllUiIds().map(id => [id, getValue(id)]);
} // getUserValues 

function setUserValues (values) {
values.forEach(x => {
const [id, value] = x;
if (id && ui(id)) {
ui(id).value = value;
} // if
}); // forEach
} // setUserValues 


function allUiToNode () {
getAllUiIds().forEach(id => uiToNode(id));
} // allUiToNode 

function allNodeToUi () {
getAllUiIds().forEach(id => nodeToUi(id)); // forEach
} // allNodeToUi 

function uiToNode (id) {
const value = getValue(id);
if (value === undefined) return;

if (id && nodeMap.has(id)) {
const [node, parameterName] = nodeMap.get(id);
setNode (node, parameterName, value);
} else {
console.log("uiToNode: cannot set ", id);
} // if
} // uiToNode

function nodeToUi (id) {
if (id && nodeMap.has(id)) {
const [node, parameterName] = nodeMap.get(id);
return getNode(node, parameterName);
} else {
console.log("nodeToUI: cannot get -- ", id);
return undefined;
} // if
} // nodeToUi

function setNode (node, parameterName, value) {
/*if (node 
&& (node === automation || node instanceof AudioNode)
) {
*/
const parameter = node[parameterName];
if (parameter instanceof AudioParam) {
parameter.value = value;
} else {
node[parameterName] = value;
} // if
//} // if
} // setNode

function getNode (node, parameterName) {
//if (node && node instanceof AudioNode) {
const parameter = node[parameterName];
if (parameter && parameter instanceof AudioParam) {
return parameter.value;
} else {
return node[parameterName];
} // if
//} // if
} // getNode


function getAllUiIds () {
return enumerateUiElements().map(x => x.id);
} // getAllUiIds

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
