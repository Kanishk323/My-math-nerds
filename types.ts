
export interface Card {
    name: string;
    icon: string;
    type: 'Number' | 'Action' | 'Theorem' | 'Avatar';
    cost: number;
    effect: string;
    value?: any;
    target?: 'self' | 'opponent';
    description: string;
    summary: string;
    branch?: string;
    turns?: number;
}

export interface Player {
    ip: number;
    tokens: number;
    hand: Card[];
    blockDamage: number;
    damageOverTime: { active: boolean; value: number; turns: number };
    healOverTime: { active: boolean; value: number; turns: number };
    doubleDamageNextTurn: boolean;
    reflectDamage: { active: boolean; value: number; turns: number };
    isIPIrrational: boolean;
    isIPImaginary: boolean;
    selectedBranch: string;
    inGracePeriod: boolean;
    graceRoundsRemaining: number;
    angle: number;
    probBoost: { active: boolean; turns: number };
    fibHeal: { active: boolean; turns: number; sequence: number[]; index: number };
}

export type PlayerType = 'player1' | 'player2';

export interface GameState {
    players: {
        player1: Player;
        player2: Player;
    };
    deck: Card[];
    discardPile: Card[];
    currentTurn: number;
    currentPlayer: PlayerType;
    currentPhase: 'setup' | 'draw' | 'play' | 'battle' | 'heal' | 'end';
    isGameOver: boolean;
    winner: PlayerType | null;
    playedCardsThisTurn: Card[];
    history: GameHistoryEntry[];
    message: string | null;
    options: GameOptions;
}

export type GameMode = 'vs_ai' | 'vs_local_player';
export type AIDifficulty = 'easy' | 'medium' | 'hard';

export interface GameOptions {
    gameMode: GameMode;
    aiDifficulty: AIDifficulty;
    player1Branch: string;
    player2Branch: string;
    roomId: string;
}

export interface GameHistoryEntry {
    turn: number;
    phase: GameState['currentPhase'];
    message: string;
    type: 'game-event' | 'player1-action' | 'player2-action';
}

export interface ChatMessage {
    sender: 'user' | 'bot';
    message: string;
}
