class Pairs {
constructor () {
this._pairs = [];
} // constructor

add(pair) {
this._pairs.push(pair);
} // add

get (index) {return this._pairs[index];}

indexOf(p) {
return this._pairs.findIndex(x => x instanceof Array && x.length === 2 && x[0] === p[0] && x[1] === p[1]);
} // includes

includes (p) {return this.indexOf(p) !== -1;}
} // class Pairs


class Bind {
constructor () {
this._op1 = new Pairs();
this._op2 = new Pairs();
} // constructor

bind (o1,p1, o2,p2) {
const op1 = this._op1, op2 = this._op2;
op1.add([o1,p1]);
op2.add([o2,p2]);
} // bind

setValue (o, p, value) {
const op1 = this._op1, op2 = this._op2;
let op = null;

if (op1.includes([o,p])) {
op = op2.get(op1.indexOf([o,p]));
//console.log ("found in op1: ", op);
} else if (op2.includes([o,p])) {
op = op1.get(op2.indexOf([o,p]));
//console.log ("found in op2: ", op);
} else {
//console.log("not found");
return false;
} // if

let [object, property] = op;
//console.log("object: ", object, ", property: ", property);
object[property] = value;
//console.log("- set to ", value);
} // setValue

} // class


/*/// tests

const b = new Bind();
const o1 = {a:1,b:2};
const o2 = {a:11,b:12};
b.bind (o1,"a", o2, "b");
b.setValue (o1,"a", 66);
console.log("test: ", o1, o2);

b.setValue (o2,"b", 1313);
console.log("test: ", o1, o2);
*/