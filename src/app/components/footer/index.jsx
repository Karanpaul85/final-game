import style from "./Footer.module.css";

const Footer = ({ content }) => {
  return (
    <footer className={style.footer}>
      <p>{content}</p>
    </footer>
  );
};
export default Footer;
