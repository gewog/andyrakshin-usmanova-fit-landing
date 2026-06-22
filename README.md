# Usmanova Fit Landing

Учебный проект для тестового задания: воссоздание трёх экранов лендинга [usmanovafit.gymteam.ru/mainpage](https://usmanovafit.gymteam.ru/mainpage) с адаптивной вёрсткой и рабочими интерактивными элементами.

## Цель проекта

Продемонстрировать навыки фронтенд-разработки:

- адаптивная вёрстка под desktop и mobile;
- интерактивные элементы (кнопки, карусель, аккордеон FAQ, форма обратной связи);
- чистая структура кода, тесты и деплой.

## Реализованные экраны

1. **Hero** — первый экран с заголовком, описанием и CTA «Выбрать программу».
2. **О тренере** — блок о Кате Усмановой с достижениями и каруселью фото.
3. **FAQ** — секция «Отвечаем на вопросы» с раскрывающимися ответами.

Дополнительно: форма «Не знаете, с чего начать?» с валидацией и ссылками на мессенджеры.

## Стек

| Технология | Назначение |
|------------|------------|
| React 19 | UI |
| TypeScript | типизация |
| Vite 8 | сборка и dev-сервер |
| Vitest + Testing Library | unit и component тесты |
| CSS (без UI-фреймворков) | стили, mobile-first |

## Требования

- Node.js 20+
- npm 10+

## Установка и запуск

```bash
git clone https://github.com/<username>/usmanova-fit-landing.git
cd usmanova-fit-landing

# установить зависимости
npm install

# запустить dev-сервер
npm run dev
```

Приложение откроется на `http://localhost:5173`.

## Репозиторий

```bash
# создать публичный репозиторий и запушить (нужен GitHub CLI)
gh auth login
gh repo create usmanova-fit-landing --public --source=. --remote=origin --push
```

Если репозиторий уже создан вручную на GitHub:

```bash
git remote add origin https://github.com/<username>/usmanova-fit-landing.git
git push -u origin main
```

## Сборка

```bash
npm run build
npm run preview
```

## Тестирование

```bash
# запуск тестов
npm test

# покрытие (порог ≥ 95%)
npm run test:coverage
```

## Безопасность

- Санитизация пользовательского ввода (`sanitizeInput`) — удаление HTML-тегов и управляющих символов.
- Валидация формы на клиенте перед «отправкой».
- Внешние ссылки открываются с `rel="noopener noreferrer"`.
- Секреты и `.env` не коммитятся (см. `.gitignore`).

## Логирование

Клиентский логгер (`src/utils/logger.ts`) фиксирует ключевые события:

- клик по CTA на Hero;
- отправка и ошибки валидации формы;
- открытие пунктов FAQ.

В production-режиме логи пишутся в `console` с меткой времени и namespace.

## Деплой

**Live:** https://usmanova-fit-landing-gamma.vercel.app

Проект — статический SPA. Подходит для Vercel, Netlify, GitHub Pages.

```bash
# Vercel (после npm run build)
npx vercel deploy --prod
```

GitHub Actions (`.github/workflows/ci.yml`) автоматически запускает тесты и деплоит на GitHub Pages при push в `main`.

## Инструмент разработки

Собрано в **Cursor** (AI-assisted coding).

## Лицензия

Учебный проект. Контент и брендинг принадлежат правообладателям оригинального лендинга.
