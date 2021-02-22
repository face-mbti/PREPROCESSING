var ImageControl = require('./ImageControl');

let target = './IMG_0135.PNG';
const IC = new ImageControl(target);
console.log(IC.getImgInfo());
IC.makeAllWhite();