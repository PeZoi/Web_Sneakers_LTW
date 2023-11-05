// Data
const products = [
	{
		id: 1,
		name: "Giày MLB Big Ball Chunky A New York Yankees 3ASHC101N-50BGL Màu Trắng Size 250",
		brand: "MLB",
		price: 1250000,
		img: "../assets/img/shoe/giay-1.jpg",
		url: "../pages/shoe-detail-1.html",
	},
	{
		id: 2,
		name: "Giày Thể Thao Nữ Adidas × Gucci Women’s Gazelle IE4796 Màu Nâu Be",
		brand: "ADIDAS",
		price: 28900000,
		img: "../assets/img/shoe/giay-2.jpg",
		url: "../pages/shoe-detail-2.html",
	},
	{
		id: 3,
		name: "Giày Thể Thao Nike Travis Scott X Air Jordan 1 Low OG Reverse Mocha Phối Màu",
		brand: "NIKE",
		price: 38800000,
		img: "../assets/img/shoe/giay-3.jpg",
		url: "../pages/shoe-detail-3.html",
	},
	{
		id: 4,
		name: "Giày Sneaker Nam Converse X Off CO6571 Màu Trắng Size 39",
		brand: "CONVERSE",
		price: 8510000,
		img: "../assets/img/shoe/giay-4.jpg",
		url: "../pages/shoe-detail-4.html",
	},
	{
		id: 5,
		name: "Giày Thể Thao Nam Louis Vuitton LV Trainer 1A9JG9 Màu Đen Trắng",
		brand: "LOUIS VUITTON",
		price: 48900000,
		img: "../assets/img/shoe/giay-5.jpg",
		url: "../pages/shoe-detail-5.html",
	},
	{
		id: 6,
		name: "Giày Thể Thao Nike Air Force 1 ’07 ‘White Black’ CT2302-100 Màu Trắng Đen Size 40.5",
		brand: "NIKE",
		price: 2550000,
		img: "../assets/img/shoe/anhgiay6.jpg",
		url: "../pages/shoe-detail-6.html",
	},
	{
		id: 7,
		name: "Giày Thể Thao Nike Court Vision Next Nature Black DH2987-001 Màu Đen Trắng Size 40",
		brand: "NIKE",
		price: 2800000,
		img: "../assets/img/shoe/anhgiay7.jpg",
		url: "../pages/shoe-detail-7.html",
	},
	{
		id: 8,
		name: "Giày Thể Thao Nike Revolution 6 Next Nature DC3728-005 Màu Đen Size 43",
		brand: "NIKE",
		price: 2790000,
		img: "../assets/img/shoe/anhgiay8.jpg",
		url: "../pages/shoe-detail-8.html",
	},
	{
		id: 9,
		name: "Giày Thể Thao Nike Air Jordan 1 High OG UNC University Blue 555088-134 575441-134 Màu Xanh Trắng Size 41",
		brand: "NIKE",
		price: 2400000,
		img: "../assets/img/shoe/anhgiay9.jpg",
		url: "../pages/shoe-detail-9.html",
	},
	{
		id: 10,
		name: "Giày Bóng Rổ Nike KYRIE FLYTRAP III EP Black/White CD0191-001 Màu Đen Size 44.5",
		brand: "NIKE",
		price: 2850000,
		img: "../assets/img/shoe/anhgiay10.jpg",
		url: "../pages/shoe-detail-10.html",
	},
];

// letiables
let table = document.getElementById("product-list");
let tbody = table.getElementsByTagName("tbody")[0];

// render table
function render(products) {
	tbody.innerHTML = "";
	products.map((product) => {
		let row = document.createElement("tr");
		row.innerHTML = `<tr id="${product.id}">
            <td><input type="checkbox" name="check-item" id="r-${
					product.id
				}"></td>
			<td><img data-id="${product.id}" class="product-image" src="${
			product.img
		}" alt="${product.name}" width="100">
		<div id="myModal-${product.id}" class="modal">
  				<span class="close">&times;</span>
  				<img class="modal-content" id="img01-${product.id}">
			</div></td>
			

            <td><a href=${product.url}>${product.name}</a></td>
            <td>${product.brand}</td>
            <td>${product.price.toLocaleString("vi-en")}</td>
            <td><input type="number" value="0" disabled name="n-${
					product.id
				}" id="n-${product.id}"></td>
            <td name="total-product" id="total-${product.id}"></td>
         </tr>`;
		tbody.appendChild(row);

		// Thêm sự kiện onchange vào trường input quantity
		const inputQuantity = row.querySelector(`#n-${product.id}`);
		inputQuantity.addEventListener("change", (e) => {
			if (e.target.value > 0) {
				handleChangeQuantity(e.target.value, product.price, product.id);
			} else {
				inputQuantity.value = 1;
				handleChangeQuantity(1, product.price, product.id);
			}
		});
	});
}

