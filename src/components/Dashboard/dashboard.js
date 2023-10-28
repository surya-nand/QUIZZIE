import React from "react";
import { useState, useCallback } from "react";
import "./../Dashboard/dashboard.modules.css";
import closeSymbol from "../../Assets/charm_cross.png";

function Dashboard() {
  const [isCreateQuizFormOpen, setIsCreateQuizFormOpen] = useState(false);
  const [isQuizQuestiontype, setIsQuizQuestionType] = useState(false);
  const [isQuizPollType, setIsQuizPollType] = useState(false);
  const [isQuestionQuizFormOpen, setISQuestionQuizFormOpen] = useState(false);
  const [isPollQuizFormOpen, setIsPollQuizFormOpen] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentOptionIndex, setCurrentOptionIndex] = useState(0);
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

  const handleActiveQuestionClick = (e, index) => {
    e.preventDefault();
    handleActiveQuestion(index);
    console.log(index);
  };

  const handleActiveQuestion = (index) => {
    setCurrentQuestionIndex(index);
  };

  const [questions, setQuestions] = useState([
    {
      question: "",
      options: [
        { text: "", imageURL: "" },
        { text: "", imageURL: "" },
      ],
      correctAnswer: null,
      timer: null,
    },
    {
      question: "",
      options: [
        { text: "", imageURL: "" },
        { text: "", imageURL: "" },
      ],
      correctAnswer: null,
      timer: null,
    },
  ]);

  const handleAddQuestion = () => {
    if (questions.length <= 5) {
      setQuestions((prevQuestions) => [
        ...prevQuestions,
        {
          question: "",
          options: [{ text: "", imageURL: "" }],
          correctAnswer: null,
          timer: null,
        },
      ]);
    } else {
      window.alert("Only a max of 5 questions can be created");
    }
  };

  const handleRemoveQuestion = (index) => {
    const updatedQuestions = [...questions];
    updatedQuestions.splice(index, 1);
    setQuestions(updatedQuestions);
  };

  const handleQuestionInputChange = (index, field, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index][field] = value;
    setQuestions(updatedQuestions);
  };

  const handleOptionInputChange = (
    questionIndex,
    optionIndex,
    optionType,
    value
  ) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options[optionIndex][optionType] = value;
    setQuestions(updatedQuestions);
  };

  const handleSelectCorrectAnswer = (questionIndex, option) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].correctAnswer = option;
    setQuestions(updatedQuestions);
  };

  const handleAddOption = (index) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].options.push({ text: "", imageURL: "" });
    setQuestions(updatedQuestions);
  };

  const handleRemoveOption = (index, optionIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].options.splice(optionIndex, 1);
    setQuestions(updatedQuestions);
  };

  const handleQuestionTimerClick = (index,timeInSeconds) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].timer = timeInSeconds;
    setQuestions(updatedQuestions)
  }
  //

  const handleCloseQuestionQuizForm = (e) => {
     e.preventDefault(); 
  
  }

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
                {questions.map((_, index) => (
                  <>
                    <button
                      key={index}
                      onClick={(e) => handleActiveQuestionClick(e, index)}
                    >
                      {index + 1}
                    </button>
                    {questions.length > 2 && index >= 1 && (
                      <div
                        onClick={(e) => handleRemoveQuestion(index)}
                        className="question-remove-symbol"
                      >
                        <img src={closeSymbol} alt="close-symbol"></img>
                      </div>
                    )}
                  </>
                ))}
                {questions.length < 5 && <p onClick={handleAddQuestion}>+</p>}
                <p>Max 5questions</p>
              </div>
              <input
                placeholder={`Question ${currentQuestionIndex + 1}`}
                value={questions[currentQuestionIndex].question}
                type="text"
                name="pollQuestion"
                onChange={(e) =>
                  handleQuestionInputChange(
                    currentQuestionIndex,
                    "question",
                    e.target.value
                  )
                }
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
                {selectedQuizOptionsFormat === "text" ||
                selectedQuizOptionsFormat === "ImageURL" ? (
                  <>
                    {questions[currentQuestionIndex].options.map(
                      (option, optionIndex) => (
                        <div key={optionIndex}>
                          <label>
                            <input
                              type="text"
                              placeholder={
                                selectedQuizOptionsFormat === "text"
                                  ? "Text"
                                  : "Image URL"
                              }
                              value={
                                selectedQuizOptionsFormat === "text"
                                  ? option.text
                                  : option.imageURL
                              }
                              onChange={(e) =>
                                handleOptionInputChange(
                                  currentQuestionIndex,
                                  optionIndex,
                                  selectedQuizOptionsFormat === "text"
                                    ? "text"
                                    : "imageURL",
                                  e.target.value
                                )
                              }
                            ></input>
                            <input
                              type="radio"
                              checked={
                                questions[currentQuestionIndex]
                                  .correctAnswer ===
                                (selectedQuizOptionsFormat === "text"
                                  ? option.text
                                  : option.imageURL)
                              }
                              onChange={() =>
                                handleSelectCorrectAnswer(
                                  currentQuestionIndex,
                                  selectedQuizOptionsFormat === "text"
                                    ? option.text
                                    : option.imageURL
                                )
                              }
                            ></input>
                          </label>
                          {questions[currentQuestionIndex].options.length > 2 &&
                            optionIndex > 1 && (
                              <button
                                onClick={() =>
                                  handleRemoveOption(
                                    currentQuestionIndex,
                                    optionIndex
                                  )
                                }
                              >
                                Remove
                              </button>
                            )}
                        </div>
                      )
                    )}
                  </>
                ) : (
                  <></>
                )}
                {selectedQuizOptionsFormat === "TextnImage" ? (
                  <>
                    {questions[currentQuestionIndex].options.map(
                      (option, optionIndex) => (
                        <div key={optionIndex}>
                          <label>
                            <input
                              type="text"
                              placeholder="Text"
                              value={option.text}
                              onChange={(e) =>
                                handleOptionInputChange(
                                  currentQuestionIndex,
                                  optionIndex,
                                  "text",
                                  e.target.value
                                )
                              }
                            ></input>
                            <input
                              type="text"
                              placeholder="Image URL"
                              value={option.imageURL}
                              onChange={(e) =>
                                handleOptionInputChange(
                                  currentQuestionIndex,
                                  optionIndex,
                                  "imageURL",
                                  e.target.value
                                )
                              }
                            ></input>
                            <input
                              type="radio"
                              checked={
                                questions[currentQuestionIndex]
                                  .correctAnswer ===
                                `${option.text} ${option.imageURL}`
                              }
                              onChange={() =>
                                handleSelectCorrectAnswer(
                                  currentQuestionIndex,
                                  `${option.text} ${option.imageURL}`
                                )
                              }
                            ></input>
                          </label>
                          {questions[currentQuestionIndex].options.length > 2 &&
                            optionIndex > 1 && (
                              <button
                                onClick={() =>
                                  handleRemoveOption(
                                    currentQuestionIndex,
                                    optionIndex
                                  )
                                }
                              >
                                Remove
                              </button>
                            )}
                        </div>
                      )
                    )}
                  </>
                ) : (
                  <></>
                )}
              </div>
              {questions[currentQuestionIndex].options.length < 4 && (
                <button onClick={() => handleAddOption(currentQuestionIndex)}>
                  Add option
                </button>
              )}
              <div className="quiz-each-question-timer">
                <p>Timer</p>
                <button>OFF</button>
                <button onclick = {(e) => handleQuestionTimerClick(currentQuestionIndex,5)}>5 SEC</button>
                <button onClick={(e) => handleQuestionTimerClick(currentQuestionIndex,10)}>10 SEC</button>
              </div>
              <div className="cancel-create-quiz-buttons">
                <button onclick={handleCloseQuestionQuizForm}>Cancel</button>
                <button onClick={handleCreateQuestionQuizFormSubmit}>Create Quiz</button>
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
