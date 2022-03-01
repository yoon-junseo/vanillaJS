const formValidates = document.querySelectorAll(".form-validate");
const username = document.querySelector("#username");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const confirmPassword = document.querySelector("#confirm-password");
const submitBtn = document.querySelector("button");
// 사용자 이름 확인
function checkUsername() {
  let formControl = username.parentNode;

  if (username.value.length < 3) {
    formValidates[0].children[2].style.visibility = "visible";
    formControl.setAttribute("class", "form-validate failure");
  } else {
    formValidates[0].children[2].style.visibility = "hidden";
    formControl.setAttribute("class", "form-validate success");
  }
}

// 이메일 확인
function checkEmail() {
  let formControl = email.parentNode;
  const regExp =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

  // 이메일 주소가 맞는 경우
  if (regExp.test(email.value)) {
    formValidates[1].children[2].style.visibility = "hidden";
    formControl.setAttribute("class", "form-validate success");
  } else {
    formValidates[1].children[2].style.visibility = "visible";
    formControl.setAttribute("class", "form-validate failure");
  }
}

// pw1 확인
function checkPassword() {
  let formControl = password.parentNode;

  if (password.value.length < 6) {
    formValidates[2].children[2].style.visibility = "visible";
    formControl.setAttribute("class", "form-validate failure");
  } else {
    formValidates[2].children[2].style.visibility = "hidden";
    formControl.setAttribute("class", "form-validate success");
  }
}

// pw1과 pw2가 같은지 확인
// pw2가 빈칸인지 확인
function checkValidatePassword() {
  let formControl = confirmPassword.parentNode;
  let isValidated1 = false; // pw2 빈칸 확인용
  let isValidated2 = false; // pw1 === pw2 확인용

  // pw2가 빈칸인지 확인
  if (confirmPassword.value.length <= 0) {
    formValidates[3].children[3].style.visibility = "visible";
    isValidated1 = false;
  } else if (confirmPassword.value.length > 0) {
    formValidates[3].children[3].style.visibility = "hidden";
    isValidated1 = true;
  }

  // pw1과 pw2가 같은지 확인
  if (password.value === confirmPassword.value) {
    formValidates[3].children[2].style.visibility = "hidden";
    isValidated2 = true;
  } else if (password.value !== confirmPassword.value) {
    formValidates[3].children[2].style.visibility = "visible";
    isValidated2 = false;
  }

  if (isValidated1 && isValidated2) {
    formControl.setAttribute("class", "form-validate success");
  } else {
    formControl.setAttribute("class", "form-validate failure");
  }
}

function submitInfo(e) {
  e.preventDefault();
  checkUsername();
  checkEmail();
  checkPassword();
  checkValidatePassword();
}

submitBtn.addEventListener("click", submitInfo);
