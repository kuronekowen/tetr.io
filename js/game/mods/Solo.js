class SoloMod extends Mod{

    constructor(){
        super(document.querySelector("canvas#playfield"));

        this.lastTime = 0;
        this.dropCounter = 0;
        
        this.__draw();

        const __loop = (time = 0) => {
            const deltaTime = time - this.lastTime;
            this.lastTime = time;

            this.dropCounter += deltaTime;

            if(this.dropCounter > this.speed)
            {
                this.dropCounter = 0;
                this.pieceDrop();
            }

            this.__draw();
            this.__updateScore().__updateLevel().__updateSpeed();
            
            requestAnimationFrame(__loop);
            
        };
        __loop();
        
    }

    __updateScore(){
        document.querySelector("p#score > span.value").textContent = this.score;
        return this;
    }

    __updateLevel(){
        document.querySelector("p#level > span.value").textContent = this.level;
        return this;
    }

    __updateSpeed(){
        document.querySelector("p#speed > span.value").textContent = this.speed/1000+" G";
        return this;
    }

    __draw(){
        
        super.__drawMatrix(this.playfield.matrix);
        super.__drawMatrix(this.piece.matrix, this.piece.pos, false);
    }

}