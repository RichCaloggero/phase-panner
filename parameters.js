const defaultParameter = {
name: "",
type: "", value: null,
min: 0, max: 1,
ui: null,
updater: function (value) {console.log(`Parameter.updater: receiving value ${value}`);},
automator: null,
}; // defaultParameter

const parameterData = [{
name: "mix",
}, {
name: "xtcMix",
}, {
name: "frequency",
value: 500, min: 20, max: 10000, step: 20
}, {
name: "q",
value: 1, max: 10
}, {
name: "feedback",
min: -1,
}, {
name: "delay"
}, {
name: "filterType", type: "select",
values: ["lowpass", "highpass", "bandpass",
"lowshelf", "highshelf",
"peaking", "notch",
"allpass"]
}]; // parameterData



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
element.type = data.type || "range";

} else if (data.type === "select" || data.values instanceof Array) {
element = document.createElement("select");
populateSelector(element, data.values);
} // if

const label = document.createElement("label");
label.textContent = data.label || data.name;
label.appendChild(element);
return label;
} // createUiControl

