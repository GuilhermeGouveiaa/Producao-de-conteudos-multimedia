class DrawingObjects {
    constructor(px, py, name) {
        if (this.constructor === DrawingObjects) {
            // Error Type 1. Abstract class can not be constructed.
            throw new TypeError("Can not construct abstract class.");
        }

        //else (called from child)
        // Check if all instance methods are implemented.
        if (this.draw === DrawingObjects.prototype.draw) {
            // Error Type 4. Child has not implemented this abstract method.
            throw new TypeError("Please implement abstract method draw.");
        }

        if (this.mouseOver === DrawingObjects.prototype.mouseOver) {
            // Error Type 4. Child has not implemented this abstract method.
            throw new TypeError("Please implement abstract method mouseOver.");
        }

        this.posx = px;
        this.posy = py;
        this.name = name;
    }

    draw(cnv) {
        // Error Type 6. The child has implemented this method but also called `super.foo()`.
        throw new TypeError("Do not call abstract method draw from child.");
    }

    mouseOver(mx, my) {
        // Error Type 6. The child has implemented this method but also called `super.foo()`.
        throw new TypeError("Do not call abstract method mouseOver from child.");
    }


    sqDist(p1x, p1y, p2x, p2y) {
        let xd = p1x - p2x;
        let yd = p1y - p2y;

        return ((xd * xd) + (yd * yd));
    }
}

class Rect extends DrawingObjects {
    constructor(px, py, w, h, c) {
        super(px, py, 'R');
        this.w = w;
        this.h = h;
        this.color = c;
    }

    draw(cnv) {
        let ctx = cnv.getContext("2d");
        ctx.save();
        ctx.fillStyle = this.color;
        ctx.fillRect(this.posx, this.posy, this.w, this.h);
        ctx.restore();
    }

    mouseOver(mx, my) {
        return ((mx >= this.posx) && (mx <= (this.posx + this.w))
            && (my >= this.posy) && (my <= (this.posy + this.h)));
    }
}

class Triangle extends DrawingObjects {
    constructor(p1x, p1y, p2x, p2y, p3x, p3y, c) {
        super(p1x, p1y, 'T');
        this.point1 = { x: p1x, y: p1y };
        this.point2 = { x: p1x + p2x, y: p1y + p2y };
        this.point3 = { x: p1x + p3x, y: p1y + p3y };
        this.p2x = p2x;
        this.p2y = p2y;
        this.p3x = p3x;
        this.p3y = p3y;
        this.color = c;
    }

    mouseOver(px, py) {
        let p1x = this.point1.x;
        let p1y = this.point1.y;

        let p2x = this.point2.x;
        let p2y = this.point2.y;

        let p3x = this.point3.x;
        let p3y = this.point3.y;

        let alpha = ((p2y - p3y) * (px - p3x) + (p3x - p2x) * (py - p3y)) /
            ((p2y - p3y) * (p1x - p3x) + (p3x - p2x) * (p1y - p3y));

        let beta = ((p3y - p1y) * (px - p3x) + (p1x - p3x) * (py - p3y)) /
            ((p2y - p3y) * (p1x - p3x) + (p3x - p2x) * (p1y - p3y));

        let gamma = 1.0 - alpha - beta;

        let ta = 0 < alpha && alpha < 1;
        let tb = 0 < beta && beta < 1;
        let tg = 0 < gamma && gamma < 1;

        return ta && tb && tg;
    }

    draw(cnv) {
        let ctx = cnv.getContext("2d");

        this.point1.x = this.posx;
        this.point1.y = this.posy;
        
        this.point2.x = this.posx + this.p2x;
        this.point2.y = this.posy + this.p2y;
        
        this.point3.x = this.posx + this.p3x;
        this.point3.y = this.posy + this.p3y;

        ctx.save();
        ctx.beginPath();
        ctx.moveTo(this.point1.x, this.point1.y);
        ctx.lineTo(this.point2.x, this.point2.y);
        ctx.lineTo(this.point3.x, this.point3.y);
        ctx.closePath()
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.restore();
    }
}

class Oval extends DrawingObjects {
    constructor(px, py, r, hs, vs, c) {
        super(px, py, 'O');
        this.r = r;
        this.radsq = r * r;
        this.hor = hs;
        this.ver = vs;
        this.color = c;
    }

