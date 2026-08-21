import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__copyright">© 2026 Art Atlas</p>

      <p className="footer__text">
        Discover art from museum collections around the world.
      </p>

      <a
        className="footer__link"
        href="https://github.com/Leahpolyglot/art-atlas"
        target="_blank"
        rel="noreferrer"
        aria-label="Open the Art Atlas GitHub repository in a new tab"
      >
        <svg className="footer__icon" viewBox="0 0 19 19" aria-hidden="true">
          <use href="/icons.svg#github-icon" />
        </svg>
        GitHub
      </a>
    </footer>
  );
}

export default Footer;
