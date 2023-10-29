import React from "react";
import { useState} from "react";
import "./../Dashboard/dashboard.modules.css";
import closeSymbol from "../../Assets/charm_cross.png";
import plusSymbol from '../../Assets/plusSymbol.png';
import deleteSymbol from '../../Assets/deleteSymbol.png';

function Dashboard() {
  const [isCreateQuizFormOpen, setIsCreateQuizFormOpen] = useState(false);
  const [isQuizQuestiontype, setIsQuizQuestionType] = useState(false);
  const [isQuizPollType, setIsQuizPollType] = useState(false);
  const [isQuestionQuizFormOpen, setISQuestionQuizFormOpen] = useState(true);
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

  const handleSelectedQuizOptionsFormatChange = (index, optionType) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].optionFormat = optionType;
    setQuestions(updatedQuestions);
  };

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
        { text: "", imageURL: "" },
      ],
      correctAnswer: null,
      timer: null,
      optionFormat: "text",
    },
    {
      question: "",
      options: [
        { text: "", imageURL: "" },
        { text: "", imageURL: "" },
        { text: "", imageURL: "" },
      ],
      correctAnswer: null,
      timer: null,
      optionFormat: "text",
    },
  ]);

  const handleAddQuestion = () => {
    if (questions.length <= 5) {
      setQuestions((prevQuestions) => [
        ...prevQuestions,
        {
          question: "",
          options: [{ text: "", imageURL: "" },{ text: "", imageURL: "" },{ text: "", imageURL: "" }],
          correctAnswer: null,
          timer: null,
          optionFormat: "text",
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

  const handleQuestionTimerClick = (index, timeInSeconds) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].timer = timeInSeconds;
    setQuestions(updatedQuestions);
  };
  //

  const handleCloseQuestionQuizForm = (e) => {
    e.preventDefault();
    setISQuestionQuizFormOpen(false);
  };

  const handleCreateQuestionQuizFormSubmit = (e) => {
    e.preventDefault();
  };

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
                      className={`question-number-div ${
                        index === 0 ? "first-question" : ""
                      } ${
                        index === currentQuestionIndex ? "active-question" : ""
                      }`}
                      onClick={(e) => handleActiveQuestionClick(e, index)}
                    >
                      {index + 1}
                    </button>
                    {questions.length >= 2 && index >= 1 && (
                      <div
                        onClick={(e) => handleRemoveQuestion(index)}
                        className="question-remove-symbol"
                      >
                        <img src={closeSymbol} alt="close-symbol"></img>
                      </div>
                    )}
                  </>
                ))}
                {questions.length < 5 && <img 
                src={plusSymbol}
                alt="plus-symbol"
                className="add-question-symbol" onClick={handleAddQuestion}></img>}
                <p className="max-5-questions-message">Max 5 Questions</p>
              </div>
              <input
                className="quiz-question-input-div"
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
                <p className="option-type-text">Option Type</p>
                <form>
                  <div className="different-option-types">
                    <div className="each-option-with-label">
                      <label className="option-type-text">
                        <input
                          type="radio"
                          value="text"
                          checked={
                            questions[currentQuestionIndex].optionFormat ===
                            "text"
                          }
                          onChange={() =>
                            handleSelectedQuizOptionsFormatChange(
                              currentQuestionIndex,
                              "text"
                            )
                          }
                        ></input>
                        <p>Text</p>
                      </label>
                    </div>
                    <div className="each-option-with-label">
                      <label className="option-type-text">
                        <input
                          type="radio"
                          value="ImageURL"
                          checked={
                            questions[currentQuestionIndex].optionFormat ===
                            "ImageURL"
                          }
                          onChange={() =>
                            handleSelectedQuizOptionsFormatChange(
                              currentQuestionIndex,
                              "ImageURL"
                            )
                          }
                        ></input>
                        <p className="image-url-text">Image URL</p>
                      </label>
                    </div>
                    <div className="each-option-with-label">
                      <label className="option-type-text">
                        <input
                          type="radio"
                          value="TextnImage"
                          checked={
                            questions[currentQuestionIndex].optionFormat ===
                            "TextnImage"
                          }
                          onChange={() =>
                            handleSelectedQuizOptionsFormatChange(
                              currentQuestionIndex,
                              "TextnImage"
                            )
                          }
                        ></input>
                        <p className="image-url-text">Text & Image URL</p>
                      </label>
                    </div>
                  </div>
                </form>
              </div>
              <div className="quiz-answer-inputs">
                {questions[currentQuestionIndex].optionFormat === "text" ||
                questions[currentQuestionIndex].optionFormat === "ImageURL" ? (
                  <>
                    {questions[currentQuestionIndex].options.map(
                      (option, optionIndex) => (
                        <div key={optionIndex} className="question-options-div">
                          <input
                            type="radio"
                            className="options-input-radio-div"
                            checked={
                              questions[currentQuestionIndex].correctAnswer ===
                              (questions[currentQuestionIndex].optionFormat === "text"
                                ? option.text
                                : option.imageURL)
                            }
                            onChange={() =>
                              handleSelectCorrectAnswer(
                                currentQuestionIndex,
                                questions[currentQuestionIndex].optionFormat === "text"
                                  ? option.text
                                  : option.imageURL
                              )
                            }
                          ></input>
                          <input
                            type="text"
                            className="options-input-div"
                            placeholder={
                              questions[currentQuestionIndex].optionFormat === "text"
                                ? "Text"
                                : "Image URL"
                            }
                            value={
                              questions[currentQuestionIndex].optionFormat === "text"
                                ? option.text
                                : option.imageURL
                            }
                            onChange={(e) =>
                              handleOptionInputChange(
                                currentQuestionIndex,
                                optionIndex,
                                questions[currentQuestionIndex].optionFormat === "text"
                                  ? "text"
                                  : "imageURL",
                                e.target.value
                              )
                            }
                          ></input>

                          {questions[currentQuestionIndex].options.length > 2 &&
                            optionIndex > 1 && (
                              <button
                              className="delete-symbol-button"
                                onClick={() =>
                                  handleRemoveOption(
                                    currentQuestionIndex,
                                    optionIndex
                                  )
                                }
                              >
                                <img
                                alt="delete-symbol"
                                
                                src={deleteSymbol}>
                                </img>
                              </button>
                            )}
                        </div>
                      )
                    )}
                  </>
                ) : (
                  <></>
                )}
                {questions[currentQuestionIndex].optionFormat ===
                "TextnImage" ? (
                  <>
                    {questions[currentQuestionIndex].options.map(
                      (option, optionIndex) => (
                        <div key={optionIndex} className="question-options-div">
                            <input
                              type="radio"
                              className="options-input-radio-div"
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
                            <input
                              type="text"
                              placeholder="Text"
                              className="options-input-div"
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
                              className="options-input-div"
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
                            
                      
                          {questions[currentQuestionIndex].options.length > 2 &&
                            optionIndex > 1 && (
                              <button
                              className="delete-symbol-button"
                                onClick={() =>
                                  handleRemoveOption(
                                    currentQuestionIndex,
                                    optionIndex
                                  )
                                }
                              >
                                <img
                                alt="delete-symbol"
                                
                                src={deleteSymbol}>
                                </img>
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
                <button
                  className="add-option-button"
                  onClick={() => handleAddOption(currentQuestionIndex)}
                >
                  Add option
                </button>
              )}
              <div className="quiz-each-question-timer">
                <p>Timer</p>
                <button
                  className={
                    questions[currentQuestionIndex].timer === null
                      ? "active"
                      : ""
                  }
                  onClick={(e) =>
                    handleQuestionTimerClick(currentQuestionIndex, null)
                  }
                >
                  OFF
                </button>
                <button
                  className={
                    questions[currentQuestionIndex].timer === 5 ? "active" : ""
                  }
                  onClick={(e) =>
                    handleQuestionTimerClick(currentQuestionIndex, 5)
                  }
                >
                  5 sec
                </button>
                <button
                  className={
                    questions[currentQuestionIndex].timer === 10 ? "active" : ""
                  }
                  onClick={(e) =>
                    handleQuestionTimerClick(currentQuestionIndex, 10)
                  }
                >
                  10 sec
                </button>
              </div>
              <div className="cancel-create-quiz-buttons">
                <button className="cancel-question-form-button" onClick={handleCloseQuestionQuizForm}>Cancel</button>
                <button className="create-question-form-button" onClick={handleCreateQuestionQuizFormSubmit}>
                  Create Quiz
                </button>
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
