const parameterData = [{
name: "media", type: "text", list: false,
updater: function (value) {
audioElement.src = value;
audioElement.play();
},
}, {
name: "mix",
updater: function (value) {
reverb.mix(value);
}
}, {
name: "width",
value: 3, max: 100,
updater: function (value) {
room.dimensions.width = value;
reverb.updateRoom(room);
reverb.setPosition([-1*value/2,0,0], [value/2, 0,0]);
},
}, {
name: "depth",
value: 2.5, max: 100,
updater: function (value) {
room.dimensions.depth = value;
reverb.updateRoom(room);
},
}, {
name: "height",
value: 3, max: 100,
updater: function (value) {
room.dimensions.height = value;
reverb.updateRoom(room);
},
}, {
name: "floor", type: "select", options: Reverb.materialsList(),
selectedIndex: 6,
updater: function (value) {
room.materials.down = value;
reverb.updateRoom(room);
}
}, {
name: "ceiling", type: "select", options: Reverb.materialsList(),
selectedIndex: 1,
updater: function (value) {
room.materials.up = value;
reverb.updateRoom(room);
}
}, {
name: "leftWall", type: "select",
selectedIndex: 6,
options: Reverb.materialsList(),
updater: function (value) {
room.materials.left = value;
reverb.updateRoom(room);
}
}, {
name: "rightWall", type: "select",
options: Reverb.materialsList(),
selectedIndex: 6,
updater: function (value) {
room.materials.right = value;
reverb.updateRoom(room);
}
}, {
name: "frontWall", type: "select",
options: Reverb.materialsList(),
selectedIndex: 6,
updater: function (value) {
room.materials.front = value;
reverb.updateRoom(room);
}
}, {
name: "backWall", type: "select",
options: Reverb.materialsList(),
selectedIndex: 6,
updater: function (value) {
room.materials.back = value;
reverb.updateRoom(room);
}
}, {
name: "roomSize",
value: 1.0, max: 100,
updater: function (value) {
reverb.setRoomSize(value);
const dimensions = reverb.updateRoom(room).dimensions;
setTimeout(() => {
message(`Dimensions: ${Reverb.displayDimensions(dimensions)}`);
}, 200);
},
}, {
name: "dimensions", type: "text",
value: '{"width": 1.3, "depth": 2.0, "height": 0.7}',
updater (value) {
console.log(`dimensions.updater: ${value.length}, ${value}`);
try {
const dimensions = JSON.parse(value);
room.dimensions = Object.assign({}, dimensions);
reverb.updateRoom(room);

message(`new dimensions: ${Reverb.displayDimensions(dimensions)}`);
} catch (e) {
message(`cannot parse dimensions: ${e}\n${e.stack}`);
} // try
},
}, {
name: "leftPosition", type: "custom", elementName: "button", role: "application", class: "vector",
value: "[-2,0,0]", step: 1, min: 0, max: 360,

updater: function (value) {
value = JSON.parse(value);
console.log(`leftPosition: ${value}`);
reverb.source.left.setPosition(value[0], value[1], value[2]);
},
}, {
name: "rightPosition", type: "custom", elementName: "button", role: "application", class: "vector",
value: "[2,0,0]", min: 0, max: 360, step: 1,

updater: function (value) {
value = JSON.parse(value);
reverb.source.right.setPosition(value[0], value[1], value[2]);
console.log(`rightPosition: ${value}`);
reverb.source.right.setPosition(value[0], value[1], value[2]);
},
}, {
name: "rotate", type: "text",
value: 0, min: -180, max: 180, step: 1,
updater: function (value) {
try {
value = JSON.parse(value);
scene.setListenerOrientation.apply(scene, value);
} catch (e) {
message(`rotate: ${e}`);
} // try
},
}, {
name: "sharpness",
value: 1, min: 1, max: Number.infinity,
updater: function (value) {
reverb.source.left.setDirectivityPattern(0, value);
reverb.source.right.setDirectivityPattern(0, value);
},
}, {
name: "sourceWidth",
min: 0, max: 360, step: 1,
updater: function (value) {
[reverb.source.left, reverb.source.right].forEach(source => source.setSourceWidth(value));
},
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
options: ["lowpass", "highpass", "bandpass",
"lowshelf", "highshelf",
"peaking", "notch",
"allpass"]
}, {
name: "projectName", type: "text", list: false,
updater: function (value) {
projectName = value;
}
}, {
name: "projectList", type: "select", list: false, selectedIndex: 0,
options: ["untitled"],
updater: function (value) {
loadProject(value);
}
}, {
name: "parameterList", list: false, type: "select", selectedIndex: 0,
updater: function (value) {
displayParameter(parameters.get(value));
},
}]; // parameterData
