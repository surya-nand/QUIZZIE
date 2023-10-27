import React from "react";
import { useState, useCallback } from "react";
import "./../Dashboard/dashboard.modules.css";

function Dashboard() {
  const [isCreateQuizFormOpen, setIsCreateQuizFormOpen] = useState(false);
  const [isQuizQuestiontype, setIsQuizQuestionType] = useState(false);
  const [isQuizPollType, setIsQuizPollType] = useState(false);
  const [isQuestionQuizFormOpen, setISQuestionQuizFormOpen] = useState(false);
  const [isPollQuizFormOpen, setIsPollQuizFormOpen] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [quizName, setQuizName] = useState({
    quizName: "",
  });

  const handleQuizDashboardOpen = () => {};
  const handleQuizAnalyticsOpen = () => {};
  const handleCreateQuizOpen = () => {
    setIsCreateQuizFormOpen(true);
  };

  const handleQuizQuestionFormatSelection = () => {
    setIsQuizQuestionType(true);
    setIsQuizPollType(false);
  };

  const handleQuizPollFormatSelection = () => {
    setIsQuizQuestionType(false);
    setIsQuizPollType(true);
  };
  const handleCloseCreateQuizForm = () => {
    setIsCreateQuizFormOpen(false);
  };

  const handleSubmitCreateQuizFormInputs = (event) => {
    event.preventDefault();
    if (!isQuizQuestiontype && !isQuizPollType) {
      window.alert("Select quiz type");
    }
    if (isQuizQuestiontype) {
      setIsCreateQuizFormOpen(false);
      setISQuestionQuizFormOpen(true);
    }
    if (isQuizPollType) {
      setIsCreateQuizFormOpen(false);
      setIsPollQuizFormOpen(true);
    }
  };
  const handleQuizNameChange = (event) => {
    const { name, value } = event.target;
    setQuizName((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  //handling functions at creating questions for quiz

  const [selectedQuizOptionsFormat, setSelectedQuizOptionsFormat] =
    useState("");

  const handleSelectedQuizOptionsFormatChange = useCallback((optionType) => {
    setSelectedQuizOptionsFormat(optionType);
  }, []);

  const [questions, setQuestions] = useState([
    {question: "",
    options: ["", "", "", ""],
    correctAnswer: "",},
    {question: "",
    options: ["", "", "", ""],
    correctAnswer: "",}
  ]);

  const handleAddQuestion = () => {
    if (questions.length <= 5){
        const newQuestionIndex = currentQuestionIndex + 1;
    setCurrentQuestionIndex(newQuestionIndex);
    setQuestions((prevQuestions) => [
      ...prevQuestions,
      {
        question: "",
        options: ["", "", "", ""],
        correctAnswer: "",
      },
    ]);
    }
    else{
        window.alert("Only a max of 5 questions can be created")
    }
  };

  //

  return (
    <div className="dashboard-page">
      <div className="dashboard-menu">
        <h1>QUIZZIE</h1>
        <div className="dashboard-menu-options">
          <p onClick={handleQuizDashboardOpen}>Dashboard</p>
          <p onClick={handleQuizAnalyticsOpen}>Analytics</p>
          <p onClick={handleCreateQuizOpen}>Create Quiz</p>
        </div>
        <div className="logout-above-stroke"></div>
        <h2 className="user-logout-button">LOGOUT</h2>
      </div>
      {isCreateQuizFormOpen && (
        <>
          <div className="overlay">
            <form method="POST" onSubmit={handleSubmitCreateQuizFormInputs}>
              <div className="create-quiz-name-and-type">
                <input
                  type="text"
                  name="quizName"
                  value={quizName.quizName}
                  className="quiz-name-input"
                  placeholder="Quiz name"
                  required
                  maxLength={5}
                  minLength={3}
                  onChange={handleQuizNameChange}
                ></input>
                <div className="quiz-type">
                  <h2>Quiz Type</h2>
                  <p
                    className={`quiz-question-type-button ${
                      isQuizQuestiontype ? "active" : ""
                    }`}
                    onClick={handleQuizQuestionFormatSelection}
                  >
                    Q & A
                  </p>
                  <p
                    className={`quiz-poll-type-button ${
                      isQuizPollType ? "active" : ""
                    }`}
                    onClick={handleQuizPollFormatSelection}
                  >
                    Poll type
                  </p>
                </div>
                <div className="create-quiz-continue-cancel-buttons">
                  <p
                    onClick={handleCloseCreateQuizForm}
                    className="create-quiz-cancel-button"
                  >
                    Cancel
                  </p>
                  <button type="submit" className="create-quiz-continue-button">
                    Continue
                  </button>
                </div>
              </div>
            </form>
          </div>
        </>
      )}
      {isQuestionQuizFormOpen && (
        <>
          <div className="overlay">
            <div className="create-question-quiz-form">
              <div className="question-numbers-component">
                <p>{currentQuestionIndex + 1}</p>
                <p onClick={handleAddQuestion}>+</p>
                <p>Max 5questions</p>
              </div>
              <input
                placeholder="Poll Question"
                type="text"
                name="pollQuestion"
                required
              ></input>
              <div className="question-options-type">
                <p>Option Type</p>
                <form>
                  <div>
                    <label>
                      <input
                        type="radio"
                        value="text"
                        checked={selectedQuizOptionsFormat === "text"}
                        onChange={() =>
                          handleSelectedQuizOptionsFormatChange("text")
                        }
                      ></input>
                      Text
                    </label>
                  </div>
                  <div>
                    <label>
                      <input
                        type="radio"
                        value="ImageURL"
                        checked={selectedQuizOptionsFormat === "ImageURL"}
                        onChange={() =>
                          handleSelectedQuizOptionsFormatChange("ImageURL")
                        }
                      ></input>
                      Image URL
                    </label>
                  </div>
                  <div>
                    <label>
                      <input
                        type="radio"
                        value="TextnImage"
                        checked={selectedQuizOptionsFormat === "TextnImage"}
                        onChange={() =>
                          handleSelectedQuizOptionsFormatChange("TextnImage")
                        }
                      ></input>
                      Text & Image URL
                    </label>
                  </div>
                </form>
              </div>
              <div className="quiz-answer-inputs">
                {selectedQuizOptionsFormat === "text" ? (
                  <div>
                    <label>
                      <input type="radio"></input>
                      text
                    </label>
                    <label>
                      <input type="radio"></input>
                    </label>
                  </div>
                ) : (
                  <></>
                )}
                {selectedQuizOptionsFormat === "ImageURL" ? (
                  <div>
                    <label>
                      <input type="radio"></input>
                      Image
                    </label>
                    <label>
                      <input type="radio"></input>
                    </label>
                  </div>
                ) : (
                  <></>
                )}
                {selectedQuizOptionsFormat === "TextnImage" ? (
                  <div>
                    <label>
                      <input type="radio"></input>
                      Text and Image
                    </label>
                    <label>
                      <input type="radio"></input>
                    </label>
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        </>
      )}
      <div className="dashboard-content">Content</div>
    </div>
  );
}

export default Dashboard;
