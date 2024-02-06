import z from "zod";

const petSchema = z.object({
  type: z.enum(["cat", "dog"], {
    required_error: "Type is required",
    invalid_type_error: "Type must be a valid value.",
  }),
  name: z
    .string({
      invalid_type_error: "Name must be a string",
    })
    .max(100, {
      message: "Name must be 100 or fewer characters long.",
    })
    .default("No name"),
  description: z.string({
    invalid_type_error: "Description must be a string",
  }),
  breed: z
    .string({
      invalid_type_error: "Breed must be a string",
    })
    .max(100, {
      message: "Breed must be 100 or fewer characters long.",
    })
    .default("No breed"),
  age: z.enum(
    ["pediatric", "young adult", "mature adult", "senior", "geriatric"],
    {
      required_error: "Age is required",
      invalid_type_error: "Age must be a valid value.",
    }
  ),
  size: z.enum(["small", "medium", "large"], {
    required_error: "Size is required",
    invalid_type_error: "Size must be a valid value.",
  }),
  color: z.string({
    invalid_type_error: "Color must be a string",
  }),
  image: z
    .string({
      invalid_type_error: "Image must be a string",
    })
    .url()
    .max(255, {
      message: "Image URL must be 255 or fewer characters long.",
    }),
  petState: z.enum(["available", "adopted"], {
    required_error: "Status is required",
    invalid_type_error: "Status must be a valid value.",
  }),
  userId: z
    .string({ required_error: "There is no user's information" })
    .uuid({ message: "Wrong format in user's information" }),
});

export function validatePet(input) {
  return petSchema.safeParse(input);
}

export function validatePartialPet(input) {
  return petSchema.partial().safeParse(input);
}
