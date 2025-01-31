"use client"

import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { api } from "~/trpc/react"

type FormInput = {
    repoUrl: string
    projectName: string
    githubToken?: string




}

const CreatePage = () => {
    const { register, handleSubmit, reset } = useForm<FormInput>()
    const createProject = api.project.createProject.useMutation()

    const onSubmit = (data: FormInput) => {
        // window.alert(JSON.stringify(data))
        createProject.mutate({
            githubUrl: data.repoUrl,
            name: data.projectName,
            githubToken: data.githubToken || ''
        }, {
            onSuccess: () => {
                toast.success('Project created successfully')
            }
        })
        console.log(data)
    }

    return (
        <div className="flex items-center gap-12 h-full justify-center">
            <img src="/githubUn.svg" alt="Create Project" className="h-56 w-auto" />
            <div>
                <div className="font-semibold text-2xl">
                    <h1>Link your GitHub Repository</h1>
                    <p className="text-sm text-muted-foreground">
                        Enter the URL of your GitHub repository to get started.

                    </p>
                </div>
                <div className="h-4"></div>
                <div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Input
                            placeholder="Project Name"
                            {...register('projectName', { required: true })} />

                        <div className="h-4"></div>
                        <Input
                            placeholder="GitHub URL: https://github.com/username/repo"
                            {...register('repoUrl', { required: true })} />

                        <div className="h-4"></div>
                        <Input
                            placeholder="GitHub Token"
                            {...register('githubToken')} />

                        <div className="h-4"></div>
                        <Button type="submit" className="w-full" disabled={createProject.isPending}>
                            Create Project
                        </Button>
                    </form>
                </div>
            </div>

        </div>
    )
}

export default CreatePage


