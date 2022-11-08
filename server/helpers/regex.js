// one of each: lower case, upper case, number and special character
const passwordRegex = /(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}/;

const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

module.exports = {passwordRegex, emailRegex};