class Component {
constructor (audio) {
this.audio = audio;
this.input = audio.createGain();
this.output = audio.createGain();
this.wet = audio.createGain();
this.dry = audio.createGain();

this.input.connect(this.dry);
this.wet.connect(this.output);
this.dry.connect(this.output);
} // constructor

connect (node) {
this.output.connect (node);
} // connect

disconnect () {
this.output.disconnect();
} // disconnect

mix (value) {
this.dry.gain.value = 1-value;
this.wet.gain.value = value;
return value;
} // mix

} // Component

class Binaural extends Component {
constructor (audio) {
super (audio);
const s = audio.createChannelSplitter(2);
const leftPanner = audio.createPanner(), rightPanner = audio.createPanner();

this.input.connect(s);
s.connect(leftPanner, 0).connect(this.wet);
s.connect(rightPanner, 1).connect(this.wet);
} // constructor
} // class Binaural

class Series extends Component {
constructor (audio, components) {
super (audio);
if (components.length < 2) throw new Error("Series: need two or more components");
components.forEach((c, i, all) => {
c.disconnect();
if (i < all.length-1) c.connect(all[i+1]);
}); // forEach

this.input.connect(components[0]);
components[components.length-1].connect(this.wet);
} // constructor
} // class Series

class Parallel extends Component {
constructor (audio, components) {
super (audio);
if (components.length < 2) throw new Error("Parallel: need two or more components");
const output = audio.createGain();
output.gain.value = 1 / components.length;

components.forEach((c, i) => {
c.disconnect();
this.input.connect(c);
c.connect(output);
}); // forEach

output.connect(this.wet);
} // constructor
} // class Parallel

class Phaser extends Component {
constructor (audio, bandCount = 1) {
super (audio);
this.bandCount = bandCount;
this.filters = [];
this.filterComponent = null;
while (bandCount > 0) {
filters.push(audio.createBiquadFilter());
} // while
} // constructor

series () {
this.filterComponent = new Series(this.audio, this.filters);
this.input.connect(this.filterComponent.input);
this.filterComponent.connect(this.output);
} // series

parallel () {
this.filterComponent = new Parallel(this.audio, this.filters);
this.input.connect(this.filterComponent.input);
this.filterComponent.connect(this.output);
} // parallel


} // class Phaser
