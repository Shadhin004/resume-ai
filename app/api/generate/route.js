import {NextResponse} from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
    apiKey : process.env.OPENAI_API_KEY
})

export async function POST(req){
    try{
        const { resumeText, jobDescription } = await req.json();

        const prompt = `You are an experienced professional career coach. Given this resume text (latex code):\n${resumeText}\n and this job description:\n${jobDescription}\n . Now generate a tailored professional resume that highlights relevant skills and experience.Keep it concise, formal, and ATS-friendly. Do not change any design. Just provide the modified latex code.`;

        const response = await openai.chat.completions.create({
            model: "gpt-5-nano",
            messages: [{
                role: "user",
                content: prompt 
            }],
        });

        return NextResponse.json({
            resume: response.choices[0].message.content
        });

    } catch (error) {
        console.error("API Error:", error);
        return NextResponse.json({
            error: "Failed to generate resume"
        });
    }
}