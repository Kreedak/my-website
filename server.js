import express from "express";
import bodyParser from "body-parser";
import fetch from "node-fetch"; // если Node < 18, иначе можно убрать
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = 3000;

const TOKEN = "8310915910:AAEEFuc_k3UzuvFyFt-c-bhhRJ3e-nVB5-I";
//const CHAT_ID = "6094425741";
const CHAT_ID = "6094425741";

app.use(express.static("public"));

app.use(cors({
    origin: "https://kreedak.github.io"
}));

// Отдаём index.html при заходе на /
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Маршрут для заказов
app.post("/order", express.json(), async (req, res) => {
    console.log("Новый заказ 4545:", req.body);
    const order = req.body;
    const text = `🍕 Новый заказ!\n\nИмя: ${order.name}\nТелефон: ${order.phone}\nАдрес: ${order.address}\nПицца: ${order.pizza}\nРазмер: ${order.size}\nЦена: ${order.price}`;
    //const text = `🍕 Новый заказ!\n\nПицца: ${order.name}\nРазмер: ${order.size}\nАдрес: ${order.address}`;
    try {
        const response = await fetch(
            `https://api.telegram.org/bot8310915910:AAEEFuc_k3UzuvFyFt-c-bhhRJ3e-nVB5-I/sendMessage`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    chat_id: CHAT_ID,
                    text: text,
                }),
            }
            );

        const data = await response.json();
        console.log("Ответ от Telegram:", data);

        res.json({ success: true, message: "Заказ получен!" });
    } 
    catch (error) {
        console.error("Ошибка при отправке в Telegram:", error);
        res.status(500).json({ success: false, error: "Не удалось отправить заказ" });
    }
});

app.listen(PORT, () => {
console.log(`✅ Сервер запущен на http://localhost:${PORT}`);
});