import "./TestPage.css";

import { loremIpsum } from "lorem-ipsum";

type BuildPagesProps = {
  index: number;
};

const BuildPage = ({ index }: BuildPagesProps) => (
  <>
    <h3 className="testpage">Page {index}</h3>
    <div className="testpage">
      Page {index} content: {loremIpsum({ count: 20 })}
    </div>
  </>
);

export default BuildPage;
