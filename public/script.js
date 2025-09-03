const pizza = document.querySelectorAll(".pizza");

document.querySelectorAll(".pizza").forEach(pizza => {
    pizza.addEventListener("click", () => {
        let id = pizza.dataset.id;     // читаем data-id
        console.log("Выбрана пицца ID:", id); // проверка
        localStorage.setItem("selectedPizza", id); // сохраняем в localStorage
        window.location.href = "pizza.html";       // переходим на страницу деталей
    });
});
function makeOrder(pizzaName) {
    console.log("Вы заказали:", pizzaName);
    alert("Заказ оформлен: " + pizzaName);
}