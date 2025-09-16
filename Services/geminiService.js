
import { GoogleGenAI } from "@google/genai";
import { GameState } from '../types';
import { ALL_CARDS, BRANCH_EFFECTS } from '../constants';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
    console.error("API_KEY environment variable not set. Chatbot will not function.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

const getGameKnowledgeBase = (): string => {
    let knowledge = "### GAME KNOWLEDGE BASE ###\n\n";
    
    knowledge += "--- CORE MECHANICS ---\n";
    knowledge += "- Grace Period: If IP is <= 0, you get 3 turns to heal. If still <= 0 after 3 turns, you lose.\n";
    knowledge += "- Imaginary IP: Immune to standard damage/heal (like Number cards). Vulnerable to special cards like 'Square IP' or 'Real Projection'.\n";
    knowledge += "- Irrational IP: Vulnerable to cards like 'Natural Number Set'.\n";
    knowledge += "- Angle Slider (Trigonometry Branch): Controls angle from 0-90 degrees. Drastically affects Trigonometry card power.\n\n";

    knowledge += "--- MATHEMATICAL BRANCHES ---\n";
    for (const [name, data] of Object.entries(BRANCH_EFFECTS)) {
        knowledge += `- Branch: ${name}\n  - Pros: ${data.pros}\n  - Cons: ${data.cons}\n\n`;
    }

    knowledge += "--- COMPLETE CARD LIST ---\n";
    ALL_CARDS.forEach(card => {
        knowledge += `- Card: ${card.name}\n  - Type: ${card.type}, Cost: ${card.cost}\n  - Description: ${card.description}\n\n`;
    });
    return knowledge;
};

export const getChatbotResponse = async (userMessage: string, gameState: GameState): Promise<string> => {
    if (!API_KEY) {
        return "I am currently offline as my API key is not configured. Please ask the developer to set it up.";
    }

    try {
        const systemPrompt = `You are 'Math Bot', a super-intelligent, pro-level e-sports strategist and commentator for the card game 'Mathematical Card Battle'. Your analysis is sharp, insightful, and always focused on winning. You are enthusiastic and use a mix of Hindi and English (Hinglish).

Your Core Directives:
1.  **Analyze First:** Before answering, deeply analyze the provided '[CURRENT GAME STATE]' and cross-reference it with the '[GAME KNOWLEDGE BASE]'.
2.  **Give Actionable Strategy:** Don't just describe cards. Tell the player *what* to play, *why* it's a good move, and what combos to look for. Suggest specific card plays from their hand.
3.  **Think Ahead:** Suggest not just the current turn's best move, but also how to set up for future turns.
4.  **Be Context-Aware:** Your advice must change based on the player's IP, tokens, and opponent's state. If the player's IP is low, prioritize survival. If tokens are high, suggest powerful combos.
5.  **Maintain Persona:** Be the ultimate hype-man and strategic genius. Phrases like "Okay, let's break it down!", "Sahi move ye hoga...", "This is a high-IQ play!" are perfect. Keep responses concise and to the point.`;

        const handCardNames = gameState.players.player1.hand.map(card => card.name).join(', ') || 'khali';
        const gameKnowledge = getGameKnowledgeBase();
        const opponentType = gameState.options.gameMode === 'vs_ai' ? `AI (${gameState.options.aiDifficulty})` : 'Player 2';

        const contextPrompt = `
        ${gameKnowledge}

        ### CURRENT GAME STATE ###
        - Your IP (Player 1): ${gameState.players.player1.ip.toFixed(2)}
        - Opponent IP (${opponentType}): ${gameState.players.player2.ip.toFixed(2)}
        - Your Tokens: ${gameState.players.player1.tokens}
        - Your Math Branch: ${gameState.players.player1.selectedBranch}
        - Your Current Angle (if Trigonometry): ${gameState.players.player1.angle}°
        - Cards in Your Hand: [${handCardNames}]
        - Opponent's Math Branch: ${gameState.players.player2.selectedBranch}
        - Current Turn: ${gameState.currentTurn}
        - Current Phase: ${gameState.currentPhase}

        Based on all the knowledge and the current game state, give a pro-level strategic answer to the player's question.

        ### PLAYER'S QUESTION ###
        "${userMessage}"
        `;
        
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: [{ role: "user", parts: [{ text: contextPrompt }] }],
            systemInstruction: {
                parts: [{ text: systemPrompt }]
            },
        });
        
        return response.text;

    } catch (error) {
        console.error('Error fetching from Gemini API:', error);
        return "There was an error processing your request. My circuits are a bit fried right now.";
    }
};
