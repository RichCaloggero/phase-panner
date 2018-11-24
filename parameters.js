const defaultParameter = {
name: "", list: true,
type: "", value: null,
value: 0, min: 0, max: 1, step: 0.1,
ui: null,
updater: function (value) {console.log(`Parameter.updater: receiving value ${value}`);},
automator: null,
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
if (!data.type && (data.min || data.max || data.step)) {
element = document.createElement("input");
Object.assign(element, {
type: data.type || "range",
min: data.min,
max: data.max,
step: data.step,
value: data.value
}); // assign

} else if (data.type === "select" || data.values instanceof Array) {
element = document.createElement("select");
populateSelector(element, data.values);
} // if

const label = document.createElement("label");
label.textContent = data.label || data.name;
label.appendChild(element);
return label;
} // createUiControl