// Price format (1.000.000 => 1000000)
function priceFormat(price) {
	return parseFloat(price.replace(/\./g, ""));
}

// Handle checkboxes
function hanldeCheckboxesChange(checkbox) {
	const row = checkbox.closest("tr");
	const inputQuantity = row.querySelector("td:nth-child(6) input");
	const totalPrice = row.querySelector("td:nth-child(7)");
	const price = row.querySelector("td:nth-child(5)").textContent;
	if (checkbox.checked) {
		inputQuantity.disabled = false;
		inputQuantity.value = 1;
		totalPrice.innerHTML = priceFormat(price).toLocaleString("vi-en");
		handleTotalPrice();
	} else {
		inputQuantity.disabled = true;
		inputQuantity.value = 0;
		totalPrice.innerHTML = "";
		handleTotalPrice();
	}
}

// Handle checkbox all
function handleCheckboxAllChange(checkboxAll, checkboxesElementItems) {
	let isChecked = checkboxAll.checked;
	checkboxesElementItems.forEach((checkbox) => {
		checkbox.checked = isChecked;
		hanldeCheckboxesChange(checkbox);
	});
}

// Handle input quantity
function handleChangeQuantity(quantity, price, id) {
	let totalElement = document.getElementById(`total-${id}`);
	totalElement.innerText = (quantity * price).toLocaleString("vi-en");
	handleTotalPrice();
}

// Handle total price
function handleTotalPrice() {
	const totalProductElements = document.querySelectorAll(
		'td[name="total-product"]'
	);
	const totalPriceElement = document.getElementById("total-price");
	let totalPrice = 0;
	totalProductElements.forEach((totalProductElement) => {
		const value = totalProductElement.textContent;
		if (value !== "") {
			totalPrice += priceFormat(value);
		}
	});
	totalPriceElement.innerHTML = totalPrice.toLocaleString("vi-en");
}

// Handle select
function handleChangeSelect(selectElement) {
	const selectedValue = selectElement.value;
	if (selectedValue === "0") {
		table.style.display = "none";
	} else {
		document.getElementById("check-all").checked = false;
		document.getElementById("total-price").innerText = "";
		table.style.display = "block";
	}
	let newProducts = [];
	if (selectedValue === "1") {
		newProducts = products.filter(
			(p) => p.price >= 1000000 && p.price <= 1500000
		);
	} else if (selectedValue === "2") {
		newProducts = products.filter(
			(p) => p.price >= 1500000 && p.price <= 2000000
		);
	} else if (selectedValue === "3") {
		newProducts = products.filter(
			(p) => p.price >= 2000000 && p.price <= 2500000
		);
	} else if (selectedValue === "4") {
		newProducts = products.filter(
			(p) => p.price >= 2500000 && p.price <= 3000000
		);
	} else if (selectedValue === "5") {
		newProducts = products.filter((p) => p.price > 3000000);
	} else if (selectedValue === "6") {
		newProducts = products.sort((p1, p2) => p1.price - p2.price);
	} else if (selectedValue === "7") {
		newProducts = products.sort((p1, p2) => p2.price - p1.price);
	}

	// In sản phẩm ra table
	render(newProducts);

	// Logic checkbox item
	let checkboxesElementItems = document.querySelectorAll(
		'input[name="check-item"]'
	);
	checkboxesElementItems.forEach((checkbox) => {
		checkbox.addEventListener("change", () => {
			hanldeCheckboxesChange(checkbox);
		});
	});

	// Logic checkbox all
	let checkboxAll = document.getElementById("check-all");
	checkboxAll.addEventListener("change", () => {
		handleCheckboxAllChange(checkboxAll, checkboxesElementItems);
	});

	// Lấy danh sách tất cả các hình ảnh sản phẩm
	const productImages = document.querySelectorAll(".product-image");

	productImages.forEach((img) => {
		img.addEventListener("click", function (e) {
			const productId = this.getAttribute("data-id");
			const modal = document.getElementById(`myModal-${productId}`);
			const modalImg = document.getElementById(`img01-${productId}`);
			modal.style.display = "block";
			modalImg.src = this.src;

			modal.addEventListener("click", () => {
				modal.style.display = "none";
			});
		});
	});

	// Xử lý đóng modal khi click vào nút đóng (x)
	const closeButtons = document.querySelectorAll(".close");
	closeButtons.forEach((button) => {
		button.addEventListener("click", function () {
			const modal = this.parentElement;
			modal.style.display = "none";
		});
	});
}
