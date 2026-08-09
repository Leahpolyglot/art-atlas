# Art Atlas

Art Atlas is a React application that allows users to explore artworks from museum collections, search by artist or keyword, and save their favorite pieces.

The project was built as a final portfolio project and focuses on working with a third-party API, reusable React components, responsive design, loading states, error handling, routing, and local persistence.

## Features

- Search artworks by artist, title, or keyword
- Display artwork information including image, title, artist, and date
- Save and remove favorite artworks
- Persist favorites using localStorage
- Responsive layout for mobile, tablet, and desktop
- Loading indicator while fetching data
- Empty state when no artworks are found
- Error state when a request fails
- Multi-page navigation using React Router

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

Allows users to search for artworks and displays matching results in reusable artwork cards.

### Favorites

Displays artworks saved by the user and allows them to remove pieces from their personal collection.

## API

Art Atlas uses The Metropolitan Museum of Art Collection API.

The application first searches for matching artwork IDs and then requests detailed information for individual artworks, including available public-domain images.

## Project Structure

```text
src/
├── assets/
├── components/
│   ├── ArtworkCard/
│   ├── Footer/
│   └── Header/
├── pages/
│   ├── Explore/
│   ├── Favorites/
│   └── Home/
├── utils/
│   └── artApi.js
├── App.css
├── App.jsx
├── index.css
└── main.jsx
```
