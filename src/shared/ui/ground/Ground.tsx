import "./Ground.css";

type GroundProps = {
  text?: string;
};

const Ground = ({ text }: GroundProps) => {
  const n = 100;

  const objects = [];
  for (let i = 0; i < n; i++) {
    objects.push(<div className="grid-item"></div>);
  }

  return (
    <>
      <div className="ground-wrapper">
        {" "}
        <div className="grid-container">{objects}</div>{" "}
        <p className="ground__name">{text}</p>{" "}
      </div>
    </>
  );
};

export default Ground;
