import "./ShipBlock.css";

type ShipBlockProps = {
  ship_count: number;
  className: string;
  text: string;
};

const ShipBlock = ({ ship_count, className, text }: ShipBlockProps) => {
  const n = ship_count;

  const ships = [];
  for (let i = 0; i < n; i++) {
    ships.push(<div className={`${className}`}></div>);
  }

  return (
    <>
      <div>
        <p>{text}</p>
        <div className="ships-wrapper">{ships}</div>
      </div>
    </>
  );
};

export default ShipBlock;
