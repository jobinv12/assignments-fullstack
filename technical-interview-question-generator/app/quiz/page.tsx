import QuizPage from "@/components/quizPage";
import { Suspense } from "react";

export default function ExamPage() {
  return (
    <Suspense>
      <QuizPage />
    </Suspense>
  );
}
