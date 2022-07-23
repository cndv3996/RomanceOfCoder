class AnimationElement {
    enabled = false;
    faceOuterId = "";
    faceOuterId2 = "";
    imageOuter = "";
    imageOuter2 = "";
    mix = 0.0;
    startLoopTime = 0;
    animationTimeLength = 1000;

    constructor(faceOuterId, faceOuterId2, imageOuter, imageOuter2) {
        this.enableAnimation(faceOuterId, faceOuterId2, imageOuter, imageOuter2);
    }

    isEnabled = () => {
        return this.enabled;
    }

    disableAnimation = () => {
        this.enabled = false;
    }

    enableAnimation = (faceOuterId, faceOuterId2, imageOuter, imageOuter2) => {
        this.enabled = true;
        this.faceOuterId = faceOuterId;
        this.faceOuterId2 = faceOuterId2;
        this.imageOuter = imageOuter;
        this.imageOuter2 = imageOuter2;
        this.mix = 0.0;
        this.startLoopTime = Date.now();
    }

    loop = () => {
        if (!this.enabled) {
            return;
        }
        const timeStamp = Date.now();
        const timePassed = timeStamp - this.startLoopTime;

        this.mix = timePassed / this.animationTimeLength;
        if (this.mix > 1.0)
        {
            this.mix = 1.0;
        }
    }

    getMix = () => {
        if (this.mix >= 1.0) {
            this.disableAnimation();
            return 1.0;
        }
        return this.mix;
    }

    getFaceOuter = () => {
        return [this.faceOuterId, this.imageOuter];
    }

    getFaceOuter2 = () => {
        return [this.faceOuterId2, this.imageOuter2];
    }
}

class CubeAnimation {
    faceList = [
    "faceFront",
    "faceBack",
    "faceRight",
    "faceLeft",
    "faceTop", 
    "faceBottom"];

    faceOuterList = [
    "faceFrontOuter",
    "faceBackOuter",
    "faceRightOuter",
    "faceLeftOuter",
    "faceTopOuter", 
    "faceBottomOuter"];

    faceOuterList2 = [
    "faceFrontOuter2",
    "faceBackOuter2",
    "faceRightOuter2",
    "faceLeftOuter2",
    "faceTopOuter2", 
    "faceBottomOuter2"];

    animationPool = [];

    imageSwitchInterval = 1000;
    imageSwitchTimer = 0;
    faceOuterOpcity = 0.7;

    imageList = "";
    imageNum = 0;
    imageIndex = 0;

    faceIndex = Math.floor(Math.random() * this.faceList.length);
    faceOuterIndex = Math.floor(Math.random() * this.faceOuterList.length);

    constructor(imageList) {
        this.imageList = imageList;
        this.imageNum = this.imageList["images"].length;
        // this.imageIndex = Math.floor(Math.random() * this.imageNum);
    }

    
    getFace = () => {
        this.faceIndex++;
        if (this.faceIndex >= this.faceList.length) {
            this.faceIndex = 0;
        }
        return this.faceList[this.faceIndex];
    }
    
    getFaceOuter = () => {
        this.faceOuterIndex++;
        if (this.faceOuterIndex >= this.faceOuterList.length) {
            this.faceOuterIndex = 0;
        }
        return [this.faceOuterList[this.faceOuterIndex], this.faceOuterList2[this.faceOuterIndex]];
    }
    
    switchAllImages = () => {
        for (let i in this.faceList) {
            const element = document.getElementById(this.faceList[i]);
            if (element) {
                element.style.backgroundImage = "url('" + this.getImage() + "')";
            }
        }
        for (let i = 0; i < this.faceOuterList.length; i++) {
            const imageOuter = this.getImage();
            const element = document.getElementById(this.faceOuterList[i]);
            if (element) {
                // console.log("face: ", this.faceOuterList[i]);
                element.style.backgroundImage = "url('" + imageOuter + "')";
                element.style.opacity = this.faceOuterOpcity;
            }
            const element2 = document.getElementById(this.faceOuterList2[i]);
            if (element2) {
                // console.log("face2: ", this.faceOuterList2[i]);
                element2.style.backgroundImage = "url('" + imageOuter + "')";
                element2.style.opacity = this.faceOuterOpcity;
            }
        }
    }
    
    switchOneImage = () => {
        console.log("come in.");
        const faceOuter = this.getFaceOuter();
        const imageOuter = this.getImage();
        const imageOuter2 = this.getImage();
        this.startAnimation(faceOuter[0], faceOuter[1], imageOuter, imageOuter2);

        this.setFaceElement();
        this.setFaceOuterElement(faceOuter[0], faceOuter[1], imageOuter, imageOuter2, 0.0);
    }

    setFaceElement = () => {
        const element = document.getElementById(this.getFace());
        if (element) {
            element.style.backgroundImage = "url('" + this.getImage() + "')";
        }
    }

    setFaceOuterElement = (faceOuterId, faceOuterId2, imageOuter, imageOuter2, mix) => {
        // console.log("face both:", faceOuterId, faceOuterId2);
        const elementOuter = document.getElementById(faceOuterId);
        const elementOuter2 = document.getElementById(faceOuterId2);
        if (elementOuter && elementOuter2) {
            if (mix == 0.0) {
                elementOuter.style.backgroundImage = elementOuter2.style.backgroundImage;
                elementOuter2.style.backgroundImage = "url('" + imageOuter + "')";
                elementOuter.style.opacity = this.faceOuterOpcity;
                elementOuter2.style.opacity = 0.0;
            }
            else {
                // elementOuter.style.backgroundImage = "url('" + imageOuter + "')";
                elementOuter.style.opacity = (1.0 - mix) * this.faceOuterOpcity;
                // elementOuter2.style.backgroundImage = "url('" + imageOuter2 + "')";
                elementOuter2.style.opacity = mix * this.faceOuterOpcity;
            }
        }
    }

    startAnimation = (faceOuterId, faceOuterId2, imageOuter, imageOuter2) => {
        for (let index in this.animationPool) {
            console.log("startAnimation: ", this.animationPool[index].isEnabled(), this.animationPool.length);
            if (!this.animationPool[index].isEnabled()) {
                this.animationPool[index].enableAnimation(faceOuterId, faceOuterId2, imageOuter, imageOuter2);
                return;
            }
        }
        this.animationPool.push(new AnimationElement(faceOuterId, faceOuterId2, imageOuter, imageOuter2));
    }
    
    getImage = () => {
        this.imageIndex++;
        if (this.imageIndex >= this.imageNum) {
            this.imageIndex = 0;
        }
        return this.imageList["images"][this.imageIndex]["name"];
    }

    loop = () => {
        for (let index in this.animationPool) {
            const animation = this.animationPool[index];
            // console.info(animation);
            if (!animation.isEnabled()) {
                continue;
            }
            animation.loop();
            const faceOuter = animation.getFaceOuter();
            const faceOuter2 = animation.getFaceOuter2();
            const mix = animation.getMix();
            // console.log(index, mix, this.animationPool.length);
            this.setFaceOuterElement(faceOuter[0], faceOuter2[0], faceOuter[1], faceOuter2[1], mix);
        }
        const timeStamp = Date.now();
        // console.log("come in.", timeStamp, this.imageSwitchTimer, this.imageSwitchInterval);
        if (timeStamp > (this.imageSwitchTimer + this.imageSwitchInterval)) {
            this.switchOneImage();
            this.imageSwitchTimer = timeStamp;
        }
    }
};