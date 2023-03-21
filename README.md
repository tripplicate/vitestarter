# Vitestarter

[Русский](./README.md) | [English](./docs/README.en-US.md)

Стартовый шаблон на основе сборщика Vite.

## Особенности

- Typescript, yarn
- Eslint, commitlint, husky, lint-staged

Преднастроенны чанки, проксирование, линтинг и форматирование для javascript, typescript, json, yaml, markdown

## С чего начать

Скопируйте `.env.example` в `.env.local`, при необходимости измените переменные окружения

````sh 
cp .env.example .env.local
````

### Настройка

Все конфигурационные файлы `vite` лежат по пути `./vite`

`./vite/plugins`

Содержит в себе файлы с настройками для плагинов, отделение настроек

`./vite/config.ts` 

Файл с константами и типами

### Запуск

Запуск development режима, по умолчанию `localhost:3000`

````sh
yarn dev
````

