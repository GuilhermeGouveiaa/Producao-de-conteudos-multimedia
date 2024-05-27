'use strict';

class FotoPrint {
    constructor(nPoolMax, nFigures) {
        this.thingInMotion = null;
        this.offsetx = null;
        this.offsety = null;
        this.poolDrawing = new Pool(nPoolMax);
        this.poolFigures = new Pool(nFigures);
        this.color = "grey";
        this.bgcolor = "#BB8C53";
    }

    initCanvas1() {
        let b = new Ball(700, 200, 50, "white")
        this.poolDrawing.insert(b);

        let t = new Triangle(300, 10, 80, 0, 40, 40, "red");
        this.poolDrawing.insert(t);

        let g = new Ghost(300, 200, 50, "orange");
        this.poolDrawing.insert(g);

        let u = new Bear(500, 200, 50, "blue");
        this.poolDrawing.insert(u);

        let r = new Rect(100, 10, 60, 60, "red");
        this.poolDrawing.insert(r);

        let o = new Oval(150, 150, 50, 1, 1, "blue");
        this.poolDrawing.insert(o);

        let h = new Heart(200, 250, 80, "pink");
        this.poolDrawing.insert(h);

        let dad = new Picture(450, 300, 70, 70, "imgs/allison1.jpg");
        this.poolDrawing.insert(dad);
    }

    initCanvas2() {

        let b = new Ball(930, 70, 40, this.color)
        this.poolFigures.insert(b);

        let r = new Rect(40, 40, 60, 60, this.color);
        this.poolFigures.insert(r);

        let o = new Oval(160, 70, 35, 1, 1, this.color);
        this.poolFigures.insert(o);

        let o2 = new Oval(270, 70, 35, 1.5, 1, this.color);
        this.poolFigures.insert(o2);

        let t = new Triangle(350, 50, 80, 0, 40, 40, this.color);
        this.poolFigures.insert(t);

        let t2 = new Triangle(440, 90, 80, 0, 40, -40, this.color);
        this.poolFigures.insert(t2);

        let h = new Heart(575, 50, 75, this.color);
        this.poolFigures.insert(h);

        let u = new Bear(690, 70, 40, this.color);
        this.poolFigures.insert(u);

        let g = new Ghost(810, 70, 45, this.color);
        this.poolFigures.insert(g);

        // let s = new Spider(770, 70, 45, this.color);
        // this.poolFigures.insert(s);
    }

    drawObj(cnv) {
        for (let i = 0; i < this.poolDrawing.stuff.length; i++) {
            this.poolDrawing.stuff[i].draw(cnv);
        }
    }

    drawObj2(cnv) {
        for (let i = 0; i < this.poolFigures.stuff.length; i++) {
            this.poolFigures.stuff[i].draw(cnv);
        }
    }

    dragObj(mx, my) {
        let endpt = this.poolDrawing.stuff.length - 1;

        for (let i = endpt; i >= 0; i--) {
            if (this.poolDrawing.stuff[i].mouseOver(mx, my)) {
                this.offsetx = mx - this.poolDrawing.stuff[i].posx;
                this.offsety = my - this.poolDrawing.stuff[i].posy;
                let item = this.poolDrawing.stuff[i];
                this.thingInMotion = this.poolDrawing.stuff.length - 1;
                this.poolDrawing.stuff.splice(i, 1);
                this.poolDrawing.stuff.push(item);
                return true;
            }
        }
        return false;
    }

    moveObj(mx, my) {
        this.poolDrawing.stuff[this.thingInMotion].posx = mx - this.offsetx;
        this.poolDrawing.stuff[this.thingInMotion].posy = my - this.offsety;
    }

    removeObj() {
        this.poolDrawing.remove();
    }

    insertObj(mx, my) {
        let item = null;
        let endpt = this.poolDrawing.stuff.length - 1;

        for (let i = endpt; i >= 0; i--) {
            if (this.poolDrawing.stuff[i].mouseOver(mx, my)) {
                item = this.cloneObj(this.poolDrawing.stuff[i]);
                this.poolDrawing.insert(item);
                return true;
            }
        }
        return false;
    }

    selectObj(mx, my) {
        let item = null;
        let endpt = this.poolFigures.stuff.length - 1;

        for (let i = endpt; i >= 0; i--) {
            if (this.poolFigures.stuff[i].mouseOver(mx, my)) {
                item = this.poolFigures.stuff[i];
                this.poolFigures.stuff.splice(i, 1);
                this.poolFigures.stuff.push(item);
                return true;
            }
        }
        return false;
    }

    drawObjsel(mx, my) {
        let endpt = this.poolFigures.stuff.length - 1;
        let item = this.cloneObj(this.poolFigures.stuff[endpt]);
        item.posx = mx;
        item.posy = my;
        item.color = this.color;
        this.poolDrawing.insert(item);
    }

    cloneObj(obj) {
        let item = {};

        switch (obj.name) {
        
            case "Bl":
                item = new Ball(obj.posx + 20, obj.posy + 20, obj.s, obj.color);
                break;

            case "R":
                item = new Rect(obj.posx + 20, obj.posy + 20, obj.w, obj.h, obj.color);
                break;

            case "T":
                item = new Triangle(obj.posx + 20, obj.posy + 20, obj.p2x, obj.p2y, obj.p3x, obj.p3y, obj.color);
                break;

            case "P":
                item = new Picture(obj.posx + 20, obj.posy + 20, obj.w, obj.h, obj.impath);
                break;

            case "O":
                item = new Oval(obj.posx + 20, obj.posy + 20, obj.r, obj.hor, obj.ver, obj.color);
                break;

            case "H":
                item = new Heart(obj.posx + 20, obj.posy + 20, obj.drx * 4, obj.color);
                break;

            case "B":
                item = new Bear(obj.posx + 20, obj.posy + 20, obj.s, obj.color);
                break;

            case "G":
                item = new Ghost(obj.posx + 20, obj.posy + 20, obj.s, obj.color);
                break;

            default: throw new TypeError("Can not clone this type of object");
        }
        return item;
    }

    updateBgColor(cor) {
        this.bgcolor = cor;
    }

    updateFigColor(cor) {
        this.color = cor;
        for (let i = 0; i < this.poolFigures.stuff.length; i++) {
            this.poolFigures.stuff[i].color = cor;
        }
    }
}



class Pool {
    constructor(maxSize) {
        this.size = maxSize;
        this.stuff = [];
    }

    insert(obj) {
        if (this.stuff.length < this.size) {
            this.stuff.push(obj);
        } else {
            alert("The application is full: there isn't more memory space to include objects");
        }
    }

    remove() {
        if (this.stuff.length !== 0) {
            this.stuff.pop();
        } else {
            alert("There aren't objects in the application to delete");
        }
    }
}

