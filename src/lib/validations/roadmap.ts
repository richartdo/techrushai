import { z } from "zod";

export const roadmapSchema = z.object({ title:z.string().min(3).max(120), summary:z.string().min(10).max(800), phases:z.array(z.object({ title:z.string().min(2), objective:z.string().min(5), estimatedHours:z.number().positive(), modules:z.array(z.object({title:z.string().min(2), topics:z.array(z.string().min(2)).min(1), exercise:z.string().min(5), checkpoint:z.string().min(5)})).min(1) })).min(1) });
export type Roadmap = z.infer<typeof roadmapSchema>;
export const tutorRequestSchema = z.object({ message:z.string().min(1).max(4000), learningPathId:z.string().uuid().optional(), conversationId:z.string().uuid().optional() });
