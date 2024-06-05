import React, { useState } from "react";
import "./homePage.css";
import axios from "axios";

let api = `https://1nkk.vercel.app/url/shorten`;
// let api = `http://localhost:5500/url/shorten`;

const HomePage = () => {
  const [longUrl, setLongUrl] = useState("");
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState("")

  function copy() {
    var copyText = document.getElementById("shortLink");
    navigator.clipboard.writeText(copyText.value);
    alert("Copied the text: " + copyText.value);
  }

  const postData = (e) => {
    setIsError('')
    setIsLoading(true);
    axios
      .post(api, {
        longUrl,
      })
      .then((res) => {
        setResult(res.data.data);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsError(error.response.data.message)
        setInterval(() => {
          setIsError('')
        }, 4000);
        setIsLoading(false);
      });
  };

  return (
    <div>
      <div className="container" id="container">
        <div className="form-container sign-in-container">
          <div className="form">
            <div className="div">
              <div>
                <h1>Enter a long url</h1>
                <span>to make it short</span>

                <div id="error">
                  {isError ? <div class="error-msg">
                    <i class="fa fa-times-circle"></i> {isError}
                  </div> : ''}
                </div>
                <input
                  id="input"
                  type="text"
                  name="longUrl"
                  value={longUrl}
                  placeholder="Shorten your url"
                  onChange={(e) => setLongUrl(e.target.value)}
                />
              </div>
              <button
                type="button"
                className="button"
                onClick={() => postData()}
                disabled={isLoading}
              >
                Submit
              </button>
            </div>
            <br></br>
            <br></br>
            <br></br>
            <div id="result">
              {isLoading ? (
                <div className="loader"></div>
              ) : (
                result &&
                <textarea className="w-96 py-3 px-3 resize-none overflow-hidden rounded-lg border-2 border-slate-100" type="text" id="shortLink" value={result.shortUrl} placeholder="result" onClick={copy} readOnly></textarea>
              )}
            </div>

          </div>
        </div>

        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-right">
              <h1>Hello, Friend!</h1>
              <p className="p">
                Created a Url shortening service like Bitly and tinyurl for easy
                sharing of long urls, also implemented caching to deliver quick
                responses.
              </p>
              <a href="https://github.com/utkarshgarg62" className="github">
                github
              </a>
            </div>
          </div>
        </div>
      </div>

      <footer>
        <p>
          Created By - <i className="fa fa-heart"></i>
          <a href="https://www.linkedin.com/in/utkarshgarg62/">
            Utkarsh Garg
          </a>{" "}
          - Read how I created this and you can see backend repository -
          <a href="https://github.com/utkarshgarg62/project-urlShortner">
            {" "}
            HERE{" "}
          </a>
          .
        </p>
      </footer>
    </div >
  );

};

export default HomePage;
