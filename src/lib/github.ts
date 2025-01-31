import { Octokit } from "octokit";
import { db } from "~/server/db";
import axios from "axios";
import { aisummarizeCommit } from "./gemini";

type Response = {
  commitHash: string;
  commitMessage: string;
  commitAuthorName: string;
  commitAuthorAvatar: string;
  commitData: string;
};

export const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

// const githubUrl = "https://github.com/Vitalik6768/lazy-ui";

export const getCommitsHashes = async (
  githubUrl: string,
): Promise<Response[]> => {
  // const githubUrll = "https://github.com/Vitalik6768/lazy-ui";

  const [owner, repo] = githubUrl.split("/").slice(-2);
  if (!owner || !repo) {
    throw new Error("Invalid GitHub URL");
  }

  const data = await octokit.rest.repos.listCommits({
    owner,
    repo,
  });
  const sortedCommits = data.data.sort(
    (a: any, b: any) =>
      new Date(b.commit.author.date).getTime() -
      new Date(a.commit.author.date).getTime(),
  );

  return sortedCommits.slice(0, 10).map((commit) => ({
    commitHash: commit.sha as string,
    commitMessage: commit.commit.message,
    commitAuthorName: commit.commit.author?.name || "",
    commitAuthorAvatar: commit.author?.avatar_url || "",
    commitData: commit.commit.author?.date || "",
  }));
};

export const pullCommits = async (projectId: string) => {
  const [project, githubUrl] = await fetchProjectgithubUrl(projectId);
  const commitHashes = await getCommitsHashes(githubUrl as string);
  const unprocessedCommits = await filterUnprocessedCommits(
    projectId,
    commitHashes,
  );
  const summeryResponses = await Promise.allSettled(
    unprocessedCommits.map(async (commit) => {
      return sumorizeCommits(githubUrl as string, commit.commitHash);
    }),
  );

  const summorise = summeryResponses.map((response) => {
    if (response.status === "fulfilled") {
      return response.value as string;
    }
    return "";
  });

  const commit = await db.commit.createMany({
    data:summorise.map((summary, index) =>{
      console.log(`prosses comits`)
      return{
        projectId: projectId,
        commitHash: unprocessedCommits[index]?.commitHash,
        commitMessage: unprocessedCommits[index]?.commitMessage,
        commitAuthorName: unprocessedCommits[index]?.commitAuthorName,
        commitAuthorAvatar: unprocessedCommits[index]?.commitAuthorAvatar,
        commitData: unprocessedCommits[index]?.commitData,
        summary,
      }
    })
  })

  return commit;
};

async function fetchProjectgithubUrl(projectId: string) {
  const project = await db.project.findUnique({
    where: {
      id: projectId,
    },
    select: {
      githubUrl: true,
    },
  });
  if (!project?.githubUrl) {
    throw new Error("Project not found");
  }
  return [project, project?.githubUrl];
}

async function filterUnprocessedCommits(
  projectId: string,
  commitHashes: Response[],
) {
  const processedCommits = await db.commit.findMany({
    where: {
      projectId: projectId,
    },
  });
  const unprocessedCommits = commitHashes.filter(
    (commit) =>
      !processedCommits.some(
        (processedCommit) => processedCommit.commitHash === commit.commitHash,
      ),
  );
  return unprocessedCommits;
}

async function sumorizeCommits(githubUrl: string, commitHashes: string) {
  const data = await axios.get(`${githubUrl}/commits/#${commitHashes}.dif`, {
    headers: {
      accept: "application/vnd.github.v3.diff",
    },
  });
  return await aisummarizeCommit(data.data || "");
  //1:52
}
// await pullCommits("cm6khphv4000097q6teu5mr4b");























// await pullCommits("cm6khphv4000097q6teu5mr4b");

// import { Octokit } from "octokit";
// import { db } from "~/server/db";
// import axios from "axios";
// import { aisummarizeCommit } from "./gemini";

