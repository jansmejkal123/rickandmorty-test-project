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
