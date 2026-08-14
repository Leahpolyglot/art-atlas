import { Link } from "react-router-dom";
import heroImage from "../../assets/hero.webp";
import "./Home.css";

function Home() {
  return (
    <main className="home">
      <section className="home__hero">
        <div className="home__content">
          <p className="home__eyebrow">Art discovery, made simple.</p>

          <h2 className="home__title">Discover art beyond borders.</h2>

          <p className="home__description">
            Explore artworks from museum collections, discover artists, and save
            the pieces that inspire you.
          </p>

          <Link to="/explore" className="home__button">
            Explore the collection
          </Link>
        </div>

        <div className="home__visual">
          <div className="home__visual-frame">
            <img
              className="home__visual-image"
              src={heroImage}
              alt="Featured artwork for Art Atlas"
            />
          </div>

          <div className="home__visual-caption">
            <p className="home__visual-label">Curated inspiration</p>
            <p className="home__visual-text">
              Selected artwork from the collection
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;
