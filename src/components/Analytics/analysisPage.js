import React from "react";
import "./analyticsPage.modules.css";
import axios from "axios";
import { useState, useEffect } from "react";
import deleteSymbol from "./../../Assets/deleteSymbol.png";
import editSymbol from "./../../Assets/editSymbol.png";
import shareSymbol from "./../../Assets/shareSymbol.png";

const BASE_URL = "http://localhost:5000";

function AnalyticsPage() {
  const [quizData, setQuizData] = useState([]);
  const formatNumber = (number) => {
    if (number > 999) {
      const formattedNumber = new Intl.NumberFormat("en-US", {
        notation: "compact",
        compactDisplay: "short",
      }).format(number);
      return formattedNumber;
    }
    return number;
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/quizData`);
        setQuizData(response.data.quizzes);
      } catch (error) {
        console.error("Error fetching quiz data:", error);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="analytics-page">
      <h1 className="quiz-analysis-heading">Quiz Analysis</h1>
      <div className="quiz-analysis-table">
        <div className="quiz-analysis-table-headings">
          <p className="analysis-table-serial-number-heading">S.No</p>
          <p className="analysis-table-quiz-name-heading">Quiz Name</p>
          <p className="analysis-table-created-on-heading">Created on</p>
          <p className="analysis-table-impression-heading">Impression</p>
        </div>
        {quizData.map((quiz, index) => (
          <div className={`each-quiz-analysis ${(index+1)%2 === 0 ? 'even-div' : ''}`} key={index}>
            <p className="each-quiz-serial-number">{index + 1}</p>
            <p className="each-quiz-quiz-name">{quiz.quizName}</p>
            <p className="each-quiz-created-date">{quiz.createdDate}</p>
            <p className="each-quiz-impression">{formatNumber(quiz.impressions)}</p>
            <img
            className="edit-symbol"
            src={editSymbol}
            alt='edit-symbol'
            >
            </img>
            <img
            src={deleteSymbol}
            alt='delete-symbol'
            className='delete-symbol'
            >
            </img>
            <img
            src={shareSymbol}
            alt="share-symbol"
            className='share-symbol'
            >
            </img>
            <p className="question-wise-analysis-text"> Question wise Analysis</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AnalyticsPage;
