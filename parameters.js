const defaultParameter = {
name: "", list: true,
type: "range",
value: 0, min: 0, max: 1, step: 0.1,
selectedIndex: 0,
updater: null, // function (value) {console.log(`Parameter.updater: receiving value ${value}`);},
automator: {type: "sine", frequency: 0.5},
}; // defaultParameter




function createParameterMap (parameterData) {
const parameters = new Map();
parameterData.forEach(data => {
const p = Object.assign({}, defaultParameter, data);
parameters.set(p.name, p);
});
return parameters;
} // createParameterMap

function createUiControl (data) {
let element;

if (data.type === "custom" && data.elementName) {
element = document.createElement(data.elementName);
element.setAttribute("data-value", data.value);
element.classList.add(data.class);

} else if (data.type === "select" || data.options instanceof Array) {
element = document.createElement("select");
populateSelector(element, data.options);
element.selectedIndex = data.selectedIndex;

} else {
element = document.createElement("input");
Object.assign(element, {
type: data.type,
min: data.min,
max: data.max,
step: data.step,
value: data.value
}); // assign
} // if

return element;
} // createUiControl

