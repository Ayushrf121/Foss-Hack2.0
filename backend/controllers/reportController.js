import axios from "axios";

const analyzeReport = async (req, res) => {
    try {
        const file = req.file;

        if (!file) {
            return res.status(400).json({
                success: false,
                message: "No file uploaded"
            });
        }

        const base64File = file.buffer.toString("base64");

        const response = await axios.post(
            `${process.env.GEMINI_API_URL}${process.env.GEMINI_API_KEY}`,
            {
                contents: [
                    {
                        parts: [
                            {
                                text: `You are a medical assistant for common people.Analyze this medical report and:- Explain in VERY SIMPLE language (like explaining to a normal person)
                                - First Name of person on top left side as Name : personName
                                - age & sex/gender of person below name as Age & Sex : 15,Male
                                - Use bullet points with arrows (➡️)
                                - Don't highlight anything make a simple text but formatted way
                                - Keep response SHORT (max 20-30 lines)
                                - Add a simple summary at the end
                                - Avoid technical jargon
                                - If it is NOT a medical report:
                                - Respond ONLY with:"❌ This document does not appear to be a valid medical report.   
                                  Please upload a proper medical report."
                                Also respond in a friendly tone.`
                            },
                            {
                                inline_data: {
                                    mime_type: file.mimetype,
                                    data: base64File
                                }
                            }
                        ]
                    }
                ]
            }
        );

        const geminiData = response.data;

        const resultText =
            geminiData?.candidates?.[0]?.content?.parts?.[0]?.text ||
            "No result generated";

        return res.json({
            success: true,
            data: resultText
        });

    } catch (error) {
        console.error("Gemini Error:", error.response?.data || error.message);

        return res.status(500).json({
            success: false,
            message: "Error analyzing report",
            error: error.response?.data || error.message
        });
    }
};

export { analyzeReport };