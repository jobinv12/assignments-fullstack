# Technical Interview Generator Solution

## Approch to Question generation

I have used vercel SDKs and google gemini llm model for generating questions. I have given prompt with clear instructions on how the questions should be, the parameters like role and job requirements and how the questions should be categorised.

## How you calibrate difficulty

The model was given instructions regarding difficulty in prompt. The model generates 20 questions based experience and job requirement. The Question are generated in increasing order of difficulty and skill areas.

## Technical decisions and tradeoffs

I choose Nextjs to build this application. As nextjs is a full stack framework, It simplified backend development and good performance and used shadcn ui for frontend design. Also used SDKs by vercel as it contains all models which was convenient and easy for development. I used typescript for its type safety and runtime errors and hosted the application in vercel.

## Setup and Instructions to run Locally

make sure latest version nodejs is installed. clone the code. Go inside the directory and install all packages using below cmd
<code> npm i

to run or start the application
<code> npm dev run

add you own gemini api key in .env.local file with name
<code> GOOGLE_GENERATIVE_AI_API_KEY

## A working demo with sample outputs

[technicalinterviewgenerator](technicalinterviewgenerator.vercel.com)

## Sample output

![home page](https://github.com/jobinv12/assignments-fullstack/blob/jobin-technical-interview-question-generator/technical-interview-question-generator/public/home.png)

![testpage](https://github.com/jobinv12/assignments-fullstack/blob/jobin-technical-interview-question-generator/technical-interview-question-generator/public/mcq.png)
