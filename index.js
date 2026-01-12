// index.js
exports.handler = async (event) => {
  console.log('event', JSON.stringify(event));
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Hello from Lambda', input: event }),
  };
};