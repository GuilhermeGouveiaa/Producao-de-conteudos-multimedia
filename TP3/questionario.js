function validateForm() {

    let data = new Date();
    let xmlRowString = "<Questionario>";
    let Rq1 = document.forms["caracterizacao"]["idade"].value;
    xmlRowString += '<q id="C1">' + Rq1 + '</q>';
    let Rq2 = document.forms["caracterizacao"]["sexo"].value;
    xmlRowString += '<q id="C2">' + Rq2 + '</q>';
    let Rq3 = document.forms["caracterizacao"]["internet"].value;
    xmlRowString += '<q id="C3">' + Rq3 + '</q>';
    let Rq4a = document.forms["caracterizacao"]["web1"].value;
    if (Rq4a != "0") {
        xmlRowString += '<q id="C4 - Chrome">' + Rq4a + '</q>';
    }
    let Rq4b = document.forms["caracterizacao"]["web2"].value;
    if (Rq4b != "0") {
        xmlRowString += '<q id="C4 - Firefox">' + Rq4b + '</q>';
    }
    let Rq4c = document.forms["caracterizacao"]["web3"].value;
    if (Rq4c != "0") {
        xmlRowString += '<q id="C4 - Internet Explorer">' + Rq4c + '</q>';
    }
    let Rq4d = document.forms["caracterizacao"]["web4"].value;
    if (Rq4d != "0") {
        xmlRowString += '<q id="C4 - Opera">' + Rq4d + '</q>';
    }
    let Rq4e = document.forms["caracterizacao"]["web5"].value;
    if (Rq4e != "0") {
        xmlRowString += '<q id="C4 - Safari">' + Rq4e + '</q>';
    }
    let Rq5 = document.forms["caracterizacao"]["pesquisa"].value;
    xmlRowString += '<q id="C5">' + Rq5 + '</q>';
    let Rq6 = document.forms["caracterizacao"]["quais"].value;
    xmlRowString += '<q id="C6">' + Rq6 + '</q>';


    window.localStorage.setItem(data, xmlRowString);
    window.localStorage.setItem("CurrentKey", data);

    return false;

}

function checkBrowser(elemento) {
    let opcao1 = document.getElementById("Chrome");
    let opcao2 = document.getElementById("Firefox");
    let opcao3 = document.getElementById("InternetE");
    let opcao4 = document.getElementById("Opera");
    let opcao5 = document.getElementById("Safari");
    if ((elemento.id.localeCompare("Chrome") !== 0) && (elemento.value == opcao1.value) && (elemento.value != 0)) {
        opcao1.value = "";
    }
    if ((elemento.id.localeCompare("Firefox") !== 0) && (elemento.value == opcao2.value) && (elemento.value != 0)) {
        opcao2.value = "";
    }
    if ((elemento.id.localeCompare("InternetE") !== 0) && (elemento.value == opcao3.value) && (elemento.value != 0)) {
        opcao3.value = "";
    }
    if ((elemento.id.localeCompare("Opera") !== 0) && (elemento.value == opcao4.value) && (elemento.value != 0)) {
        opcao4.value = "";
    }
    if ((elemento.id.localeCompare("Safari") !== 0) && (elemento.value == opcao5.value) && (elemento.value != 0)) {
        opcao5.value = "";
    }
}

function checkBrowser2() {
    let opcao1 = document.getElementById("Chrome");
    let opcao2 = document.getElementById("Firefox");
    let opcao3 = document.getElementById("InternetE");
    let opcao4 = document.getElementById("Opera");
    let opcao5 = document.getElementById("Safari");
    let contador = 0;
    if (opcao1.value == 1 || opcao1.value == 2 || opcao1.value == 3) {
        contador++;
    }
    if (opcao2.value == 1 || opcao2.value == 2 || opcao2.value == 3) {
        contador++;
    }
    if (opcao3.value == 1 || opcao3.value == 2 || opcao3.value == 3) {
        contador++;
    }
    if (opcao4.value == 1 || opcao4.value == 2 || opcao4.value == 3) {
        contador++;
    }
    if (opcao5.value == 1 || opcao5.value == 2 || opcao5.value == 3) {
        contador++;
    }

    if (contador == 3) {
        opcao1.removeAttribute("required");
        opcao2.removeAttribute("required");
        opcao3.removeAttribute("required");
        opcao4.removeAttribute("required");
        opcao5.removeAttribute("required");
    }
}

function Write_Text() {
    let x = document.forms["caracterizacao"]["pesquisa"].value;
    if (x == "Não") {
        document.forms["caracterizacao"]["quais"].disabled = true;
        document.forms["caracterizacao"]["quais"].value = "";
    } else {
        document.forms["caracterizacao"]["quais"].disabled = false;
    }
}

