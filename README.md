# AF_Backend

This will be the new page replacing current http://alternativ-feiern.de

--> BETA: http://alternativ-feiern.de:8080/


Resources:
- NodeJS/npm - https://nodejs.org/
- ExpressJS  - http://expressjs.com/
- Express React View - https://github.com/reactjs/express-react-views
- ReactJS    - https://facebook.github.io/react/
- MongoDB    - https://www.mongodb.org/
- MaterializeCSS - http://materializecss.com/

First Steps:

1. Install NodeJS
2. Install ExpressJS + Express-Generator
3. Install Express React Views
4. Generate App
5. Setup Database

API:
- GET  '/api/pages' :                   returns array of all pages in the DB.
- POST '/api/pages/add' :               adds a page, and its events, to the DB. Login required. Expects a pageName.
- POST '/api/pages/delete' :            deletes a page, and its events, from the DB. Login required. Expects pageId.
- GET  '/api/events/page' :              returns the events from a given page.
- GET  '/api/events/whitelisted' :       returns array of all whitelisted events (from all pages).
- GET  '/api/events/whitelisted/today' : returns array of all whitelisted events happening today.
- GET  '/api/events/all/short' :         returns all events in a shorter form (missing description) from the GraphAPI (not DB)
- POST '/api/events/blacklist' : changes the isBlacklisted property of a given event (if true --> false, vice versa)
- TBC


Progress:
- Login

![alt tag](http://i.imgur.com/HwEzYVT.png)

- Dashboard - Übersicht Seiten

![alt tag](http://i.imgur.com/PvJlR3a.png)

- Dashboard - Übersicht Event-Blacklist

![alt tag](http://i.imgur.com/QQX7JsA.png)

- Dashboard - Übersicht Event-Whitelist

![alt tag](http://i.imgur.com/XuxPAtW.png)
