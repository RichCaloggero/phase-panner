class Reverb extends Component {
constructor (audio, scene) {
super (audio, scene);
this.context = audio;
this.scene = scene;
this.source = {};
const inLeft = this.source.left = scene.createSource();
const inRight = this.source.right = scene.createSource();
inLeft.setDirectivityPattern(0, 100);
inRight.setDirectivityPattern(0, 100);
const s = audio.createChannelSplitter();
this.input.connect(s);
s.connect(inLeft.input, 0,0);
s.connect(inRight.input, 1,0);
scene.output.connect(this.wet);
} // constructor

setPosition (...positions) {
[this.source.left,this.source.right].forEach((source, index) => _set(source, positions[index]));

function _set (source, position) {
source.setPosition(position[0],position[1],position[2]);
} // _set
} // setPosition

setRoomSize (value) {
this.roomSize = value;
} // setRoomSize

updateRoom (room, scale = 1) {
const dimensions = Object.assign({}, room.dimensions);
dimensions.width *= scale;
dimensions.depth *= scale;
dimensions.height *= scale;
this.scene.setRoomProperties(dimensions, room.materials);
return {dimensions: dimensions, materials: room.materials};
} // updateRoom

static materialsList () {
return [
'transparent',
'acoustic-ceiling-tiles',
'brick-bare',
'brick-painted',
'concrete-block-coarse',
'concrete-block-painted',
'curtain-heavy',
'fiber-glass-insulation',
'glass-thin',
'glass-thick',
'grass',
'linoleum-on-concrete',
'marble',
'metal',
'parquet-on-concrete',
'plaster-smooth',
'plywood-panel',
'polished-concrete-or-tile',
'sheetrock',
'water-or-ice-surface',
'wood-ceiling',
'wood-panel',
'uniform'
]; // return
} // materialsList

// make a room
static defaultRoom () {
const defaultDimensions = {
width: 100,
height: 100,
depth: 100
}; // dimensions

const defaultMaterials = {
// Room wall materials
left: "transparent", // 'brick-bare',
right: "transparent", // 'curtain-heavy',
front: "transparent", // 'marble'
back: "transparent",  // 'glass-thin',
// Room floor
down: "transparent",  // 'grass',
// Room ceiling
up: "transparent"  // 'transparent'
}; // materials

return {dimensions: defaultDimensions, materials: defaultMaterials};
} // defaultRoom

static createScene (order = 3) {
const scene = new ResonanceAudio(audio);
scene.setAmbisonicOrder(order);
return scene;
} // createScene

static displayDimensions(dimensions) {
return `${dimensions.width.toFixed(2)}X${dimensions.depth.toFixed(2)}X${dimensions.height.toFixed(2)}`;
} // displayDimensions
} // class Reverb
