import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { z } from "zod";

export const projectRouter = createTRPCRouter({
    createProject: protectedProcedure
        .input(z.object({
            name: z.string(),
            githubUrl: z.string(),
            githubToken: z.string().optional(),
        }))
        .mutation(async ({ ctx, input }) => {
            const project = await ctx.db.project.create({
                data: {
                    name: input.name,
                    githubUrl: input.githubUrl,
                    repoUrl: input.githubUrl,
                    UserToProject:{
                        create:{
                            userId: ctx.user.userId!
                        }
                    }
                }
            })
            // ctx.user.userId
            return project;
        })
});

