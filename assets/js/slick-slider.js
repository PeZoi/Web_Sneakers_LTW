const imgElement = document.getElementById("slides-img");
const sliderNavElement = document.getElementById("slider-nav");

let currentIndex = 0;

document.addEventListener("DOMContentLoaded", function () {
	renderImageSigle();
	renderImageNav();
});

function renderImageSigle() {
	imgElement.setAttribute("src", images[currentIndex]);
}

function renderImageNav() {
	var navData = "";
	images.forEach((i, index) => {
		navData += `<img class="${
			currentIndex === index ? "active" : ""
		}" src="${i}" alt="" onclick="handleClickImgNav(${index})">`;
	});
	sliderNavElement.innerHTML = navData;
}

function handleClickImgNav(index) {
	currentIndex = index;
	renderImageSigle();
	renderImageNav();
}

function next() {
	if (currentIndex >= images.length - 1) {
		currentIndex = -1;
	}
	currentIndex++;
	renderImageSigle();
	renderImageNav();
}

function previous() {
	if (currentIndex <= 0) {
		currentIndex = images.length;
	}
	currentIndex--;
	renderImageSigle();
	renderImageNav();
}