// type Response = {
//   commitHash: string;
//   commitMessage: string;
//   commitAuthorName: string;
//   commitAuthorAvatar: string;
//   commitData: string;
// };

// export const octokit = new Octokit({
//   auth: process.env.GITHUB_TOKEN,
// });

// // const githubUrl = "https://github.com/Vitalik6768/lazy-ui";

// export const getCommitsHashes = async (
//   githubUrl: string,
// ): Promise<Response[]> => {
//   // const githubUrll = "https://github.com/Vitalik6768/lazy-ui";

//   const [owner, repo] = githubUrl.split("/").slice(-2);
//   if (!owner || !repo) {
//     throw new Error("Invalid GitHub URL");
//   }

//   const data = await octokit.rest.repos.listCommits({
//     owner,
//     repo,
//   });
//   const sortedCommits = data.data.sort(
//     (a: any, b: any) =>
//       new Date(b.commit.author.date).getTime() -
//       new Date(a.commit.author.date).getTime(),
//   );

//   return sortedCommits.slice(0, 10).map((commit) => ({
//     commitHash: commit.sha as string,
//     commitMessage: commit.commit.message,
//     commitAuthorName: commit.commit.author?.name || "",
//     commitAuthorAvatar: commit.author?.avatar_url || "",
//     commitData: commit.commit.author?.date || "",
//   }));
// };

// export const pullCommits = async (projectId: string) => {
//   const [project, githubUrl] = await fetchProjectgithubUrl(projectId);
//   const commitHashes = await getCommitsHashes(githubUrl as string);
//   const unprocessedCommits = await filterUnprocessedCommits(
//     projectId,
//     commitHashes,
//   );
//   const summeryResponses = await Promise.allSettled(
//     unprocessedCommits.map(async (commit) => {
//       return sumorizeCommits(githubUrl as string, commit.commitHash);
//     }),
//   );

//   const summorise = summeryResponses.map((response) => {
//     if (response.status === "fulfilled") {
//       return response.value as string;
//     }
//     return "";
//   });

//   const commit = await db.commit.createMany({
//     data:summorise.map((summary, index) =>{
//       console.log(`prosses comits`)
//       return{
//         projectId: projectId,
//         commitHash: unprocessedCommits[index]?.commitHash,
//         commitMessage: unprocessedCommits[index]?.commitMessage,
//         commitAuthorName: unprocessedCommits[index]?.commitAuthorName,
//         commitAuthorAvatar: unprocessedCommits[index]?.commitAuthorAvatar,
//         commitData: unprocessedCommits[index]?.commitData,
//         summary,
//       }
//     })
//   })

//   return commit;
// };

// async function fetchProjectgithubUrl(projectId: string) {
//   const project = await db.project.findUnique({
//     where: {
//       id: projectId,
//     },
//     select: {
//       githubUrl: true,
//     },
//   });
//   if (!project?.githubUrl) {
//     throw new Error("Project not found");
//   }
//   return [project, project?.githubUrl];
// }

// async function filterUnprocessedCommits(
//   projectId: string,
//   commitHashes: Response[],
// ) {
//   const processedCommits = await db.commit.findMany({
//     where: {
//       projectId: projectId,
//     },
//   });
//   const unprocessedCommits = commitHashes.filter(
//     (commit) =>
//       !processedCommits.some(
//         (processedCommit) => processedCommit.commitHash === commit.commitHash,
//       ),
//   );
//   return unprocessedCommits;
// }

// async function sumorizeCommits(githubUrl: string, commitHashes: string) {
//   const data = await axios.get(`${githubUrl}/commits/#${commitHashes}.dif`, {
//     headers: {
//       accept: "application/vnd.github.v3.diff",
//     },
//   });
//   return await aisummarizeCommit(data.data || "");
//   //1:52
// }
// await pullCommits("cm6khphv4000097q6teu5mr4b");
