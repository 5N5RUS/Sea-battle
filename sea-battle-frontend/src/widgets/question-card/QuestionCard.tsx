import "./QuestionCard.css"

import AnswerQuestion from "src/features/answer-question/AnswerQuestion";
import ChooseAnswer from "src/features/choose-answer/ChooseAnswer";

type QuestionCardProps = {
    questionNumber: number;
    points: number; 
    description: string;
};




const QuestionCard = ({ questionNumber, points, description }: QuestionCardProps) => {
    return (
        <div className="question-card">
            <header className="question-card_header">
                <h2 className="question-card_title">Question {questionNumber}</h2>
                <p className="question-card_points">Points: {points}</p>
            </header>
            <main className="question-card_main">
                <p className="question-card_description">{description}</p>
                <ChooseAnswer answers={["First", "Second", "Third", "Fourth"]}/>
                <AnswerQuestion/>
            </main>
        </div>
    )
}

export default QuestionCard;