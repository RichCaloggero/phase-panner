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
name: "enableLeft", type: "checkbox", value: true,
updater: function (value) {
reverb.enableSource("left", value);
}
}, {
name: "enableRight", type: "checkbox", value: true,
updater: function (value) {
reverb.enableSource("right", value);
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
//console.log(`dimensions.updater: ${value.length}, ${value}`);
try {
const dimensions = JSON.parse(value);
room.dimensions = Object.assign({}, room.dimensions, dimensions);
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
//console.log(`leftPosition: ${value}`);
reverb.source.left.setPosition(value[0], value[1], value[2]);
},
}, {
name: "rightPosition", type: "custom", elementName: "button", role: "application", class: "vector",
value: "[2,0,0]", min: 0, max: 360, step: 1,

updater: function (value) {
value = JSON.parse(value);
reverb.source.right.setPosition(value[0], value[1], value[2]);
//console.log(`rightPosition: ${value}`);
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
}
}, {
name: "xtcMix", value: 0,
updater: function (value) {
xtc.mix(value);
}
}, {
name: "xtcFrequency",
value: 6000, min: 20, max: 10000, step: 20,
updater: function (value) {xtc.filter.frequency.value = value;}
}, {
name: "xtcQ",
value: 0.3, max: 10,
updater: function (value) {xtc.filter.Q.value = value;}
}, {
name: "xtcFeedback",
value: 0.0, min: -1,
updater: function (value) {xtc.feedback.gain.value = value;}
}, {
name: "xtcDelay",
value: 0.0, step: (1/48000)/2,
updater: function (value) {xtc.leftDelay.delayTime.value = xtc.rightDelay.delayTime.value = value;}
}, {
name: "xtcFilterType", type: "select", value: "bandpass",
options: ["lowpass", "highpass", "bandpass",
"lowshelf", "highshelf",
"peaking", "notch",
"allpass"],
updater: function (value) {xtc.filter.type = value;}
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
