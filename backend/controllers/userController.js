import asyncHandler from "express-async-handler";

const signup = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Auth User" });
});

export { signup };
