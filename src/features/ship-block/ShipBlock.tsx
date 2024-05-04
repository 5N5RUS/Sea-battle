import "./ShipBlock.css";
import "../../shared/ui/ground/Ground.css";

type ShipBlockProps = {
  ship_count: number;
  className: string;
  text?: string;
  status: boolean
  disabled: boolean
};

const ShipBlock = ({ ship_count, className, text, status, disabled }: ShipBlockProps) => {
  const n = ship_count;

  const ships = [];
  for (let i = 0; i < n; i++) {
    ships.push(<div className={`${className} ${status ? "hide" : null} ${disabled ? "border-disabled" : ""}`}></div>);
  }
  return (
    <>
      <div>
        <p className={`arrangement-text ${disabled ? "text-disabled" : ""}`}>{text}</p>
        <div className={`ships-wrapper`}>{ships}</div>
      </div>
    </>
  );
};

export default ShipBlock;
