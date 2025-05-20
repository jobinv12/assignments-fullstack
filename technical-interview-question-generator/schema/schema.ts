import z from "zod"

export const experienceSchema = z.object({
    experience: z.string({message: "enter your experience in years"}),
    job_requirement: z.string({message: "paste or type job requirements"}).min(10, {
        message: "Job role must be at least 10 character"
    })
    .max(600, {
        message: "Bio must not be longer than 600 characters"
    })
})

export const questionSchema = z.object({
  questions: z.array(
    z.object({
      id: z.number(),
      question: z.string(),
      options: z.array(z.string()).length(4),
      correctAnswer: z.string(),
      difficulty: z.enum(['easy', 'medium', 'hard']),
    })
  ).length(20),
});