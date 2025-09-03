import fetch from "node-fetch"; // если Node.js < 18, то надо ставить npm install node-fetch

const TOKEN = "8310915910:AAEEFuc_k3UzuvFyFt-c-bhhRJ3e-nVB5-I"; // вставь токен бота

async function getChatId() {
    const res = await fetch(`https://api.telegram.org/bot8310915910:AAEEFuc_k3UzuvFyFt-c-bhhRJ3e-nVB5-I/getUpdates`);
    const data = await res.json();
    console.log(JSON.stringify(data, null, 2)); // выводим весь ответ красиво

    if (data.result.length > 0) {
        const chatId = data.result[0].message.chat.id;
        console.log("👉 Твой chat_id:", chatId);
    } else {
        console.log("Сообщений нет. Напиши что-то боту в Telegram и попробуй снова.");
    }
}

getChatId();