// ============================================================
// Завдання 4 — POST: створення поста
// ============================================================
// API:
//   GET  https://jsonplaceholder.typicode.com/posts?_limit=5
//   POST https://jsonplaceholder.typicode.com/posts
//        body: { title, body, userId }
//        повертає 201 з created object
//
// Вимоги:
//   1. GET 5 існуючих постів + рендер
//   2. Submit форми:
//      - preventDefault
//      - валідація (title не порожній, body >= 10 символів)
//      - POST з Content-Type: application/json + JSON.stringify
//      - 201 → додати на початок списку, очистити форму
//      - помилка → inline #error
//   3. Кнопка disabled + "Надсилаємо..." під час запиту
// ============================================================

const API = "https://jsonplaceholder.typicode.com";

// TODO