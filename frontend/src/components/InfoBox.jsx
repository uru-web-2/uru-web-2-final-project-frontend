import '../components/CSS/InfoBox.css';

function InfoBox() {
  return (
    <div className="info-box">
      <img src="/Logo.png" alt="U-Book Logo" className="logo" />
      <h2>WELCOME TO U-BOOK!</h2>
      <img src="/Libro.png" alt="Book Image" className="book-image" />
      <p><b>Your Books Your Library</b> <br /> since 2025 </p>
    </div>
  );
}

export default InfoBox;