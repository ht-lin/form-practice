import { z } from "zod";
import { patterns } from "../../constants";

const workExperienceSchema = z.discriminatedUnion("workExperience", [
  z.object({
    workExperience: z.literal(false),
  }),
  z.object({
    workExperience: z.literal(true),
    companyAndTimeRange: z.array(
      z.object({
        company: z.string().min(1, { message: "Required" }),
        timeRange: z.array(z.date()).min(2).max(2),
      })
    ),
  }),
]);

const variantSchema = z.discriminatedUnion("variant", [
  z.object({
    variant: z.literal("create"),
  }),
  z.object({
    variant: z.literal("edit"),
    id: z.string().min(1),
  }),
]);

export const schema = z
  .object({
    title: z.string().min(1, { message: "Required" }),
    name: z.string().min(1, { message: "Required" }),
    email: z
      .string()
      .min(1, { message: "Required" })
      .refine((email) => patterns.email.test(email), {
        message: "Email not valid",
      }),
    skills: z.array(z.string()),
  })
  .and(workExperienceSchema)
  .and(variantSchema);

export type Schema = z.infer<typeof schema>;

export const defaultValues: Schema = {
  variant: "create",
  title: "",
  name: "",
  email: "",
  workExperience: false,
  skills: [],
};
