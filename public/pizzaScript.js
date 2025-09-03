const pizzas = [
    {id: "1", name: "Пепперони", price: 600, size: "30см", ingredients: "сыр, пепперони", img: "image/pepperoni.png"},
    {id: "2", name: "Маргарита", price: 500, size: "30см", ingredients: "сыр, томаты", img: "image/margarita.png"},
    {id: "3", name: "Сырный цыпленок", price: 550, size: "30см", ingredients: "сыр, ветчина, ананас", img: "image/chicken.png"},
    {id: "4", name: "4 Сыра", price: 570, size: "30см", ingredients: "моцарелла пармезан голубой сыр Балжан казявка", img: "image/four_cheese.png"}
];

const selectedId = localStorage.getItem("selectedPizza");
const pizza = pizzas.find(p => p.id === selectedId);

const pizzaSizeSelect = document.querySelector("#pizzaSizeSelect");
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
        let selectedSize = pizzaSizeSelect.value;
        let newPrice = basePrice;

        if (selectedSize === "small") newPrice = Math.round(basePrice * 0.8);
        if (selectedSize === "medium") newPrice = basePrice;
        if (selectedSize === "large") newPrice = Math.round(basePrice * 1.5);

        // показываем новый размер и цену
        let selectedSizeText = pizzaSizeSelect.options[pizzaSizeSelect.selectedIndex].text;
        pizzaSizeEl.textContent = selectedSizeText;
        pizzaPriceEl.textContent = newPrice + "₸";
    }

    pizzaSizeSelect.addEventListener("change", updatePizzaInfo);

    updatePizzaInfo();
}
console.log("pizza:", pizza.name);

document.querySelector("#orderForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const order = {
        name: document.querySelector("#name").value,
        phone: document.querySelector("#phone").value,
        address: document.querySelector("#address").value,
        pizza: pizza.name, // пицца из выбора
        size: pizzaSizeSelect.options[pizzaSizeSelect.selectedIndex].text,
        price: pizzaPriceEl.textContent
    };

    console.log("Новый заказ:", order);

    // Отправка на сервер
    await fetch("http://localhost:3000/order", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(order)
    });
});