    mouseOver(mx, my) {
        let x1 = 0;
        let y1 = 0;
        let x2 = (mx - this.posx) / this.hor;
        let y2 = (my - this.posy) / this.ver;

        return (this.sqDist(x1, y1, x2, y2) <= (this.radsq));
    }

    draw(cnv) {
        let ctx = cnv.getContext("2d");

        ctx.save();
        ctx.translate(this.posx, this.posy);
        ctx.scale(this.hor, this.ver);
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(0, 0, this.r, 0, 2 * Math.PI, true);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
    }
}

class Heart extends DrawingObjects {
    constructor(px, py, w, c) {
        super(px, py, 'H');
        this.h = w * 0.7;
        this.drx = w / 4;
        this.radsq = this.drx * this.drx;
        this.ang = .25 * Math.PI;
        this.color = c;
    }

    outside(x, y, w, h, mx, my) {
        return ((mx < x) || (mx > (x + w)) || (my < y) || (my > (y + h)));
    }

    draw(cnv) {
        let leftctrx = this.posx - this.drx;
        let rightctrx = this.posx + this.drx;
        let cx = rightctrx + this.drx * Math.cos(this.ang);
        let cy = this.posy + this.drx * Math.sin(this.ang);
        let ctx = cnv.getContext("2d");

        ctx.save();
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.moveTo(this.posx, this.posy);
        ctx.arc(leftctrx, this.posy, this.drx, 0, Math.PI - this.ang, true);
        ctx.lineTo(this.posx, this.posy + this.h);
        ctx.lineTo(cx, cy);
        ctx.arc(rightctrx, this.posy, this.drx, this.ang, Math.PI, true);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
    }

    mouseOver(mx, my) {
        let leftctrx = this.posx - this.drx;
        let rightctrx = this.posx + this.drx;
        let qx = this.posx - 2 * this.drx;
        let qy = this.posy - this.drx;
        let qwidth = 4 * this.drx;
        let qheight = this.drx + this.h;

        let x2 = this.posx;
        let y2 = this.posy + this.h;
        let m = (this.h) / (2 * this.drx);

        //quick test if it is in bounding rectangle
        if (this.outside(qx, qy, qwidth, qheight, mx, my)) {
            return false;
        }

        //compare to two centers
        if (this.sqDist(mx, my, leftctrx, this.posy) < this.radsq) return true;
        if (this.sqDist(mx, my, rightctrx, this.posy) < this.radsq) return true;

        // if outside of circles AND less than equal to y, return false
        if (my <= this.posy) return false;

        // compare to each slope
        // left side
        if (mx <= this.posx) {
            return (my < (m * (mx - x2) + y2));
        } else {  //right side
            m = -m;
            return (my < (m * (mx - x2) + y2));
        }
    }
}

class Picture extends DrawingObjects {
    constructor(px, py, w, h, impath) {
        super(px, py, 'P');
        this.w = w;
        this.h = h;
        this.impath = impath;
        this.imgobj = new Image();
        this.imgobj.src = this.impath;
    }

    draw(cnv) {
        let ctx = cnv.getContext("2d");

        if (this.imgobj.complete) {
            ctx.drawImage(this.imgobj, this.posx, this.posy, this.w, this.h);
            console.log("Debug: N Time");

        } else {
            console.log("Debug: First Time");
            let self = this;
            this.imgobj.addEventListener('load', function () {
                ctx.drawImage(self.imgobj, self.posx, self.posy, self.w, self.h);
            }, false);
        }
    }

    mouseOver(mx, my) {
        return ((mx >= this.posx) && (mx <= (this.posx + this.w)) && (my >= this.posy) && (my <= (this.posy + this.h)));
    }
}

class Bear extends DrawingObjects {
    constructor(px, py, s, c) {
        super(px, py, 'B');
        this.s = s;
        this.color = c;
    }

    mouseOver(mx, my) {
        let px = this.posx;
        let py = this.posy;
        let s = this.s;
        let c = this.color;

        let ear1 = new Oval(px - s * 0.7, py - s * 0.7, s / 1.8, 1, 1, c);
        let ear2 = new Oval(px + s * 0.7, py - s * 0.7, s / 1.8, 1, 1, c);
        let head = new Oval(px, py, s, 1, 1, c);

        return ear1.mouseOver(mx, my) || ear2.mouseOver(mx, my) || head.mouseOver(mx, my);
    }

