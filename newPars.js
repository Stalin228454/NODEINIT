const axios = require('axios');
const fs = require('fs');
const TelegramBot = require('node-telegram-bot-api');
const cron = require('node-cron');

function fetchAndProcessData(url, headers) {
    axios.get(url, { headers })
        .then(response => {
            fs.writeFileSync('index.html', response.data, 'utf-8');

            // Функция для вывода сообщения с задержкой
            function showMessageWithDelay(message, delay) {
                setTimeout(function() {
                    console.log(message);
                }, delay);
            }

            console.log(' ');
            showMessageWithDelay(' ', 2000); // Вывести сообщение через 2 секунды
            console.log(' ');

            fs.readFile('index.html', 'utf-8', (err, data) => {
                if (err) {
                    console.error('Ошибка при чтении файла:', err);
                    return;
                }

                // Разбиваем текст файла на строки
                const lines = data.split('\n');

                // Выбираем нужную строку (нумерация строк начинается с 0)
                const selectedLine = lines[1427];

                // Записываем выбранную строку в отдельный файл
                fs.writeFileSync('selected_line.html', selectedLine, 'utf-8');

                console.log(' ');
                showMessageWithDelay(' ', 2000); // Вывести сообщение через 2 секунды
                console.log(' ');

                fs.readFile('selected_line.html', 'utf-8', (err, data) => {
                    if (err) {
                        console.error('Ошибка при чтении файла:', err);
                        return;
                    }

                    // Ищем текст с помощью регулярного выражения
                    const regex = />([^<]+)</;
                    const match = data.match(regex);

                    // Если найдено совпадение, выводим текст
                    if (match && match.length > 1) {
                        const priceText = match[1];
                        console.log(priceText);
                        fs.writeFile('Bitcoin.txt', priceText, (err) => {
                            if (err) {
                                console.error('Ошибка при записи в файл:', err);
                                return;
                            }
                            console.log('Текст успешно записан в файл Bitcoin.txt');
                        });
                    } else {
                        console.log('Текст не найден');
                    }
                });
                showMessageWithDelay(' ', 2000);
            });
        })
        .catch(error => {
            console.error('Ошибка при получении данных:', error.message);
        });

    // Функция для вывода сообщения с задержкой
    function showMessageWithDelay(message, delay) {
        setTimeout(function() {
            console.log(message);
        }, delay);
    }

    console.log(' ');
    showMessageWithDelay(' ', 2000); // Вывести сообщение через 2 секунды
    console.log(' ');
}

