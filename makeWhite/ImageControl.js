const fs = require("fs");
const { PNG } = require("pngjs");

class ImageControl{
    imgFile; imgPath; destPath;
    constructor(imgPath, destPath='./'){
        this.imgPath = imgPath;
        this.destPath = destPath;

        this.syncReader(imgPath);
    }

    getImgInfo(){
        return this.imgFile;
    }
    
    syncReader(){
        const data = fs.readFileSync(this.imgPath);
        this.imgFile = PNG.sync.read(data);
        return this.imgFile;
    }
    syncWriter(file){
        let buffer = PNG.sync.write(file);
        let name = this.imgPath.split('/').reverse()[0];
        name = name.replace('.PNG', '_white.PNG');
        let dest = this.destPath+name;
        fs.writeFileSync(name, buffer);
    }
    
    makeAllWhite(){
        console.log("Make All White Pixel");
        let newPNG = {...this.imgFile}
        for(let y=0; y<newPNG.height; y++){
            for(let x=0; x<newPNG.width; x++){
                let idx = (newPNG.width * y + x) << 2;

                //setWhite
                newPNG.data[idx] = 255;
                newPNG.data[idx+1] = 255;
                newPNG.data[idx+2] = 255;
            }
        }
        this.syncWriter(newPNG);
    }
}
module.exports = ImageControl;