import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <h3>☁️ SkySense</h3>
        <p>Bringing you real-time weather insights, beautifully.</p>
        <p className="footer-credit">
          © {new Date().getFullYear()} SkySense | Built with ❤️ for nature
        </p>
      </div>
    </footer>
  );
}

export default Footer;
