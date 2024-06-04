import React, { useState } from "react";
import "./homePage.css";
import axios from "axios";

let api = `https://1nkk.vercel.app/url/shorten`;

const HomePage = () => {
  const [longUrl, setLongUrl] = useState("");
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);


  const postData = (e) => {
    setIsLoading(true);  // Set loading to true when the request starts
    axios
      .post(api, {
        longUrl,
      })
      .then((res) => {
        setResult(res.data.data);
        setIsLoading(false);  // Set loading to false when the request completes
      })
      .catch((error) => {
        console.error(error);
        setResult(error.message)
        setIsLoading(false);  // Set loading to false even if there's an error
      });
  };

  // console.log(result);
  return (
    <div>
      <div className="container" id="container">
        <div className="form-container sign-in-container">
          <div className="form">
            <div className="div">
              <div>
                <h1>Enter a long url</h1>
                <span>to make it short</span>
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
                disabled={isLoading}  // Disable button while loading
              >
                Submit
              </button>
            </div>
            <br></br>
            <br></br>
            <br></br>
            <div id="result">
              {isLoading ? (
                  <div class="loader"></div> // Show loader while loading
              ) : (
                result && <a href={result.shortUrl} target="_blank" rel="noreferrer" >{result.shortUrl}</a>
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
    </div>
  );

};

export default HomePage;
