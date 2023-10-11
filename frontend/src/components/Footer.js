// Footer.js
import SocialMediaLinks from "./SocialMediaLinks";

const Footer = () => {
  return (
    <footer>
      <p>&copy; {new Date().getFullYear()} BarbershopMP</p>
      <p>Contact: Barbershopmp@email.com</p>
      <p>Address: Fredikanterassi 1, 00540 Helsinki</p>
      <SocialMediaLinks />
    </footer>
  );
};

export default Footer;