// Пример использования
const url = 'https://www.coingecko.com/ru';
const headers = {
    "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
    "accept-language": "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7",
    "cache-control": "max-age=0",
    "priority": "u=0, i",
    "sec-ch-ua": "\"Chromium\";v=\"124\", \"Google Chrome\";v=\"124\", \"Not-A.Brand\";v=\"99\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "document",
    "sec-fetch-mode": "navigate",
    "sec-fetch-site": "same-origin",
    "sec-fetch-user": "?1",
    "upgrade-insecure-requests": "1",
    "cookie": "_ga=GA1.1.183945583.1714768031; _gcl_au=1.1.2092012815.1714768031; _session_id=21ac4a7ddc15e439a005cb4b99b9d21f; _cq_duid=1.1714768031.FKFeblQfOyDSdx3Z; _cq_suid=1.1714768031.HIKneN2dwbyQWKks; _hjSession_3096373=eyJpZCI6ImI1OTBjZjdkLTY4ZDMtNDM0MS1iZDIxLWIxOTljNTg0M2RjZiIsImMiOjE3MTQ3NjgxNjUyNzksInMiOjAsInIiOjAsInNiIjowLCJzciI6MCwic2UiOjAsImZzIjoxLCJzcCI6MH0=; __stripe_mid=adf99fdf-09ab-488b-a9b7-29e35cf62ce60967ce; __stripe_sid=0151eadc-691c-4b00-a090-91de911fb1fef218a4; __hstc=234611265.62aabebf2ad35fa9ab455226319cacbe.1714768202983.1714768202983.1714768202983.1; hubspotutk=62aabebf2ad35fa9ab455226319cacbe; __hssrc=1; __hssc=234611265.1.1714768202984; _hjSessionUser_3096373=eyJpZCI6ImFhZDNlMzg3LTY4MDItNWRjNi1hMWQ2LTUzMGMxZjk0OGFlMiIsImNyZWF0ZWQiOjE3MTQ3NjgxNjUyNzksImV4aXN0aW5nIjp0cnVlfQ==; mp_4e762b32525bd7ecddda43ce51776343_mixpanel=%7B%22distinct_id%22%3A%20%22%24device%3A18f4023f60760a-061a8d2c79a1c6-26001d51-1fa400-18f4023f60760a%22%2C%22%24device_id%22%3A%20%2218f4023f60760a-061a8d2c79a1c6-26001d51-1fa400-18f4023f60760a%22%2C%22%24initial_referrer%22%3A%20%22https%3A%2F%2Fyandex.ru%2F%22%2C%22%24initial_referring_domain%22%3A%20%22yandex.ru%22%2C%22__mps%22%3A%20%7B%7D%2C%22__mpso%22%3A%20%7B%22%24initial_referrer%22%3A%20%22https%3A%2F%2Fyandex.ru%2F%22%2C%22%24initial_referring_domain%22%3A%20%22yandex.ru%22%7D%2C%22__mpus%22%3A%20%7B%7D%2C%22__mpa%22%3A%20%7B%7D%2C%22__mpu%22%3A%20%7B%7D%2C%22__mpr%22%3A%20%5B%5D%2C%22__mpap%22%3A%20%5B%5D%7D; OptanonConsent=isGpcEnabled=0&datestamp=Fri+May+03+2024+23%3A54%3A49+GMT%2B0300+(%D0%9C%D0%BE%D1%81%D0%BA%D0%B2%D0%B0%2C+%D1%81%D1%82%D0%B0%D0%BD%D0%B4%D0%B0%D1%80%D1%82%D0%BD%D0%BE%D0%B5+%D0%B2%D1%80%D0%B5%D0%BC%D1%8F)&version=202312.1.0&browserGpcFlag=0&isIABGlobal=false&hosts=&consentId=9e7faa6d-c2ca-4862-970f-e15803625bef&interactionCount=1&landingPath=NotLandingPage&groups=C0001%3A1%2CC0002%3A1%2CC0004%3A1%2CC0003%3A1&AwaitingReconsent=false; _ga_LJR3232ZPB=GS1.1.1714768031.1.1.1714769689.0.0.0; _ga_1Y6C78JXR3=GS1.1.1714768031.1.1.1714769689.0.0.0",
    "Referer": "https://www.coingecko.com/ru/categories",
    "Referrer-Policy": "strict-origin-when-cross-origin"
};

//fetchAndProcessData(url, headers);
//////////////////////////////////////////////////////////////////////////////////////////////////////////
// Токен вашего бота
const token = '7016483548:AAFRPPZAmzlz_f0NbziMQG-C21aQrev_8OY';

// ID вашей группы
const chatId = '-1002008921036';

// Создание экземпляра бота
const bot = new TelegramBot(token, { polling: true });

// Функция для отправки сообщения с содержимым файла в группу
function sendBitcoinData() {
    // Читаем содержимое файла Bitcoin.txt
    fs.readFile('Bitcoin.txt', 'utf-8', (err, data) => {
        if (err) {
            console.error('Ошибка при чтении файла:', err);
            return;
        }

        // Отправляем содержимое файла в группу
        bot.sendMessage(chatId, data)
            .then(() => console.log('Сообщение успешно отправлено в группу'))
            .catch(error => console.error('Ошибка при отправке сообщения:', error.message));
    });
}

// Вызов функции и отправка данных в группу
console.log('Вызов функции и отправка данных в группу');
fetchAndProcessData(url, headers)
sendBitcoinData();

// Планирование повторного вызова функции каждые 5 минут
cron.schedule('*/5 * * * *', () => {
    console.log('Вызов функции и отправка данных в группу');
    fetchAndProcessData(url, headers)
    sendBitcoinData();
});