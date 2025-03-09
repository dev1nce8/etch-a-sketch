const gridElement = document.querySelector("#grid");
const rainbowButton = document.querySelector("#rainbow-button");
const sizesButtons = document.querySelectorAll("#sizes button");
const clearButton = document.querySelector("#clear-button");

let SIZE = 16;
const MODES = {
	rainbowMode: false, draw: false, erase: false,
}

/*
 * INITIAL DRAW 
 * */
drawGrid(SIZE, gridElement);

/*
 * SIZE BUTTONS 
 * */
sizesButtons.forEach(btn => {
	btn.addEventListener("click", () => {
		SIZE = btn.dataset.value;
		drawGrid(SIZE, gridElement);
	});
});

/* 
 * MODES modifier
 * */

// disable the context menu when pressing the right-click mouse button
window.addEventListener("contextmenu", (e) => e.preventDefault())

window.addEventListener("mousedown", (e) => {
	if (e.button === 0) {
		MODES.draw = true;
	} else if (e.button === 2) {
		MODES.draw = true;
		MODES.erase = true;
	};
});
window.addEventListener("mouseup", () => {
	MODES.draw = false;
	MODES.erase = false;
});

rainbowButton.addEventListener("click", () => {
	MODES.rainbowMode = !MODES.rainbowMode;
});

clearButton.addEventListener("click", () => {
	clearGrid(gridElement);
})

/*
 * FUNCTION 
 * */

function drawGrid(size, container) {
	container.innerHTML = "";
	const contSize = { w: container.clientWidth, h: container.clientHeight };
	for (let i = 0; i < size * size; i++) {
		const block = document.createElement("div");
		block.className = "block bordered";
		block.setAttribute("style", `width: ${contSize.w / size}px ;height: ${contSize.h / size}px; `);
		container.appendChild(block);
		block.addEventListener("mousedown", (e) => {
			if (e.button === 0) {
				block.style.backgroundColor = draw(block, MODES.rainbowMode);
			} else if (e.button === 2) {
				block.style.backgroundColor = "";
			};
		});
		block.addEventListener("mouseover", () => {
			if (MODES.draw) {
				if (MODES.erase) {
					block.style.backgroundColor = "";
				} else {
					block.style.backgroundColor = draw(block, MODES.rainbowMode);
				};
			};
		});
	};
};

function clearGrid(gridElement) {
	gridElement.childNodes.forEach(block => block.style.backgroundColor = "");
}

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
