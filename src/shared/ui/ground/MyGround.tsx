import "./Ground.css";

type GroundProps = {
  text?: string;
  img_src?: string;
};

const MyGround = ({ text, img_src }: GroundProps) => {
  const objects = [];
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      const key = JSON.stringify({ axis: i, ordinate: j });
      objects.push(<div key={key} className="my-grid-item"></div>);
    }
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

export default MyGround;
