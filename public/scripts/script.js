const signupBtn = document.querySelector("#signup-btn");
const signupForm = document.querySelector("#signup-form");
const signupDiv = document.querySelector("#signup-div");

const loginBtn = document.querySelector("#login-btn");
const loginForm = document.querySelector("#login-form");
const loginMsg = document.querySelector("#login-msg");

//user signup
signupBtn?.addEventListener("click", async (e) => {
  e.preventDefault();
  const formData = new FormData(signupForm);
  let formBody = {};

  for (let [key, value] of formData.entries()) {
    formBody = { ...formBody, [key]: value };
  }

  try {
    const response = await fetch("/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formBody),
    });
    const data = await response.json();
    console.log("response : ", data);

    if (response.status == "200") {
      signupDiv.innerHTML = `${data.message}`;
    } else {
      signupDiv.innerHTML = `${data.message}`;
    }
  } catch (err) {
    console.log(err);
    signupDiv.innerHTML = "Server Error";
  }
});

//user login
loginBtn?.addEventListener("click", async (e) => {
  e.preventDefault();
  const formData = new FormData(loginForm);
  let formBody = {};

  for ([key, value] of formData) {
    formBody = { ...formBody, [key]: value };
  }

  try {
    const response = await fetch("/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formBody),
    });
    data = await response.json();
    console.log("response", data);

    if (response.status == "200") {
      loginMsg.innerHTML = "Login Successful";
    } else {
      loginMsg.innerHTML = "User not found";
    }
  } catch (err) {
    console.log(err);
    loginMsg.innerHTML = "Server Error";
  }
});
