import React, { useState, useEffect } from "react";
import axios from "axios";
import "./../QuizPage/Quizpage.modules.css";
const BASE_URL = "http://localhost:5000";

function Quizpage(props) {
  const [invalidLink, setInvalidLink] = useState("");
  const { quizId } = props;
  const [quizDetails, setQuizDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [time, setTime] = useState(0);

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/quizData/${quizId}`);
        if (response.data.message === "Quiz not found or Invalid Link") {
          setInvalidLink("Invalid Link. Quiz doesn't exist");
        } else {
          setQuizDetails(response.data.quizDetails);
        }
      } catch (error) {
        console.error("Error fetching quiz data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchQuizData();
  }, [quizId]);

  
  useEffect(() => {
    let interval;
    if (quizDetails.questions && quizDetails.questions.length > 0) {
      const currentQuestion = quizDetails.questions[currentQuestionIndex];
      const timer = currentQuestion.timer;
      if (timer) {
        setTime(timer);
        interval = setInterval(() => {
          setTime((prevTime) => {
            if (prevTime === 1) {
              handleNextQuestion();
            }
            return prevTime - 1;
          });
        }, 1000);
      }
    }
    return () => clearInterval(interval);
  }, [currentQuestionIndex, quizDetails.questions]);

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quizDetails.questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setTime(0);
    } else {
      setShowResults(true);
    }
  };

  const handleOptionSelect = (questionIndex, optionIndex) => {
    setSelectedOptions((prevSelectedOptions) => ({
      ...prevSelectedOptions,
      [questionIndex]: optionIndex,
    }));
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (invalidLink) {
    return (
      <div>
        <h1>Invalid Link</h1>
        <p>Quiz doesn't exist</p>
      </div>
    );
  }

  const currentQuestion = quizDetails.questions[currentQuestionIndex];

  return (
    <div className="quiz-page">
    <div className="quiz-arena">
      <div className="question-number-and-timer-div">
        <p className="question-number-in-quiz">
          {currentQuestionIndex + 1}/{quizDetails.questions.length}
        </p>
        <p className="question-timer-div">{formatTime(time)}</p>
      </div>
      <h1 className="quiz-each-question">{currentQuestion.question}</h1>
      <div className="quiz-options-div">
        {currentQuestion.options.map((option, optionIndex) => (
          <div className="quiz-options" key={optionIndex}>
            {currentQuestion.optionFormat === "text" && (
              <button
                id={`option_${optionIndex}`}
                name={`question_${currentQuestionIndex}`}
                className={`text-option-button ${
                  selectedOptions[currentQuestionIndex] === optionIndex ? "selected" : ""
                }`}
                onClick={() => handleOptionSelect(currentQuestionIndex, optionIndex)}
              >
                {option.text}
              </button>
            )}
            {currentQuestion.optionFormat === "ImageURL" && (
              <button
                id={`option_${optionIndex}`}
                name={`question_${currentQuestionIndex}`}
                className={`image-option-button ${
                  selectedOptions[currentQuestionIndex] === optionIndex ? "selected" : ""
                }`}
                onClick={() => handleOptionSelect(currentQuestionIndex, optionIndex)}
              >
                <img className="image-in-image-type-button" src={option.imageURL} alt={`option ${optionIndex}`}></img>
              </button>
            )}
            {currentQuestion.optionFormat === "TextnImage" && (
              <button
                id={`option_${optionIndex}`}
                name={`question_${currentQuestionIndex}`}
                className={`text-and-image-option-button ${
                  selectedOptions[currentQuestionIndex] === optionIndex ? "selected" : ""
                }`}
                onClick={() => handleOptionSelect(currentQuestionIndex, optionIndex)}
              >
                <div className="text-image-quiz-options-div">
                  <p className="">{option.text}</p>
                  <img src={option.imageURL} alt={`option ${optionIndex}`}></img>
                </div>
              </button>
            )}
          </div>
        ))}
      </div>
      <button className="next-submit-button" onClick={handleNextQuestion}>
        {currentQuestionIndex === quizDetails.questions.length - 1 ? "SUBMIT" : "NEXT"}
      </button>
    </div>
    </div>
  );
}

export default Quizpage;

