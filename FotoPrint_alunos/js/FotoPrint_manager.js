'use strict';

let app = null;
let backgroundColor = "grey";

function main() {
    let cnv = document.getElementById('canvas');

    app = new FotoPrint(100, 9);

    clearCanvas();
    app.initCanvas1();
    app.drawObj(cnv);
    cnv.addEventListener('mousedown', drag, false);
    cnv.addEventListener('dblclick', makenewitem, false);

    cnv = document.getElementById('canvas2');
    clearCanvas2();
    cnv.addEventListener('click', selectObj, false);
    app.initCanvas2();
    app.drawObj2(cnv);
}

function clearCanvas() {
    let cnv = document.getElementById('canvas');
    let ctx = cnv.getContext("2d");

    ctx.fillStyle = app.bgcolor;
    ctx.fillRect(0, 0, cnv.width, cnv.height);
    app.drawObj(cnv)
}

function clearCanvas2() {
    let cnv = document.getElementById('canvas2');
    let ctx = cnv.getContext("2d");

    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, cnv.width, cnv.height);
    app.drawObj2(cnv)
}

//Drag & Drop operation
//drag
function drag(ev) {
    let mx = null;
    let my = null;
    let cnv = document.getElementById('canvas');

    let xPos = 0;
    let yPos = 0;
    [xPos, yPos] = getMouseCoord(cnv);
    mx = ev.x - xPos;
    my = ev.y - yPos;

    if (app.dragObj(mx, my)) {
        cnv.style.cursor = "pointer";
        cnv.addEventListener('mousemove', move, false);
        cnv.addEventListener('mouseup', drop, false);
    }

    cnv = document.getElementById('canvas2');
    app.drawObj2(cnv);
}

//Drag & Drop operation
//move
function move(ev) {
    let mx = null;
    let my = null;
    let cnv = document.getElementById('canvas');

    let xPos = 0;
    let yPos = 0;
    [xPos, yPos] = getMouseCoord(cnv);
    mx = ev.x - xPos;
    my = ev.y - yPos;

    app.moveObj(mx, my);
    clearCanvas();
    app.drawObj(cnv);
}

//Drag & Drop operation
//drop
function drop() {
    let cnv = document.getElementById('canvas');

    cnv.removeEventListener('mousemove', move, false);
    cnv.removeEventListener('mouseup', drop, false);
    cnv.style.cursor = "crosshair";
}

//Insert a new Object on Canvas
//dblclick Event
function makenewitem(ev) {
    let mx = null;
    let my = null;
    let cnv = document.getElementById('canvas');

    let xPos = 0;
    let yPos = 0;
    [xPos, yPos] = getMouseCoord(cnv);
    mx = ev.x - xPos;
    my = ev.y - yPos;

    if (!app.insertObj(mx, my)) {
        app.drawObjsel(mx, my);
        clearCanvas();
    }

    app.drawObj(cnv);
}

//select a Object on Canvas
//click Event
function selectObj(ev) {
    let mx = null;
    let my = null;
    let cnv = document.getElementById('canvas2');

    let xPos = 0;
    let yPos = 0;
    [xPos, yPos] = getMouseCoord(cnv);
    mx = ev.x - xPos;
    my = ev.y - yPos;

    app.selectObj(mx, my)

    // if () {
    //     clearCanvas2();
    //     app.drawObj2(cnv);
    // }
}

//Delete button
//Onclick Event
function remove() {
    let cnv = document.getElementById('canvas');

    app.removeObj();
    clearCanvas();
    app.drawObj(cnv);
}

//Save button
//Onclick Event
function saveasimage() {
    try {
        window.open(document.getElementById('canvas').toDataURL("imgs/png"));
    }
    catch (err) {
        alert("You need to change browsers OR upload the file to a server.");
    }
}


//Mouse Coordinates for all browsers
function getMouseCoord(el) {
    let xPos = 0;
    let yPos = 0;

    while (el) {
        if (el.tagName === "BODY") {
            // deal with browser quirks with body/window/document and page scroll
            let xScroll = el.scrollLeft || document.documentElement.scrollLeft;
            let yScroll = el.scrollTop || document.documentElement.scrollTop;

            xPos += (el.offsetLeft - xScroll + el.clientLeft);
            yPos += (el.offsetTop - yScroll + el.clientTop);
        } else {
            // for all other non-BODY elements
            xPos += (el.offsetLeft - el.scrollLeft + el.clientLeft);
            yPos += (el.offsetTop - el.scrollTop + el.clientTop);
        }

        el = el.offsetParent;
    }
    return [xPos, yPos];
}

function updateBgColor(cor) {
    app.updateBgColor(cor);
    clearCanvas()
}

function updateFigColor(cor) {
    let cnv = document.getElementById('canvas2');
    app.updateFigColor(cor);
    clearCanvas2();
}