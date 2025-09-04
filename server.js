import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const TOKEN = process.env.BOT_TOKEN;
const CHAT_ID = process.env.CHAT_ID;

app.use(express.static("docs"));

app.use(cors({
    origin: "https://kreedak.github.io",
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"]
}));

app.use(express.json());

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "docs", "index.html"));
});

app.post("/order", async (req, res) => {
    console.log("Новый заказ:", req.body);
    const order = req.body;
    const text = `🍕 Новый заказ!\n\nИмя: ${order.name}\nТелефон: ${order.phone}\nАдрес: ${order.address}\nПицца: ${order.pizza}\nРазмер: ${order.size}\nЦена: ${order.price}`;

    try {
        const response = await fetch(
            `https://api.telegram.org/bot${TOKEN}/sendMessage`,
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
    } catch (error) {
        console.error("Ошибка при отправке в Telegram:", error);
        res.status(500).json({ success: false, error: "Не удалось отправить заказ" });
    }
});

app.options("*", cors());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
