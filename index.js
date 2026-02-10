// index.js
const express = require('express');
const awsServerlessExpress = require('aws-serverless-express');

const app = express();

// Home page
app.get('/', (req, res) => {
  res.status(200).send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Home</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 40px; }
        nav { margin-bottom: 20px; }
        a { margin-right: 15px; color: #0066cc; text-decoration: none; }
      </style>
    </head>
    <body>
      <nav>
        <a href="/">Home</a>
        <a href="/aboutus">About Us</a>
        <a href="/policy">Policy</a>
      </nav>
      <h1>Welcome to Our Site</h1>
      <p>This is the home page served from AWS Lambda.</p>
    </body>
    </html>
  `);
});

// About Us page
app.get('/aboutus', (req, res) => {
  res.status(200).send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>About Us</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 40px; }
        nav { margin-bottom: 20px; }
        a { margin-right: 15px; color: #0066cc; text-decoration: none; }
      </style>
    </head>
    <body>
      <nav>
        <a href="/">Home</a>
        <a href="/aboutus">About Us</a>
        <a href="/policy">Policy</a>
      </nav>
      <h1>About Us</h1>
      <p>We are a team committed to delivering excellent services.</p>
      <p>This page is served from AWS Lambda with Express.js</p>
    </body>
    </html>
  `);
});

// Policy page
app.get('/policy', (req, res) => {
  res.status(200).send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Policy</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 40px; }
        nav { margin-bottom: 20px; }
        a { margin-right: 15px; color: #0066cc; text-decoration: none; }
      </style>
    </head>
    <body>
      <nav>
        <a href="/">Home</a>
        <a href="/aboutus">About Us</a>
        <a href="/policy">Policy</a>
      </nav>
      <h1>Policy</h1>
      <p>Our privacy and usage policies:</p>
      <ul>
        <li>We respect user privacy</li>
        <li>Data is encrypted in transit</li>
        <li>No third-party data sharing</li>
      </ul>
    </body>
    </html>
  `);
});

// Lambda handler
const server = awsServerlessExpress.createServer(app);
exports.handler = (event, context) => {
  awsServerlessExpress.proxy(server, event, context);
};