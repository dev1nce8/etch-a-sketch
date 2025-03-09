const gridElement = document.querySelector("#grid");
const resizeButton = document.querySelector("#resize-button");
const rainbowButton = document.querySelector("#rainbow-button");
const sizesButtons = document.querySelectorAll("#sizes button");

let SIZE = 16;
let rainbowMode = false;
let isMouseDown = false;

// initial draw
drawGrid(SIZE, gridElement);
// Resize
resizeButton.addEventListener("click", () => {
	// continious prompt loop until the user input value is between 2 and 100
	let s = SIZE;
	do {
		s = prompt("2 - 100");
	} while (s > 100 || s < 2);
	SIZE = s;
	drawGrid(SIZE, gridElement);
});

sizesButtons.forEach(btn => {
	btn.addEventListener("click", () => {
		SIZE = btn.dataset.value;
		drawGrid(SIZE, gridElement);
	});
});

// toggle isMouseDown
window.addEventListener("mousedown", () => {
	isMouseDown = true;
});
window.addEventListener("mouseup", () => {
	isMouseDown = false;
});

// toggle rainbow mode
rainbowButton.addEventListener("click", () => {
	rainbowMode = !rainbowMode;
});

function drawGrid(size, container) {
	container.innerHTML = "";
	const contSize = { w: container.clientWidth, h: container.clientHeight };
	for (let i = 0; i < size * size; i++) {
		const block = document.createElement("div");
		block.className = "block bordered";
		block.setAttribute("style", `width: ${contSize.w / size}px ;height: ${contSize.h / size}px; `);
		container.appendChild(block);
		block.addEventListener("mousedown", () => {
			block.style.backgroundColor = draw(block, rainbowMode);
		})
		block.addEventListener("mouseover", () => {
			if (isMouseDown) {
				block.style.backgroundColor = draw(block, rainbowMode);
			};
		});
	};
};


function draw(target, rainbowMode) {
	if (target.style.backgroundColor) {
		return darken(target.style.backgroundColor);
	}
	if (rainbowMode) {
		const r = Math.floor(Math.random() * 255);
		const g = Math.floor(Math.random() * 255);
		const b = Math.floor(Math.random() * 255);
		return `rgb(${r}, ${g}, ${b})`;
	} else {
		return `rgb(30,30,30)`;
	};
};

function darken(color) {
	// get the r,g,b values from the `rbg()` css string value 
	const splitted = color.substring(4, color.length - 1).split(", ");
	// subtract 10% of current r,b,g value
	const multiplier = 0.1;
	const r = Math.floor(+splitted[0] - (+splitted[0] * multiplier));
	const g = Math.floor(+splitted[1] - (+splitted[1] * multiplier));
	const b = Math.floor(+splitted[2] - (+splitted[2] * multiplier));

	return `rgb(${r}, ${g}, ${b})`;
};

