# Art Atlas

Art Atlas is a React application that allows users to explore artworks from museum collections, search by artist or keyword, and save their favorite pieces.

The project was built as a final portfolio project and focuses on working with a third-party API, reusable React components, responsive design, loading states, error handling, routing, and local persistence.

## Live Demo

The application is deployed on Vercel and can be viewed here:

https://art-atlas-tan.vercel.app

## Features

- Search artworks by artist, title, or keyword
- Show 3 search results initially and reveal 3 more with the “Mostrar más” button
- Display artwork information including image, title, artist, and date
- Save and remove favorite artworks
- Persist favorites using localStorage
- Responsive layout for mobile, tablet, and desktop
- Loading indicator while fetching data
- Empty state when no artworks are found
- Error state when a request fails
- Multi-page navigation using React Router
- Local fonts loaded with `@font-face`
- SVG interface icons

## Technologies

- React
- JavaScript
- Vite
- React Router
- CSS
- BEM methodology
- Fetch API
- localStorage
- The Metropolitan Museum of Art Collection API

## Pages

### Home

Introduces Art Atlas and provides a direct link to explore the collection.

### Explore

Allows users to search for artworks and displays matching results in reusable artwork cards. Results are revealed three at a time.

### Favorites

Displays artworks saved by the user and allows them to remove pieces from their personal collection.

## API

Art Atlas uses The Metropolitan Museum of Art Collection API.

The application first searches for matching artwork IDs and then requests detailed information for individual artworks, including available public-domain images.

## Project Structure

```text
src/
├── assets/
│   └── hero.webp
├── components/
│   ├── ArtworkCard/
│   ├── Footer/
│   └── Header/
├── fonts/
│   ├── fonts.css
│   └── local font files
├── pages/
│   ├── Explore/
│   ├── Favorites/
│   └── Home/
├── utils/
│   ├── artApi.js
│   └── constants.js
├── App.css
├── App.jsx
├── index.css
└── main.jsx
```

## Running the Project Locally

Clone the repository:

```bash
git clone https://github.com/Leahpolyglot/art-atlas.git
```

Navigate to the project directory:

```bash
cd art-atlas
```

Install the dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Run the linter:

```bash
npm run lint
```

Create a production build:

```bash
npm run build
```

## What I Learned

Through this project, I strengthened my understanding of React component architecture, state management, API integration, asynchronous JavaScript, routing, responsive design, and browser storage.

I also gained experience handling real-world API data, including loading, empty, and error states, while building a complete application from development to production deployment.

## Deployment

The project is deployed with Vercel and connected to the GitHub repository for continuous deployment.
