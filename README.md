
[![Netlify Status](https://api.netlify.com/api/v1/badges/cc37130e-3551-46c1-9f0d-68ce33b86df0/deploy-status)](https://app.netlify.com/sites/keen-gates-c91a4b/deploys)


![Общайся непринужденно](https://robohash.org/illoadipisciconsequuntur.png?size=200x200&set=set1) 

## Описание

Добро пожаловать в чат «**Непринужденное общение**». Здесь вы найдете собеседника для любой темы… Или Вас найдут ;)
По правде говоря, это учебное задание курса **Яндекс.Практикум «Мидл-фронтенд разработчик»**. Модуль 1. Спринт 1.


## Для ревьювера

На данный момент готовы страницы:
- Оснавная страница чатов и сообщений

А также:
- Структура проекта
- Кастомный шаблонизатор
- Макеты в Figma (ссылка ниже)
- Настроен деплой в Netlify

## Структура проекта

`корневая директория/`
- `html-templates` - свёрстанные по макетам HTML шаблоны,
- `client` - главный каталог клиентской-части проекта,
    - `dist` - каталог готовой сборки проекта,
    - `src` - каталог исходников,
        - `assets` - каталог медиаматериалов,
        - `classes` - каталог функционаьльных классов проекта: шаблонизатор, основной класс проекта.
        - `models` - пока здесь лежат тестовые данные для чатов и аккаунта в формате `json`,
        - `styles` - файлы с глобальными стилями проекта,
        - `templates` - каталог с компонентами и элементами проекта. Каждый компонент или иэлемент состоит из как минимум:
            - `.js` - основной файл модуля javascript,
            - `.scss` - файл стилей компонента/элемента,
            - `.tmpl.js` - файл с шаблоном компонента элемента. 
        - `utils` - каталог со вспомогательными скриптами `js`,
- `server` - главный каталог серверной-части проекта,
- `static` - статика для раздачи.


## Установка

- **Старт Express сервера на 3000 порту**

        npm run start

    либо

        cd server
        npm run start

- **Сборка клиентской части в режиме разработки, запуск сервера на `localhost:1234`**

        cd client
        npm run dev

- **Сборка клиентской части в продакшн**

        cd client
        npm run build

## **Примеры использования**

Жмакай на чаты - увидишь сообщения!

[Скрин](html-templates/screenshot.png)


## Netlify
[Ссылка на netlify](https://keen-gates-c91a4b.netlify.app) (ветка deploy)
## Figma
[Ссылка на макеты страниц](https://www.figma.com/file/4EHI7pSzvl3b5SrxIutW21/Chat-Copy?node-id=0%3A1)



## Напоминалки

### Откройте pull request изменений из ветки dev (вы можете назвать иначе) в ветку main. ВАЖНО: pull request должен называться "Sprint i", где i — номер спринта.
### Также не забудьте проверить, что репозиторий публичный.
### Добавьте ниже ссылку на открытый pull request.



Даже законченный проект остаётся только заготовкой, пока им не начнут пользоваться. Но сначала пользователь должен понять, зачем ему пользоваться вашим кодом. В этом помогает файл README.

README — первое, что прочитает пользователь, когда попадёт в репозиторий на «Гитхабе». Хороший REAMDE отвечает на четыре вопроса:

- Готов ли проект к использованию?
- В чём его польза?
- Как установить?
- Как применять?



Быстро понять статус проекта помогают бейджи на «Гитхабе». Иногда разработчики ограничиваются парой бейджев, которые сообщат о статусе тестов кода:

![Бэйджи](https://github.com/yandex-praktikum/mf.messenger.praktikum.yandex.images/blob/master/mf/b.png)

Если пользователь увидит ошибку в работе тестов, то поймёт: использовать текущую версию в важном проекте — не лучшая идея.

Бейджи помогают похвастаться достижениями: насколько популярен проект, как много разработчиков создавало этот код. Через бейджи можно даже пригласить пользователя в чат:

![Версии](https://github.com/yandex-praktikum/mf.messenger.praktikum.yandex.images/blob/master/mf/vers.png)

В README **Webpack** строка бейджев подробно рассказывает о покрытии кода тестами. Когда проект протестирован, это вызывает доверие пользователя. Последний бейдж приглашает присоединиться к разработке. 

Другая строка убедит пользователя в стабильности инфраструктуры и популярности проекта. Последний бейдж зовёт в чат проекта.




### **Команда**

Если вы работаете в команде, укажите основных участников: им будет приятно, а новые разработчики охотнее присоединятся к проекту. «Гитхаб» — не просто инструмент, это социальная сеть разработчиков.

![Команда](https://github.com/yandex-praktikum/mf.messenger.praktikum.yandex.images/blob/master/mf/team.png)

### **Примеры README**

- «[Реакт](https://github.com/facebook/react)»,
- «[Эхо](https://github.com/labstack/echo)»,
- «[Вебпак](https://github.com/webpack/webpack)»,
- «[ТДенгине](https://github.com/taosdata/TDengine)»,
- «[Соул-хантинг](https://github.com/vladpereskokov/soul-hunting/)».
