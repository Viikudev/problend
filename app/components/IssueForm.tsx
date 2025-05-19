"use client";

import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { areas } from "../types/issue";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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

const formSchema = z.object({
  title: z.string().max(40, {
    message: "The title must have less than 50 characters",
  }),
  description: z.string(),
  area: z.string(),
});

export default function IssueForm() {
  const { user } = useUser();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      area: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (user) {
      try {
        const newIssue = {
          ...values,
          status: "available",
          userId: user.id,
        };
        const response = await axios.post("/api/issues", newIssue);
            if (response.status === 200 || response.status === 201) {
          const message = encodeURIComponent("issue created successfully");
       window.location.assign(`/issues?message=${message}`);
    } else{
        const message = encodeURIComponent("problem to create issue");
       window.location.assign(`/issues?message=${message}`);
      console.error("Issue creation failed:", response);
    }
      } catch (error) {
        console.log("Error creating issue:", error);
      }
    }
  };

  const areasArray = Object.entries(areas);
  console.log(areasArray);

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
                <Input
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
                  {areasArray.map((area) => (
                    <SelectItem key={area[0]} value={area[0]}>
                      {area[1]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Create Issue</Button>
      </form>
    </Form>
  );
}
