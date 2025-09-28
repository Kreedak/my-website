const pizzas = [
    {id: "1", name: "Пепперони", price: 600, size: "30см", ingredients: "Масло мука сухой тип дрожжей соль сахар вода лук томат растительное масло чеснок перец соль базилик моцарелла", img: "image/pepperoni.png"},
    {id: "2", name: "Маргарита", price: 500, size: "30см", ingredients: "Томатный соус, моцарелла, оливковое масло, помидоры, базилик, вода, мука, дрожжи, соль, сахар, помидоры, специи", img: "image/margarita.png"},
    {id: "3", name: "Сырный цыпленок", price: 550, size: "30см", ingredients: "Томатный соус, моцарелла, оливковое масло, курица, базилик, вода, мука, дрожжи, соль, сахар, специи", img: "image/chicken.png"},
    {id: "4", name: "4 Сыра", price: 570, size: "30см", ingredients: "Моцарелла , пармезан , эмменталь ,горгонзола вода, мука, дрожжи, соль, томатный соус", img: "image/four_cheese.png"}
];

const selectedId = localStorage.getItem("selectedPizza");
const pizza = pizzas.find(p => p.id === selectedId);

const pizzaSizeSelect = document.querySelector("#pizza-size-select");
const pizzaSizeEl = document.querySelector("#pizzaSize");
const pizzaPriceEl = document.querySelector("#pizzaPrice");

if (pizza) {

    document.querySelector("#pizzaName").textContent = pizza.name;
    document.querySelector("#pizzaIngredients").textContent = pizza.ingredients;

    // картинка
    const imgEl = document.querySelector("#pizzaImg");
    imgEl.src = pizza.img;
    imgEl.alt = pizza.name;

    let basePrice = pizza.price;


    function updatePizzaInfo() {
        // ищем выбранный радио
        let selectedRadio = document.querySelector('input[name="size"]:checked');
        if (!selectedRadio) return;

        let selectedSize = selectedRadio.value;
        let newPrice = basePrice;

        if (selectedSize === "small") newPrice = Math.round(basePrice * 0.8);
        if (selectedSize === "medium") newPrice = basePrice;
        if (selectedSize === "large") newPrice = Math.round(basePrice * 1.5);

        // текст размера из label (по красоте)
        let selectedLabel = document.querySelector(`label[for="${selectedRadio.id}"]`);

        pizzaSizeEl.textContent = selectedLabel.textContent;
        pizzaPriceEl.textContent = newPrice + "₸";
    }

    document.querySelectorAll('input[name="size"]').forEach(radio => {
        radio.addEventListener("change", updatePizzaInfo);
    });

    updatePizzaInfo();
}
console.log("pizza:", pizza.name);

document.querySelector("#orderForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const selectedRadio = document.querySelector('input[name="size"]:checked');
    const selectedSizeText = selectedRadio ? document.querySelector(`label[for="${selectedRadio.id}"]`).textContent : '';

    const order = {
        name: document.querySelector("#name").value,
        phone: document.querySelector("#phone").value,
        address: document.querySelector("#address").value,
        pizza: pizza.name, // пицца из выбора
        size: selectedSizeText,
        price: pizzaPriceEl.textContent
    };

    console.log("Новый заказ:", order);

    // Отправка на сервер
    const respons = await fetch("https://my-website-uy8a.onrender.com/order", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(order)
    });

    const result = await respons.json();

    console.log("qwertyuiop:", result);

    console.log("Проверка перед открытием модалки");
    if (result.success) {
        console.log("Success Mодалка должна открытся");
        openModal("successModal");
    }
    else {
        openModal("errorModal");
        console.log("Error Mодалка должна открытся");
    }
});

function openModal(id) {
    const modal = document.getElementById(id);
    if (!modal) {
        console.error("Модалка не найдена:", id);
        return;
    }

    modal.classList.add("show");
    console.log("Модалка открыта:", id);

    const closeBtn = modal.querySelector(".close");
    (modal.onclick || closeBtn.onclick) = () => {
        modal.classList.remove("show");
    };
}

const btn = document.querySelector('#orderBtn');

btn.addEventListener('click', function (e) {
    const circle = document.createElement('span');
    const rect = btn.getBoundingClientRect();
    const size = Math.max(rect.width,rect.height);

    circle.className = 'ripple';
    circle.style.width = circle.style.height = size + 'px';
    circle.style.left = (e.clientX - rect.left - size / 2) + 'px';
    circle.style.top = (e.clientY - rect.top - size / 2) + 'px';

    btn.appendChild(circle);

    circle.addEventListener('animationend', () => circle.remove());
});