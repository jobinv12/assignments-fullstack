import { NextRequest, NextResponse } from "next/server";
import { google } from "@ai-sdk/google"
import { generateObject } from 'ai'
import { questionSchema } from "@/schema/schema";


export async function POST(req: NextRequest){

    const { job_requirement, experience} = await req.json();

    const prompt = `
    Generate 20 unique multiple-choice technical interview questions tailored to the role of **${job_requirement}** with **${experience} years** of experience.
        Rules:
        - Questions must increase in difficulty: Q1–7 easy, Q8–14 medium, Q15–20 hard.
        - For each question, include:
        - id (1 to 20)
        - question (string)
        - options (array of 4 plausible answers)
        - correctAnswer (must match one of the options)
        - difficulty ("easy", "medium", "hard")
        - categorize questions by skill areas and difficuly
        - Avoid repeating questions or answers.
        - Match the knowledge expected of a ${experience}-year ${job_requirement}, across relevant domains (e.g., tools, frameworks, architecture, best practices, algorithms, operating system, linux, Pseudocode).
        Return the questions in JSON format under the key "questions".
    `

    try {
        const { object } = await generateObject({
            model: google('gemini-2.0-flash', {
                
            }),
            prompt,
            schema: questionSchema
        })

        return NextResponse.json(object)
        
    } catch (error) {
        
        return NextResponse.json({error: "Something went wrong:"+error}, {status: 500})
    }

}