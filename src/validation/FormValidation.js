const checkEmail = (data) => {
  let err = null;
  const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const trimmedData = data.trim();

  if (trimmedData.length === 0) {
    err = "This field cannot be empty";
  } else if (!pattern.test(trimmedData)) {
    err = "Invalid email format";
  } else {
    err = null;
  }

  return err;
};

const isEmpty = (data) => {
  let err = null;
  const trimmedData = data.trim();

  if (trimmedData.length === 0) {
    err = "This field cannot be empty";
  } else err = null;

  return err;
};

function checkCode(data,limit){
  let err=null;
  const pattern = /[^A-Za-z]/g;
  const trimmedData = data.trim();

  
  if(trimmedData.length ===0){
      err="This field cannot be empty"
  }else if(pattern.test(trimmedData)){
      err="Code  cannot contain special characters or numbers"
  }else if(trimmedData.length!== limit) {
      err=`Code must contain ${limit} letters`
  } else err= null
  
  return err
}

function checkPassword(data) {
  let err = null;
  const trimmedData = data.trim();
  if (trimmedData.length === 0) {
    err = "This field cannot be empty";
  } else if (!/[A-Z]/.test(trimmedData)) {
    err = "Atleast One Capital Letter";
  } else if (!/[a-z]/.test(trimmedData)) {
    err = "Atleast One Small Letter";
  } else if (!/\d/.test(trimmedData)) {
    err = "Atleast One Digit";
  } else if (!/[-!@#$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/.test(trimmedData)) {
    err = "Atleast One Special Character";
  } else if (trimmedData.length < 6 || trimmedData.length > 20) {
    err = "Length should be 6 - 20 characters";
  } else err = null;

  return err;
}
function checkName(data) {
  let err = null;
  const pattern = /[^A-Za-z\s]/g;
  const trimmedData = data.trim();

  if (trimmedData.length === 0) {
    err = "This field cannot be empty";
  } else if (pattern.test(trimmedData)) {
    err = "Name cannot contain special characters or numbers";
  } else err = null;

  return err;
}

function checkConfirmPswd(data1, data2) {
  let err = null;
  const trimmedData = data1.trim();

  if (trimmedData.length === 0) {
    err = "This field cannot be empty";
  } else if (trimmedData !== data2) {
    err = "Passwords must be same";
  } else err = null;

  return err;
}

function validateImage(event) {
  // const file = event.target.files[0];

  // const fileType = file.type.split("/")[0];
  // const fileSize = file.size / 1024 / 1024; // convert bytes to MB
  let err = null;

  // if (fileType !== "image") {
  //   err = "Please select an image file.";
  //   event.target.value = null;
  // }

  // if (fileSize > 10) {
  //   err = "The image file size should not exceed 10MB.";
  //   event.target.value = null;
  // }

  return err;
}
function isNumber(data) {
  let err = null;
  const pattern = /[^0-9]/;
  const trimmedData = data.trim();

  if (trimmedData.length === 0) {
    err = "This field cannot be empty";
  } else if (pattern.test(trimmedData)) {
    err = "Invalid Character";
  } else err = null;

  return err;
}

function checkNationality(data){
  let err=null;
  const pattern = /[^A-Za-z]/g;
  const trimmedData = data.trim();

  if(trimmedData.length ===0){
      err="This field cannot be empty"
  }else if(pattern.test(trimmedData)){
      err="Code  cannot contain special characters or numbers"
  }else err= null

  return err
}

function checkTextarea (data){
  let err=null;
  const trimmedData = data.trim();

  if(trimmedData.length ===0){
      err="This field cannot be empty"
  }else err= null

  return err
}

module.exports = {
  checkEmail,
  checkCode,
  isEmpty,
  checkPassword,
  checkName,
  validateImage,
  checkConfirmPswd,
  isNumber,
  checkNationality,
  checkTextarea
};
