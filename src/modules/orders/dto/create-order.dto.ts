import z from "zod";

export const CreateOrderDto = z
  .object({
    lab: z.string(),
    patient: z.string(),
    customer: z.string(),
    services: z.array(
      z.object({
        name: z.string(),
        value: z.number(),
      })
    ),
  })
  .refine((data) => data.services.length > 0, {
    message: "Services is required",
    path: ["services"],
  })
  .refine((data) => data.services.every((service) => service.value > 0), {
    message: "Services value must be greater than 0",
    path: ["services"],
  });
