'use client';

import { useUser } from '@clerk/nextjs';
import { ExternalLinkIcon, GithubIcon } from 'lucide-react';
import Link from 'next/link';
import React from 'react'
import useProject from '~/hooks/use-project';
import { getCommitsHashes, pullCommits } from '~/lib/github';

 function DashboardPage() {
  const { project } = useProject()
  const { user } = useUser();
  // const commits = await pullCommits("cm6khphv4000097q6teu5mr4b");



  // getCommitsHashes('https://github.com/docker/genai-stack').then((data) => {
  //   console.log(data)
  // })

  return (
    <div>
      {project?.id}
      {/* {JSON.stringify(commits)} */}
      <div className='flex items-center justify-between flex-wrap gap-4'>
        <div className='w-fit bg-slate-500 rounded-md px-4 py-3'>
          <div className='flex items-center'>
            <GithubIcon className='bg-blue-500 rounded-full p-2 text-white size-9' />
            <div className='ml-2'>
              <p className='text-sm font-medium'>
                This project is linked to{' '}
                <Link href={project?.githubUrl ?? ""} className='inline-flex items-center hover:underline text-white' target='_blank'>
                  {project?.githubUrl}
                  <ExternalLinkIcon className='size-4 ml-1 text-white' />
                </Link>
              </p>
            </div>
          </div>
        </div>

        <div className='h-4'></div>
        <div className='flex items-center gap-4'>
          Team members
        </div>




      </div>

      <div className='mt-4'>
        <div className='grid grid-cols-1 gap-4 '>
          Ask Questions
          meeting card
        </div>
      </div>

      <div className='mt-8'></div>
      commit log

    </div>
  )
}

export default DashboardPage
