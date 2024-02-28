import { loremIpsum } from 'lorem-ipsum';
import "./TestPage.css"

type BuildPagesProps = {
  index: number;
};


const BuildPage = ({index}: BuildPagesProps) => (
  <>
    <h3 className='testpage'>Page {index}</h3>
    <div className='testpage'>
      Page {index} content: { loremIpsum({ count: 20 })}
    </div>
  </>
);

export default BuildPage;
