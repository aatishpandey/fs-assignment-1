const signupBtn = document.querySelector("#signup-btn");
const signupForm = document.querySelector("#signup-form");
const hiddenDiv = document.querySelector("#hidden-div");

//user signup
signupBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  const formData = new FormData(signupForm);
  let resBody = {};

  for (let [key, value] of formData.entries()) {
    resBody = { ...resBody, [key]: value };
  }

  const response = await fetch("/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(resBody),
  });
  console.log("response : ", response);

  if (response.status == "200") {
    hiddenDiv.innerHTML = "User Created!";
  }
});
