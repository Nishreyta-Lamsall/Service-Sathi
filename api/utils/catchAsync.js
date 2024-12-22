module.exports = (asyncFunction) => {
  return (req, res, next) => {
    // Call the async function and handle its errors
    asyncFunction(req, res, next).catch(next);
  };
};
