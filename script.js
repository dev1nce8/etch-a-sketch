const gridElement = document.querySelector("#grid");
const resizeButton = document.querySelector("#resize-button");

let size = 16;

// initial draw
drawGrid(size, gridElement);

// Resize
resizeButton.addEventListener("click", () => {
	size = prompt("2 - 100");
	drawGrid(size, gridElement)
})


function drawGrid(size, container) {
	container.innerHTML = "";
	for (let i = 0; i < size * size; i++) {
		const block = document.createElement("div");
		block.className = 'block';
		block.style.width = `${container.clientWidth / size}px`;
		block.style.height = `${container.clientHeight / size}px`;
		container.appendChild(block);
	}
}




