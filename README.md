
<h1 align="center">
  <br>
  <img src="client\src\assets\images\round-logo.png" alt="Lexis" width="200">
  <br>
  Lexis
  <br>
</h1>

<h4 align="center">An online reading assistant for people with dyslexia.</h4>

<p align="center">
  <a href="#key-features">Key Features</a> •
  <a href="#first-time-set-up">First-time set-up</a> •
  <a href="#technologies">Technologies</a> 

</p>

## Key Features

* Document import and OCR
* Make documents dyslexia-friendly
* Read text aloud using text-to-speech
* Reading ruler

## First-time set-up
### 1. Package installation

```sh
cd server
npm ci
cd ..
cd client
npm ci
```

#### Install Tesseract
##### For MacOS

```sh
brew install tesseract
```

##### For Windows

Download the installer from the [Tesseract GitHub repository](https://github.com/tesseract-ocr/tesseract "Tesseract GitHub repository") and follow the installation instructions.

##### Install Vietnamese package

Download [Vietnamese language data file](https://github.com/tesseract-ocr/tessdata/blob/main/vie.traineddata).

Locate file to folder tessdata.

### 2. Boot the application

#### The Back-end

```sh
cd server
npm run dev
```

#### The front-end

```sh
cd client
npm start
```

## Technologies

This project is built with:

- [Node.js](https://nodejs.org/)
- [React](https://react.dev/)
- [Express](https://expressjs.com/)
- [Tesseract](https://github.com/tesseract-ocr/tesseract)
