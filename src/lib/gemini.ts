
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

const model = genAI.getGenerativeModel({
    model: 'gemini-1.5-flash-latest',

});

export const aisummarizeCommit = async (diff: string) => {
    const response = await model.generateContent([
        `You Are An Expert Programmer, and you are trying to summorize the following commit
        ${diff}


        EXample summory Comments
        
        
        `,

    ]);
    return response.response.text();


}

//1:49

        // `You Are An Expert Programmer, and you are trying to summorize the following commit diff
        // ${diff}
        // remainders about the git diff format:
        // for evry file there are a few metadata lines, like (for example)

        // '\'\'\'
        // diff --git a/lib/index.js b/lib/index.js