    draw(cnv) {
        let ctx = cnv.getContext("2d");

        let px = this.posx;
        let py = this.posy;
        let s = this.s;
        let c = this.color;

        ctx.save();
        let ear1 = new Oval(px - s * 0.7, py - s * 0.7, s / 1.8, 1, 1, c);
        ear1.draw(cnv);
        let ear2 = new Oval(px + s * 0.7, py - s * 0.7, s / 1.8, 1, 1, c);
        ear2.draw(cnv);
        let ear3 = new Oval(px - s * 0.7, py - s * 0.7, s / 3.8, 1, 1, "pink");
        ear3.draw(cnv);
        let ear4 = new Oval(px + s * 0.7, py - s * 0.7, s / 3.8, 1, 1, "pink");
        ear4.draw(cnv);

        let head = new Oval(px, py, s, 1, 1, c);
        head.draw(cnv);

        let nose1 = new Oval(px, py + s / 5.5, s / 5.5, 1.7, 1.2, "black");
        nose1.draw(cnv);
        let nose2 = new Oval(px - s * 0.18, py + s * 0.1, s / 20, 1, 1, "white");
        nose2.draw(cnv);

        let eye1 = new Oval(px - s * 0.4, py - s * 0.3, s / 6, 1, 1, "black");
        eye1.draw(cnv);
        let eye2 = new Oval(px + s * 0.4, py - s * 0.3, s / 6, 1, 1, "black");
        eye2.draw(cnv);
        let eye3 = new Oval(px - s * 0.45, py - s * 0.35, s / 24, 1, 1, "white");
        eye3.draw(cnv);
        let eye4 = new Oval(px + s * 0.35, py - s * 0.35, s / 24, 1, 1, "white");
        eye4.draw(cnv);

        let x = this.posx;
        let y = this.posy + this.s / 2.7;

        ctx.strokeStyle = "black";
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.quadraticCurveTo(x + this.s / 3, y + this.s / 3, x + this.s * 0.6, y);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.quadraticCurveTo(x - this.s / 3, y + this.s / 3, x - this.s * 0.6, y);
        ctx.stroke();

        ctx.restore();
    }
}

class Ghost extends DrawingObjects {
    constructor(px, py, s, c) {
        super(px, py, 'G');
        this.s = s;
        this.color = c;
    }

    mouseOver(mx, my) {
        let px = this.posx;
        let py = this.posy;
        let s = this.s;
        let c = this.color;

        let head = new Oval(px, py-s/2, s, 1, 1/1.7, c);
        
        let body = new Rect(px-s, py-s/2, 2*s, s, c);
        
        let x = px + s;
        let y = py + s/2;
        let leg1 = new Triangle(x, y, 0, s/4, -(s/3), 0, c);
        
        x = x - (s/3);
        let leg2 = new Triangle(x, y, -(s/3), s/4, -2*(s/3), 0, c);
        
        x = px - s;
        y = py + s/2;
        let leg3 = new Triangle(x, y, 0, s/4, (s/3), 0, c);
        
        x = x + (s/3);
        let leg4 = new Triangle(x, y, (s/3), s/4, 2*(s/3), 0, c);

        return head.mouseOver(mx, my) || body.mouseOver(mx, my) || 
            leg1.mouseOver(mx, my) || leg2.mouseOver(mx, my) || 
            leg3.mouseOver(mx, my) || leg4.mouseOver(mx, my);
    }

