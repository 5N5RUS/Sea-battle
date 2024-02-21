import "./ChooseAnswer.css"

import Button from "src/shared/ui/button/Button";

type ChooseAnswerProps = {
    answers: string[];
}

const ChooseAnswer = ({ answers }: ChooseAnswerProps) => {
    return (
        <ul className="answer-list">
            {answers.map((answer) => (
                <li key={answer} className="answer-list_item">
                    <Button 
                        className={"answer-list_item-button"}
                        onClick={() => {
                            alert('You clicked me!');
                        }}
                        disabled= {false}
                        text="Question"
                    />
                </li>
            ))}
        </ul>
    )
};

export default ChooseAnswer;