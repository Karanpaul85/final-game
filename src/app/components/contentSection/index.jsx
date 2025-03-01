import style from "./Content.module.css";
const ContentSection = ({ data }) => {
  if (!data) {
    return;
  }
  return (
    <div
      className={style.topContent}
      dangerouslySetInnerHTML={{ __html: data }}
    />
  );
};
export default ContentSection;