    draw(cnv) {
        let ctx = cnv.getContext("2d");

        let px = this.posx;
        let py = this.posy;
        let s = this.s;
        let c = this.color;

        ctx.save();

        let head = new Oval(px, py-s/2, s, 1, 1/1.7, c);
        head.draw(cnv);
        
        let body = new Rect(px-s, py-s/2, 2*s, s+1, c);
        body.draw(cnv);
        
        let x = px + s;
        let y = py + s/2;
        let leg1 = new Triangle(x, y, 0, s/4, -(s/3), 0, c);
        leg1.draw(cnv);
        
        x = x - (s/3);
        let leg2 = new Triangle(x, y, -(s/3), s/4, -2*(s/3), 0, c);
        leg2.draw(cnv);
        
        x = px - s;
        y = py + s/2;
        let leg3 = new Triangle(x, y, 0, s/4, (s/3), 0, c);
        leg3.draw(cnv);
        
        x = x + (s/3);
        let leg4 = new Triangle(x, y, (s/3), s/4, 2*(s/3), 0, c);
        leg4.draw(cnv);
        
        
        let eye1 = new Oval(px - s * 0.4, py - s * 0.3, s / 4, 1, 1, "white");
        eye1.draw(cnv);
        let eye2 = new Oval(px + s * 0.4, py - s * 0.3, s / 4, 1, 1, "white");
        eye2.draw(cnv);
        let eye3 = new Oval(px - s * 0.45, py - s * 0.35, s / 24, 1, 1, "black");
        eye3.draw(cnv);
        let eye4 = new Oval(px + s * 0.35, py - s * 0.35, s / 24, 1, 1, "black");
        eye4.draw(cnv);
        
        ctx.restore();
    }
}

class Ball extends DrawingObjects{
    constructor(px, py, s, c) {
        super(px, py, 'Bl');
        this.s = s;
        this.color = c;
    }

    draw(cnv) {
        let ctx = cnv.getContext("2d");

        let px = this.posx;
        let py = this.posy;
        let s = this.s;
        let c = this.color;

        ctx.save();
        

        let bola2 = new Oval(px, py, s+1, 1, 1,"black");
        bola2.draw(cnv);
        let bola = new Oval(px, py, s, 1, 1, c);
        bola.draw(cnv);
        let tr1 = new Triangle(px , py - s * 0.3, -s * 0.3, s * 0.3, s * 0.3, s * 0.3, "black");
        tr1.draw(cnv);
        let tr2 = new Triangle(px - s * 0.15, py + s * 0.3, -s * 0.15, -s * 0.3, s * 0.15, -s * 0.3, "black");
        tr2.draw(cnv);
        let tr3 = new Triangle(px - s * 0.15, py + s * 0.3, s * 0.15, -s * 0.6, s * 0.3, 0, "black");
        tr3.draw(cnv);
        let tr4 = new Triangle(px + s * 0.15, py + s * 0.3, -s * 0.15, -s * 0.3, s * 0.15, -s * 0.3, "black");
        tr4.draw(cnv);
        
        ctx.fillStyle = "black";
        ctx.moveTo(px, py - s * 0.3);
        ctx.lineTo(px, py - s * 0.7);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(px, py - s * 0.7);
        ctx.lineTo(px - s *0.3, py - s*0.95);
        ctx.quadraticCurveTo(px, py - s - 4, px + s *0.3, py - s*0.95);
        ctx.fill();
 
        ctx.moveTo(px + s*0.3, py);
        ctx.lineTo(px + s*0.7, py-s*0.2);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(px + s*0.7, py-s*0.2);
        ctx.lineTo(px + s *0.88, py - s*0.5);
        ctx.quadraticCurveTo(px+s+3, py, px + s *0.98, py);
        ctx.fill();

        ctx.moveTo(px - s*0.3, py);
        ctx.lineTo(px - s*0.7, py-s*0.2);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(px - s*0.7, py-s*0.2);
        ctx.lineTo(px - s *0.88, py - s*0.5);
        ctx.quadraticCurveTo(px-s-3, py, px - s *0.98, py);
        ctx.fill();

        ctx.moveTo(px - s * 0.15, py + s * 0.3);
        ctx.lineTo(px - s *0.35, py + s *0.7);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(px - s *0.35, py + s *0.7);
        ctx.lineTo(px - s *0.74, py + s *0.7);
        ctx.quadraticCurveTo(px-s*0.5, py+s*0.93, px - s *0.15, py+s);
        ctx.fill();

        ctx.moveTo(px + s * 0.15, py + s * 0.3);
        ctx.lineTo(px + s *0.4, py + s *0.7);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(px + s *0.4, py + s *0.7);
        ctx.lineTo(px + s *0.74, py + s *0.7);
        ctx.quadraticCurveTo(px+s*0.5, py+s*0.93, px + s *0.25, py+s);
        ctx.fill();


        ctx.restore();
    }

    mouseOver(mx, my) {
        let px = this.posx;
        let py = this.posy;
        let s = this.s;
        let c = this.color;

        let bola = new Oval(px, py, s+1, 1, 1, c);

        return bola.mouseOver(mx, my);
    }
}