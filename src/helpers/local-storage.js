export const loadState = () => {
  try {
    const savedPosts = localStorage.getItem("state");
    if (!savedPosts) {
      return undefined;
    }
    return JSON.parse(savedPosts);
  } catch (error) {
    return undefined;
  }
};

export const saveState = (state) => {
  try {
    localStorage.setItem("state", JSON.stringify(state));
  } catch (error) {
    console.log(error);
  }
};
