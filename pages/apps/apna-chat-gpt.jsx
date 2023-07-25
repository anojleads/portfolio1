import BackTo from "@/components/BackTo";
import Theme from "@/components/Theme";
import Head from "next/head";
import React, { Fragment, useState } from "react";
const axios = require("axios");

const ApnaChatGpt = () => {
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [questionPreview, setQuestionPreview] = useState("");
  const [answer, setAnswer] = useState();
  const [history, setHistory] = useState([]);

  const enterHit = (e) => {
    if (e.key === "Enter") {
      generateAnswer();
    }
  };

  const generateAnswer = async () => {
    const options = {
      method: "POST",
      url: "https://chatgpt-api8.p.rapidapi.com/",
      headers: {
        "content-type": "application/json",
        "X-RapidAPI-Key": "46e102466emsh069eb8e1a1f88bep148650jsn161589bc0004",
        "X-RapidAPI-Host": "chatgpt-api8.p.rapidapi.com",
      },
      data: [
        {
          content: question,
          role: "user",
        },
      ],
    };

    try {
      setLoading(true);
      setQuestionPreview(question);
      setQuestion("");
      setAnswer("");
      const response = await axios.request(options);
      setLoading(false);
      console.log(response);
      setAnswer(response.data.text);
      setHistory([{ question, answer: response.data.text }, ...history]);
      console.log(response.data.text);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Fragment>
      <Head>
        <title>Apna-Chat-Gpt</title>
      </Head>

      <Theme>
        <BackTo backTo={""} />

        <div className="dark:bg-gray-900 min-h-[92vh]">
          <h1 className="text-3xl font-bold text-center pt-5">Apna-Chat-Gpt</h1>
          <div className="w-[92%] sm:w-[50%] m-auto mt-6">
            <div className="inputWrapper flex justify-around">
              <input
                onChange={(e) => setQuestion(e.target.value)}
                onKeyDown={enterHit}
                type="text"
                name="question"
                id="question"
                value={question}
                placeholder="Ask any question..."
                className="dark:bg-black p-3 py-1.5 rounded text-lg block w-[100%] border border-solid border-gray-500 dark:border-white"
              />
            </div>

            <div className="mt-8 pb-5">
              {questionPreview && (
                <div>
                  {" "}
                  <p>Q. {questionPreview}</p>
                  <p>{loading ? "Generating..." : "Ans => " + answer}</p>
                </div>
              )}

              {answer !== ""
                ? history
                    .filter((data, key) => key !== 0)
                    .map((data, key) => (
                      <div key={key} className="mt-5">
                        <p>{"Q. " + data.question}</p>
                        <div>{"Ans => " + data.answer}</div>
                      </div>
                    ))
                : history.map((data, key) => (
                    <div key={key} className="mt-5">
                      <p>{"Q. " + data.question}</p>
                      <div>{"Ans => " + data.answer}</div>
                    </div>
                  ))}
            </div>
          </div>

          <div className="sm:hidden flex justify-center w-[100%] fixed bottom-10">
            <button
              className="p-2 px-5 dark:bg-[#286969] bg-[#c72c6c] font-bold text-white rounded sm:ml-5"
              onClick={generateAnswer}
            >
              Generate
            </button>
          </div>
        </div>
      </Theme>
    </Fragment>
  );
};

export default ApnaChatGpt;