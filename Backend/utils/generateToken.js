// import jwt from "jsonwebtoken";
// const token =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2N2UwZTRkYzc3NzI3OWJhYmY0ZjEyNzUiLCJyb2xlIjoicmVzdGF1cmFudE93bmVyIiwiaWF0IjoxNzQyODA2NTI5LCJleHAiOjE3NDUzOTg1Mjl9.chhKrUni8bk0nqEl07FzgvMQS8ObcDp9JKRkFgC-pek";
// const decoded = jwt.verify(token, "my_name_is_deepanshu");
// console.log(decoded);

import jwt from "jsonwebtoken";

const generateToken = (user) => {
  const token = jwt.sign(
    { userId: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "30d" }
  );

  return token; // ✅ Return the token
};

export default generateToken;
