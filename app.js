const canvas = document.getElementById("js-canvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("js-color");
const range = document.getElementById("js-range");
const mode = document.getElementById("js-mode")
const saveBtn = document.getElementById("js-save")

const INITIAL_COLOR = "#2c2c2c";
canvas.width = 700;
canvas.height = 700;

ctx.fillStyle = "white"
ctx.fillRect(0, 0, canvas.width, canvas.height)
ctx.strokeStyle = INITIAL_COLOR
ctx.fillStyle = INITIAL_COLOR
ctx.lineWidth = 2.5;

let painting = false;
let filling = false

function stopPainting() {
    painting = false
}

function startPainting() {
    painting = true
}

function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    if (!painting) {
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else {
        ctx.lineTo(x, y);
        ctx.stroke()
    }

}

function onMouseDown(event) {
    painting = true;
}

function handleColorClick(event) {
    const color = event.target.style.backgroundColor;
    
    ctx.strokeStyle = color;;
    ctx.fillStyle = color;
}

function handleRangeChange(event) {
    const size = event.target.value
    ctx.lineWidth = size
}

function handleModeClick() {
    if (filling === true) {
        filling = false;
        mode.innerText = "Fill"
    } else {
        filling = true;
        mode.innerText = "Paint";
      
    }
}

function handleCanvasClick() {
    if (filling) {
        ctx.fillRect(0, 0, canvas.width, canvas.height)
    }
}

function handleCM(event) {
    event.preventDefault()
}

function handleSaveClick() {
const image = canvas.toDataURL("image/jpeg");
const link = document.createElement("a");
link.href = image
link.download = "PaintJS[EXPORT]";
link.click();
}



if (canvas) {
    canvas.addEventListener("mousemove", onMouseMove)
    // when you click
    canvas.addEventListener("mousedown", startPainting)
    //when you lift click
    canvas.addEventListener("mouseup", stopPainting)
    // leave the canvas
    canvas.addEventListener("mouseleave", stopPainting)
    canvas.addEventListener("click", handleCanvasClick)
    canvas.addEventListener("contextmenu", handleCM)
}

Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick))

if (range) {
    range.addEventListener("input", handleRangeChange)

}

if (mode) {
    mode.addEventListener("click", handleModeClick)
}

if (saveBtn) {
    saveBtn.addEventListener("click", handleSaveClick)
}