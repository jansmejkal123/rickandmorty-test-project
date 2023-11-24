This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

# Ukázková NextJS aplikace
## Zadání

Vytvořte v typescriptu jednoduchou lokalizovanou NextJS aplikaci jako frontend pro GraphQL API `https://rickandmortyapi.com/graphql`, kdy je úkolem vytvořit úvodní stránku, obsahující výpis jednotlivých epizod, a stránky s detailem jednotlivých epizod.

Aplikace bude dostupná v lokalizacích en-US a cs-CZ , které by mělo jít jednoduše přepínat.
Celá aplikace by měla být schopná fungovat i bez zapnutého javascriptu v prohlížeči, obrázky by měly být optimalizované pro zvolené zobrazení.

Stránka se seznamem epizod bude dynamicky generovaná na straně serveru (SSG) a bude obsahovat seznam epizod s možností stránkování. Číslo stránky by mělo být jednoznačně určeno v URL. Každá položka v seznamu epizod bude obsahovat jméno a lokalizované datum vysílání. Každá položka též bude obsahovat odkaz na vlastní detailovou stránku.

Stránka detailu bude incremenálně staticky generovaná na serveru (incremental SSG) s cache na 1 den. Stránka bude obsahovat název epizody, datum vysílání a seznam postav, které v dané epizodě účinkovaly.

Každá postava u sebe bude ve výchozím stavu zobrazena s obrázkem a jménem, po jejím rozkliknutí by se v daném prvku měly objevit další údaje (collapsible, zde není třeba řešit funkčnost bez JS) jako je rasa (species), pohlaví a jméno místa, odkud pochází.

Pod seznamem postav bude blok s komentáři, který bude zakončem formulářem pro odeslání dalšího komentáře. Formulář bude obsahovat pole pro přezdívku, email, text zprávy a potvrzení, že uživatel souhlasí se zveřejněním vyplněných údajů. Pole pro přezdívku bude nepovinné, nebude-li ale vyplněno, v seznamu komentářů bude použita mailová adresa. Ostatní pole by měla být povinná, email by měl být validovaný (formát emailu, netřeba ověřovat jeho platnost) a případné chyby ve formuláři by měly být uživateli zobrazeny.

Vzhledem k neexistenci GraphQL API pro tuto funkcionalitu, bude tato funcionalita nahrazena vlastní API cestou, která odeslané výsledky uloží do JSON souboru na serveru. Z těchto datových souborů budou čerpány komentáře pro použití na dané stránce. Přidání nového komentáře by ideálně mělo obnovit cache stránky, aby se uživateli zobrazovala rovnou aktuální, nikoliv až po vypršení serverové cache. Texty komentářů nebudou překládány a budou se zobrazovat nehledě na vybranou lokalizaci webu.

K vytvoření aplikace je možné použít mimo jiné i námi používané technologie a knihovny:
- React 18
- react-bootstrap
- Apollo client (graphql)
- rect-intl (lokalizace)
- Formik + yup (formuláře a validace)

# Example NextJS app
## Assignment

Create a simple localized NextJS application in TypeScript as a frontend for the GraphQL API https://rickandmortyapi.com/graphql. The goal is to create a homepage containing a list of individual episodes and pages with details for each episode.

The application will be available in the en-US and cs-CZ locales, which should be easily switchable. The entire application should be capable of functioning even with JavaScript disabled in the browser, and images should be optimized for the selected display.

The episode list page will be dynamically generated on the server side (SSG) and will contain a paginated list of episodes. The page number should be uniquely determined in the URL. Each item in the episode list will include the name and localized air date. Each item will also have a link to its own detailed page.

The detail page will be incrementally statically generated on the server (incremental SSG) with a cache for 1 day. The page will include the episode name, air date, and a list of characters that appeared in that episode.

Each character will initially be displayed with an image and name. Clicking on a character should reveal additional information in that element (collapsible; no need to handle functionality without JS), such as species, gender, and the name of the place of origin.

Below the list of characters will be a comment section, concluded with a form for submitting additional comments. The form will include fields for a nickname, email, message text, and confirmation that the user agrees to the publication of the filled-in details. The nickname field will be optional, but if left blank, the email address will be used in the comment list. Other fields should be mandatory, and the email should be validated (email format; no need to verify its validity). Any errors in the form should be displayed to the user.

Due to the absence of a GraphQL API for this functionality, this feature will be replaced by a custom API path that will save the submitted results to a JSON file on the server. Comment data will be drawn from these data files for use on the respective page. Ideally, adding a new comment should refresh the page cache so that the user sees the current version immediately, not only after the expiration of the server cache. Comment texts will not be translated and will be displayed regardless of the selected website localization.

To create the application, you can use, among other things, the technologies and libraries we use:

React 18
react-bootstrap
Apollo client (graphql)
react-intl (localization)
Formik + yup (forms and validation)


## Očekávání
Celý proces neber jako, že výsledek má nějaké nám známé jedno ideální řešení ke kterému se máš přiblížit a odchylky od toho ideálu budou znamenat snížení hodnocení.

Cílem je:
ukázat ti co by byl tvůj denní chleba,
usnadnit ti onboarding do našich projektů,
zjistit jak pracuješ,
na praktickém kódu ti poté ukázat a vysvětlit jak pracujeme my, aby jsme si sjednotili styl kódu.

Pokud se ti v průběhu vývoje stane, že něco nebudeš vědět, nebo se zasekneš, tak to není stopka ve spolupráci. Jednou z důležitých softskills, kterou očekáváme je, že umíš komunikovat, tj. nestydíš se zeptat a umíš formulovat svůj problém a dobrat se společně řešení. Je reálné, že v průběhu případné další spolupráce narazíš na úkol, kdy nebudeš znát způsob jak jej vyřešit a někdo z nás něco takového již řešil v jiném projektu. Nejhorší možný scénář je ten, že o tobě týden neuslyšíme a ty se budeš týden topit v hledání řešení, které někdo z nás zná a může tě navést během chvilky.

Samozřejmě se může ukázat i to, že tvoje aktuální znalosti nestačí na to, aby jsi se dokázal zapojit do našich projektů. Opět to ale není stopka naší možné spolupráce. Tím zadáním máš v ruce vodítko co dohnat a máš kontakt kde se ptát.

Máš to prostě ve svých rukou :-)