function validateTarefas() {
    let data = getLastKey();
    let xmlRowString = window.localStorage.getItem(data);
    let Rq7 = document.forms["tarefas"]["tarefa1"].value;
    xmlRowString += '<q id="t1">' + Rq7 + '</q>';
    let Rq8 = document.forms["tarefas"]["tarefa2"].value;
    xmlRowString += '<q id="t2">' + Rq8 + '</q>';
    let Rq9 = document.forms["tarefas"]["tarefa3"].value;
    xmlRowString += '<q id="t3">' + Rq9 + '</q>';
    let Rq10 = document.forms["tarefas"]["tarefa4"].value;
    xmlRowString += '<q id="t4">' + Rq10 + '</q>';
    let Rq11 = document.forms["tarefas"]["tarefa5"].value;
    xmlRowString += '<q id="t5">' + Rq11 + '</q>';

    window.localStorage.setItem(data, xmlRowString);
    window.localStorage.setItem("CurrentKey", data);

    return false;
}

function validate_avaliação() {
    let data = getLastKey();
    let xmlRowString = window.localStorage.getItem(data);
    let Rq121 = document.forms["avaliacao_global"]["adjetivo1"].value;
    xmlRowString += '<q id="av1">' + Rq121 + '</q>';
    let Rq122 = document.forms["avaliacao_global"]["adjetivo2"].value;
    xmlRowString += '<q id="av2">' + Rq122 + '</q>';
    let Rq123 = document.forms["avaliacao_global"]["adjetivo3"].value;
    xmlRowString += '<q id="av3">' + Rq123 + '</q>';
    let Rq124 = document.forms["avaliacao_global"]["adjetivo4"].value;
    xmlRowString += '<q id="av4">' + Rq124 + '</q>';
    let Rq13 = document.forms["avaliacao_global"]["avcategoria"].value;
    xmlRowString += '<q id="av5">' + Rq13 + '</q>';
    let Rq14 = document.forms["avaliacao_global"]["avcor"].value;
    xmlRowString += '<q id="av6">' + Rq14 + '</q>';
    let Rq15 = document.forms["avaliacao_global"]["avr"].value;
    xmlRowString += '<q id="av7">' + Rq15 + '</q>';
    let Rq16 = document.forms["avaliacao_global"]["avu"].value;
    xmlRowString += '<q id="av8">' + Rq16 + '</q>';
    let Rq17 = document.forms["avaliacao_global"]["avs"].value;
    xmlRowString += '<q id="av9">' + Rq17 + '</q>';
    let Rq18 = document.forms["avaliacao_global"]["avd"].value;
    xmlRowString += '<q id="av10">' + Rq18 + '</q>';


    window.localStorage.setItem(data, xmlRowString);
    window.localStorage.removeItem("CurrentKey");

    return false;
}

function getLastKey() {

    let data = window.localStorage.getItem("CurrentKey");
    return data;
}

var NC1 = [0, 0, 0, 0, 0];
var NC17 = [0, 0, 0, 0, 0];

function getdataForm() {

    let todo_index = window.localStorage.length;
    let xmlDoc;

    for (let i = 0; i < todo_index; i++) {
        document.write("<br><h2><mark><b>Utilizador " + (i + 1) + "</mark></b></h2> <br>");
        let localStorageRow = window.localStorage.getItem(window.localStorage.key(i));
        if (window.DOMParser){
            let parser = new DOMParser();
            xmlDoc = parser.parseFromString(localStorageRow, "text/xml");
            console.log(xmlDoc);
            
        }
        let x = xmlDoc.getElementsByTagName("q");
        console.log(x);
        for (let index = 0; index < (x.length); index++) {

            if (index == 0) {
                try {
                    switch (x[index].childNodes[0].nodeValue) {
                        case "menor 18":
                            NC1[0]++;
                            break;
                        case "18-25":
                            NC1[1]++;
                            break;
                        case "26-33":
                            NC1[2]++;
                            break;
                        case "34-40":
                            NC1[3]++;
                            break;
                        case "maior 40":
                            NC1[4]++;
                            break;
                    }
                } catch (error) {
                }
            }
            if (index == 24) {
                try {
                    switch (x[index].childNodes[0].nodeValue) {
                        case "1":
                            NC17[0]++;
                            break;
                        case "2":
                            NC17[1]++;
                            break;
                        case "3":
                            NC17[2]++;
                            break;
                        case "4":
                            NC17[3]++;
                            break;
                        case "5":
                            NC17[4]++;
                            break;
                    }
                } catch (error) {
                }
            }
            let y = x[index].id;

            try {
                document.write("<p>" + y + ": " + x[index].childNodes[0].nodeValue + "</p>")
            } catch (error) {
                document.write("<p>" + y + ": Nao respondeu" + "</p>");
            }
        }
    }

    document.write("</section>");
    document.write("</div>");

    return true;
}

function clearLocalStorage() {
    window.localStorage.clear();
}



