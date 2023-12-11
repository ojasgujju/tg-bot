const TelegramBot = require("node-telegram-bot-api");

// Replace 'YOUR_BOT_TOKEN' with the token you received from BotFather
const bot = new TelegramBot("5881521479:AAFah6lj2FLjldjy8tO84BSxGZYikABaf6w", {
  polling: true,
});

bot.on("message", (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;
  if (text === "/start") {
    bot.sendMessage(chatId, "Hello " + msg.from.first_name + "!");
  } else if (text.includes("https")) {
    fetch(`https://api.microlink.io/?url=${text}&meta=false&pdf=true&format=A4`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        const pdfUrl = data.data.pdf.url;
        bot.sendDocument(chatId, pdfUrl);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });

    // Add URL to API and fetch data
    // Get value of "data.pdf.url" from response
    // Replace with actual PDF URL
    bot.sendMessage(chatId, pdfUrl);
    // bot.sendDocument(chatId, pdfUrl);
  } else {
    bot.sendMessage(chatId, "List of Commands: ...");
  }
});
