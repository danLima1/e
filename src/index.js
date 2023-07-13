const axios = require("axios/dist/browser/axios.cjs"); // browser
const apikey = "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";
import p5 from "p5";

let res;
let message;
let button = document.getElementById("send");
let answer = document.getElementById("answer");

let send = async function () {
  let response = await axios
    .post(
      "https://api.openai.com/v1/chat/completions",
      // '{\n  "model": "gpt-3.5-turbo",\n  "messages": [{"role": "user", "content": "What is the OpenAI mission?"}]\n}',
      {
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: message
          }
        ]
      },
      {
        headers: {
          Authorization: "Bearer " + apikey,
          "Content-Type": "application/json"
        }
      }
    )
    .then(function (r) {
      // console.log(r.request.response);
      res = JSON.parse(r.request.response);
    });
};

button.onclick = function () {
  message = document.getElementById("message").value;
  //send requests to chat gpt
  send().then(function () {
    console.log(message);
    // console.log(res.choices[0].message.content);
    answer.innerText = res.choices[0].message.content;
  });
};

// Define the prefilled text
const prefilledText =
  "Create a personality in 3 key points starting the sentence with you without saying the color code and based on the color: ";

// Get the input field element
const inputField = document.getElementById("message");

// Set the prefilled text as the input field value
inputField.value = prefilledText;

// Focus on the input field to make it active
inputField.focus();

//P5.js
let capture;

let sketch = function (p) {
  p.setup = function () {
    p.createCanvas(window.innerWidth, window.innerHeight);
    p.capture = p.createCapture(p.VIDEO);
    p.capture.size(320, 240);
    p.capture.hide();
  };

  p.draw = () => {
    p.background(255);
    p.image(p.capture, 0, 0, window.Width, window.Height);
  };
};
new p5(sketch, window.document.getElementById("container"));
