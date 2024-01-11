const z = require("zod");

const petSchema = z.object({
  name: z
    .string({
      invalid_type_error: "Name must be a string",
    })
    .default("No name"),
  size: z.enum(["small", "medium", "large"], {
    required_error: "Size is required",
    invalid_type_error: "Size must be a valid value.",
  }),
  breed: z
    .string({
      invalid_type_error: "Breed must be a string",
    })
    .default("No breed"),
  age: z.number().positive().max(20),
  description: z.string({
    invalid_type_error: "Description must be a string",
  }),
  animal: z.enum(["cat", "dog"], {
    required_error: "Animal is required",
    invalid_type_error: "Animal must be a valid value.",
  }),
});

function validatePet(input) {
  return petSchema.safeParse(input);
}

function validatePartialPet(input) {
  return petSchema.partial().safeParse(input);
}

module.exports = {
  validatePet,
  validatePartialPet,
};
