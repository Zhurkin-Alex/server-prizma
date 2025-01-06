import { z } from "zod";

export const siteSchema = z.object({
  name: z.string(),
  template: z.string(),
  rss: z.string().url(),
  logo: z.string()
});

export const createSitesSchema = z.array(siteSchema);