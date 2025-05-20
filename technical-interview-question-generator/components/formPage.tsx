"use client";

import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { experienceSchema } from "@/schema/schema";
import { Textarea } from "./ui/textarea";
import { useRouter } from "next/navigation";

export default function FormPage() {
  const router = useRouter();

  const form = useForm<z.infer<typeof experienceSchema>>({
    resolver: zodResolver(experienceSchema),
    defaultValues: {
      experience: "0",
    },
  });

  function goToInstructionsPage() {
    const job_requirement = form.getValues("job_requirement");
    const experience = form.getValues("experience");
    router.push(`/quiz?experience=${experience}?job_req=${job_requirement}`);
  }

  return (
    <div className="w-[500px] mt-[500px] mx-auto">
      <p className="font-bold text-4xl p-5">
        Technical Interview Questions Generator
      </p>
      <Card>
        <CardHeader className="font-bold justify-center text-center">
          Enter Job Role and Experience Details
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(goToInstructionsPage)}
              className="space-y-4"
            >
              <div>
                <FormField
                  control={form.control}
                  name="experience"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold">
                        Years of Experience
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Years of Experience" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div>
                <FormField
                  control={form.control}
                  name="job_requirement"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold">
                        Job Requirements
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Paste Job Requirements"
                          className="h-[200px] resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <CardFooter className="justify-center text-center">
                <Button type="submit" className="hover:cursor-grab">
                  Proceed
                </Button>
              </CardFooter>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
