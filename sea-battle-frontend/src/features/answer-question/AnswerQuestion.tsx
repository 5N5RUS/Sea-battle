import "./AnswerQuestion.css"

import Button from "src/shared/ui/button/Button";

const AnswerQuestion = () => {
    return (
        <div className="answer_button-wrapper">
            <Button 
                className={"answer_button"}
                onClick={() => {
                    alert('Answer is accepted');
                }}
                disabled= {false}
                text="Answer"
            />
        </div>
    )

}

export default AnswerQuestion;