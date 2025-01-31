'use client';



import { ExternalLink, ExternalLinkIcon } from 'lucide-react';
import Link from 'next/link';
import React from 'react'
import useProject from '~/hooks/use-project';
import { cn } from '~/lib/utils';
import { api } from '~/trpc/react';

const CommitLog = () => {
    const { projectId, project } = useProject()
    const { data: commits, isLoading } = api.project.getCommits.useQuery({ projectId })

    return (
        <>
            <ul className='space-y-6'>
                {commits?.map((commit, commitIndex) => (
                    <li key={commit.id} className='relative flex gap-x-4'>
                        <div className={cn('relative', {
                            'h-6': commitIndex === commits.length - 1,
                            '-bottom-6': commitIndex !== commits.length - 1
                        })}>
                            <div className='absolute w-px h-full translate-x-4 bg-gray-200'></div>
                            <img src={commit.commitAuthorAvatar || ''} className='relative mt-4 size-8 flex-none rounded-full bg-gray-50' alt={`${commit.commitAuthorName}'s avatar`} />
                        </div>
                        <div className='flex-1'>
                            <div className='flex-auto rounded-md bg-white p-3 ring-1 ring-inset ring-gray-200'>
                                <div className='flex justify-between gap-x-4'>
                                    <Link target='_blank' href={`${project?.githubUrl}/commit/${commit.commitHash}`} className='py-0.5 text-xs leading-5 text-gray-500 hover:text-gray-900'>
                                        <span className='font-medium text-gray-900'>{commit.commitAuthorName}</span>
                                        <span className='inline-flex items-center'>
                                            committed
                                            <ExternalLink className='m-1 size-4' />
                                        </span>
                                    </Link>
                                    <span className='text-xs leading-5 text-gray-500'>{commit.commitData?.toLocaleDateString()}</span>
                                </div>
                                <span className='font-semibold block mt-2'>
                                {commit.commitMessage}
                            </span>
                            <pre className='mt-2 whitespace-pre-wrap text-xs leading-6 text-gray-500'>
                                {commit.summary}
                            </pre>
                            </div>
        
                        </div>
                    </li>
                ))}

            </ul>

        </>

    )
}

export default CommitLog
