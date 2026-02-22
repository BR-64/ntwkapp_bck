// src/utils/asyncHandler.js
// Eliminates try/catch boilerplate in async controllers
const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

module.exports = { asyncHandler };
