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

const postForm = document.getElementById('post-form');
const postsList = document.getElementById('posts');
const errorSpan = document.getElementById('error');
const submitBtn = postForm.querySelector('button[type="submit"]');

function createPostHTML(post, isNew = false) {
  return `
    <li class="${isNew ? 'new' : ''}">
      <h3>${post.title}</h3>
      <p>${post.body.replace(/\n/g, '<br>')}</p>
    </li>
  `;
}

async function loadInitialPosts() {
  try {
    const response = await fetch(`${API}/posts?_limit=5`);
    if (!response.ok) throw new Error('Не вдалося завантажити пости.');
    
    const posts = await response.json();
    postsList.innerHTML = posts.map(post => createPostHTML(post)).join('');
  } catch (err) {
    errorSpan.textContent = `Помилка завантаження: ${err.message}`;
  }
}

postForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  errorSpan.textContent = '';

  const formData = new FormData(postForm);
  const title = formData.get('title').trim();
  const body = formData.get('body').trim();
  const userId = Number(formData.get('userId'));

  if (!title) {
    errorSpan.textContent = 'Заголовок не може бути порожнім.';
    return;
  }
  if (body.length < 10) {
    errorSpan.textContent = 'Текст поста має містити мінімум 10 символів.';
    return;
  }

  submitBtn.disabled = true;
  const originalBtnText = submitBtn.textContent;
  submitBtn.textContent = 'Надсилаємо…';

  try {
    const response = await fetch(`${API}/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title, body, userId })
    });

    if (response.status !== 201) {
      throw new Error(`Сервер повернув статус ${response.status}`);
    }

    const newPost = await response.json();
    postsList.insertAdjacentHTML('afterbegin', createPostHTML(newPost, true));

    postForm.reset();
  } catch (err) {
    errorSpan.textContent = `Помилка відправки: ${err.message}`;
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = originalBtnText;
  }
});

loadInitialPosts();