const api = require('./index.js');

const port = process.env.PORT || 8080;

api.listen(port, () => {
  console.log(`API listening on http://localhost:${port}`);
});
