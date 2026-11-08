# EventHub

Публичная event-платформа и кабинет организатора на Angular: каталог, фильтры, детальные страницы, регистрация, билеты, персональное расписание и check-in.

## Возможности

- адаптивный каталог с поиском, категориями и форматами;
- детальная страница события с программой и спикерами;
- Reactive Form регистрации и генерация электронного билета;
- избранное и персональное расписание;
- кабинет организатора с метриками и созданием события;
- staff check-in по коду билета;
- typed Signals store, lazy routes, route-to-input binding, localStorage;
- тёмная тема и unit-тесты сценариев регистрации.

## Запуск

Требуется Node.js 22.12+ в ветке 22.x.

```bash
nvm use
npm install
npm start
```

Демонстрационный билет для check-in: `TKT-1042`.

## Проверки

```bash
npm run verify
```

Workflow `.github/workflows/ci.yml` выполняет typecheck, unit-тесты и production build для push и pull request.

См. [`PORTFOLIO.md`](PORTFOLIO.md) и [`docs/architecture.md`](docs/architecture.md).
