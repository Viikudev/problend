"use client";

import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";

import { areas } from "../types/issue";

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Textarea } from "./ui/textarea";

const formSchema = z.object({
  title: z
    .string()
    .min(1, { message: "Title is required" })
    .max(40, { message: "The title must have less than 40 characters" }),
  description: z.string().min(1, { message: "Description is required" }),
  area: z.string().min(1, { message: "Area is required" }),
});

export default function IssueForm() {
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      area: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!user) return;
    setIsLoading(true);

    const newIssue = {
      ...values,
      status: "available",
      userId: user.id,
    };

    try {
      const response = await axios.post("/api/issues", newIssue);

      const from = sessionStorage.getItem("issueFrom") || "/issues";
      const message =
        response.status === 200 || response.status === 201
          ? "issue created successfully"
          : "problem to create issue";

      window.location.assign(`${from}?message=${encodeURIComponent(message)}`);
    } catch (error) {
      console.error("Error creating issue:", error);
      const from = sessionStorage.getItem("issueFrom") || "/issues";
      const message = "error creating issue";
      window.location.assign(`${from}?message=${encodeURIComponent(message)}`);
    } finally {
      setIsLoading(false);
    }
  };

  const areasArray = Object.entries(areas);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col justify-between gap-4"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Type here the issue title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  className="resize-none averflow-y-auto max-h-50"
                  placeholder="Type here the detailed description of the issue"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="area"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Area</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select the area" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {areasArray.map(([key, value]) => (
                    <SelectItem key={key} value={key}>
                      {value}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isLoading}>
          {isLoading ? <Loader2 className="animate-spin" /> : "Create Issue"}
        </Button>
      </form>
    </Form>
  );
}
