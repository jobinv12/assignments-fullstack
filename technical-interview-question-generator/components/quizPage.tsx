"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import Timer from "./timer";
import { Button } from "./ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";

export default function QuizPage() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [questions, setQuestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    async function generateQuestions() {
      setLoading(true);
      const bodyData = {
        experience: searchParams.get("experience"),
        job_requirements: searchParams.get("job_req"),
      };

      const response = await fetch("/api/generate-questions", {
        method: "POST",
        body: JSON.stringify(bodyData),
      });

      const data = await response.json();
      console.log(data);

      setQuestions(data.questions);
      setLoading(false);
    }

    generateQuestions();
  }, [searchParams]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-10 w-10 animate-spin text-gray-600" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6 h-[500px]">
      <h1 className="text-3xl font-bold justify-start">Technical MCQ</h1>
      <div className="grid grid-cols-2">
        <div className="flex flex-auto justify-start">
          <Timer />
        </div>
        <div className="flex flex-auto justify-end">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">End Test</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Do you want to end the test?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. If you have completed the test.
                  Click on End Test.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  className="bg-red-700"
                  onClick={() => router.push("/test-complete")}
                >
                  End Test
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
      <Carousel className="w-full">
        <CarouselContent className="flex w-full">
          {questions?.map((question) => (
            <div
              key={question.id}
              className="w-full shrink-0 grow-0 basis-full px-2"
            >
              <Card className="shadow-lg p-4 h-full">
                <CardHeader>
                  <CardTitle className="text-lg">
                    {question.id}. {question.question}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup className="space-y-2">
                    {question.options.map((opt: string, i: number) => (
                      <label
                        key={i}
                        className="flex items-center space-x-2 cursor-pointer"
                      >
                        <RadioGroupItem value={opt} />
                        <span>{opt}</span>
                      </label>
                    ))}
                  </RadioGroup>
                </CardContent>
              </Card>
            </div>
          ))}
        </CarouselContent>

        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
