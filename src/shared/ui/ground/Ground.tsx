import "./Ground.css";

type GroundProps = {
  text?: string;
  img_src?: string;
};

const Ground = ({ text, img_src }: GroundProps) => {
  const objects = [];
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      objects.push(<div key={`${i}-${j}`} className="grid-item"></div>);
    }
  }

  const key = "3-5"; // Пример уникального ключа
  const element = document.querySelector(`div[key="${key}"]`);
  if (element) {
    element.classList.add("element");
  }

  return (
    <>
      <div className="ground-wrapper">
        {" "}
        <div className="grid-container">{objects}</div>{" "}
        <div className="ground__name_wrapper">
          <img src={img_src} alt="ground"></img>
          <p className="ground__name">{text}</p>{" "}
        </div>
      </div>
    </>
  );
};

export default Ground;
