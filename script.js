let generatedOTP;
let intervalId;

const otpExpireElem = document.getElementById("otp-expire-id");

const expireOTP = () => {
  const totalTime = 15000;
  const interval = 1000;
  let slice = totalTime / interval;

  intervalId = setInterval(function () {
    otpExpireElem.innerText = `OTP will expire in ${slice} seconds`;
    slice = slice - 1;
  }, interval);

  setTimeout(() => {
    otpExpireElem.innerText = "OTP Expired";
    clearInterval(intervalId);
    generateOTP();
  }, totalTime);
};

const trackelOTPBoxes = () => {
  const boxes = document.getElementById("otp-box-list-id");
  boxes.addEventListener("input", (e) => {
    const target = e.target;
    const value = target.value;
    if (isNaN(value)) {
      target.value = "";
      return;
    }
    const nextElement = target.nextElementSibling;
    if (nextElement) {
      nextElement.focus();
    }

    validateOTP();
  });
};

const generateOTP = () => {
  generatedOTP = Math.floor(1000 + Math.random() * 9000);
  const otpElement = document.getElementById("geenerated-otp-id");
  otpElement.innerText = `Your Four Digit Generated OTP Code :${generatedOTP}`;
  expireOTP();
};

const validateOTP = () => {
  let typedNumber = "";
  const boxListElem = document.getElementById("otp-box-list-id");
  [...boxListElem.children].forEach((element) => {
    typedNumber = typedNumber + element.value;
  });

  const result = generatedOTP === parseInt(typedNumber, 10);
  const resultElem = document.getElementById("result-id");

  if (result) {
    resultElem.innerText = "OTP has been validate successfully";
    resultElem.classList.remove("failed");
    resultElem.classList.add("success");
    clearInterval(intervalId);
    otpExpireElem.classList.add("otpComplete");
  } else {
    resultElem.innerText = "OTP is invalid";
    resultElem.classList.remove("success");
    resultElem.classList.add("failed");
  }
};

const init = () => {
  console.log(`javascript program is running`);
  trackelOTPBoxes();
  setTimeout(generateOTP, 2000);
};

init();
