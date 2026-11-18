# Next Webshop

En webshop til spil, bygget med **Next.js, React og TypeScript** på frontend og et **Node/Express-API** på backend, forbundet til en **Supabase-database (PostgreSQL)**. 
Projektet har en komplet checkout med pakkeshop-søgning og et adminpanel, hvor man kan styre produkter, medarbejdere og leverandører.

## Funktioner

### Kundesiden

- Produktvisning og kurv, som gemmes i localStorage og holdes adskilt for hver bruger og for gæster
- Checkout med kundeoplysninger, adresse, leveringsmetode og betalingsformular
- Formvalidering med tydelige fejlbeskeder
- Leveringsmetoder og priser, der hentes fra databasen
- Pakkeshop-søgning via Google Maps Platform (Geocoding og Places API), som finder de nærmeste pakkeshops til den indtastede adresse og sorterer dem efter afstand
- Ordrebekræftelsesside, der henter ordren direkte fra databasen
- Ordrehistorik for indloggede brugere
- Mulighed for at handle både som gæst og som indlogget bruger

### Adminpanel

- Login med JWT gemt i en cookie
- Oprettelse, visning, redigering og sletning (CRUD) af produkter, medarbejdere og leverandører

## Teknologier

| Område | Teknologi |
|---|---|
| Frontend | Next.js, React, TypeScript, CSS Modules |
| Backend | Node.js, Express, TypeScript (kørt med tsx) |
| Database | Supabase (PostgreSQL) |
| Autentificering | JWT i HttpOnly-cookie |
| Eksterne API'er | Google Geocoding API, Google Places API |