function anychart() {
    
    let ctx = document.querySelector("canvas").getContext("2d");
    const results = [
        { mood: "<18", total: NC1[0], shade: "#0a9627" },
        { mood: "18-25", total: NC1[1], shade: "#960A2C" },
        { mood: "26-33", total: NC1[2], shade: "#332E2E" },
        { mood: "34-40", total: NC1[3], shade: "#F73809" },
        { mood: ">40", total: NC1[4], shade: "#3574F2" }
    ];

    let sum = 0;
    let totalNumberOfPeople = results.reduce((sum, { total }) => sum + total, 0);
    let currentAngle = 0;

    for (let moodValue of results) {
        let portionAngle = (moodValue.total / totalNumberOfPeople) * 2 * Math.PI;
        ctx.beginPath();
        ctx.arc(100, 100, 100, currentAngle, currentAngle + portionAngle);
        currentAngle += portionAngle;
        ctx.lineTo(100, 100);
        ctx.fillStyle = moodValue.shade;
        ctx.fill();

    };

    
}


function chart2() {
    var myCanvas = document.getElementById("myCanvas");
    myCanvas.width = 400;
    myCanvas.height = 400;

    var ctx = myCanvas.getContext("2d");

    function drawLine(ctx, startX, startY, endX, endY, color) {
        ctx.save();
        ctx.strokeStyle = color;
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.stroke();
        ctx.restore();
    }

    function drawBar(
        ctx,
        upperLeftCornerX,
        upperLeftCornerY,
        width,
        height,
        color
    ) {
        ctx.save();
        ctx.fillStyle = color;
        ctx.fillRect(upperLeftCornerX, upperLeftCornerY, width, height);
        ctx.restore();
    }

    class BarChart {
        constructor(options) {
            this.options = options;
            this.canvas = options.canvas;
            this.ctx = this.canvas.getContext("2d");
            this.colors = options.colors;
            this.titleOptions = options.titleOptions;
            this.maxValue = Math.max(...Object.values(this.options.data));
        }

        drawGridLines() {
            var canvasActualHeight = this.canvas.height - this.options.padding * 2;
            var canvasActualWidth = this.canvas.width - this.options.padding * 2;

            var gridValue = 0;
            while (gridValue <= this.maxValue) {
                var gridY =
                    canvasActualHeight * (1 - gridValue / this.maxValue) +
                    this.options.padding;
                drawLine(
                    this.ctx,
                    0,
                    gridY,
                    this.canvas.width,
                    gridY,
                    this.options.gridColor
                );

                drawLine(
                    this.ctx,
                    15,
                    this.options.padding / 2,
                    15,
                    gridY + this.options.padding / 2,
                    this.options.gridColor
                );

                // Writing grid markers
                this.ctx.save();
                this.ctx.fillStyle = this.options.gridColor;
                this.ctx.textBaseline = "bottom";
                this.ctx.font = "bold 10px Arial";
                this.ctx.fillText(gridValue, 0, gridY - 2);
                this.ctx.restore();

                gridValue += this.options.gridStep;
            }
        }

        drawBars() {
            var canvasActualHeight = this.canvas.height - this.options.padding * 2;
            var canvasActualWidth = this.canvas.width - this.options.padding * 2;

            var barIndex = 0;
            var numberOfBars = Object.keys(this.options.data).length;
            var barSize = canvasActualWidth / numberOfBars;

            var values = Object.values(this.options.data);
            for (let val of values) {
                var barHeight = Math.round((canvasActualHeight * val) / this.maxValue);
                console.log(barHeight);

                drawBar(
                    this.ctx,
                    this.options.padding + barIndex * barSize,
                    this.canvas.height - barHeight - this.options.padding,
                    barSize,
                    barHeight,
                    this.colors[barIndex % this.colors.length]
                );

                barIndex++;
            }
        }

        drawLabel() {
            this.ctx.save();

            this.ctx.textBaseline = "bottom";
            this.ctx.textAlign = this.titleOptions.align;
            this.ctx.fillStyle = this.titleOptions.fill;
            this.ctx.font = `${this.titleOptions.font.weight} ${this.titleOptions.font.size} ${this.titleOptions.font.family}`;

            let xPos = this.canvas.width / 2;

            if (this.titleOptions.align == "left") {
                xPos = 10;
            }
            if (this.titleOptions.align == "right") {
                xPos = this.canvas.width - 10;
            }

            this.ctx.fillText(this.options.seriesName, xPos, this.canvas.height);

            this.ctx.restore();
        }



        draw() {
            this.drawGridLines();
            this.drawBars();
            this.drawLabel();
        }
    }

    var myBarchart = new BarChart({
        canvas: myCanvas,
        seriesName: "Pergunta 17",
        padding: 40,
        gridStep: 1,
        gridColor: "black",
        data: {
            "1": NC17[0],
            "2": NC17[1],
            "3": NC17[2],
            "4": NC17[3],
            "5": NC17[4]
        },
        colors: ["#3574F2", "#F73809", "#332E2E", "#960A2C", "#0a9627"],
        titleOptions: {
            align: "center",
            fill: "black",
            font: {
                weight: "bold",
                size: "18px",
                family: "Lato"
            }
        }
    });

    myBarchart.draw();
}




