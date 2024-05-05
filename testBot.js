const TelegramBot = require('node-telegram-bot-api');

// Токен вашего бота
const token = '7016483548:AAFRPPZAmzlz_f0NbziMQG-C21aQrev_8OY';

// ID чата или группы, в которую бот будет отправлять сообщения
const chatId = '-1002008921036';

// Создаем экземпляр бота
const bot = new TelegramBot(token, { polling: true });

// Отправляем сообщение "Hello" в указанный чат или группу
bot.sendMessage(chatId, 'Hello')
    .then(() => {
        console.log('Сообщение успешно отправлено');
    })
    .catch((error) => {
        console.error('Ошибка при отправке сообщения:', error);
    });