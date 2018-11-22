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
}];

function initializeParameters(parameterData) {
automation.defaultParameter = {
name: "",
enabled: false,
value: 0, min: 0, max: 1, step: 0.1,
tickCount: 0,
group: "",
function: null,
functionText: ""
};

automation.enabled = false;
automation.tickCount = 0;
automation.tick = 0.2; // seconds
automation.parameters = new Map();

automation.groups = new Map([
["position", {
name: "position",
values: new Map(),
function: function (values) {
const r = values.has("radius")? values.get("radius") : getValue("radius");
const a = values.has("angle")? values.get("angle") : getValue("angle");
setPosition(a, r);
} // function
}] // position
]); // groups

enumerateNumericControls().forEach(element => {
automation.parameters.set(element.id, 
Object.assign({}, automation.defaultParameter, {
name: element.id,
group: element.getAttribute("data-group") || ""
}));
}); // forEach

populateSelector(
"parameterName", 
Array.from(automation.parameters.entries())
.map(binding => binding[0])
) // populateSelector
} // initializeAutomation

