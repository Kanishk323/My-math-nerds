
import React, { useState } from 'react';
import Lobby from './components/Lobby';
import Game from './components/Game';
import { GameOptions } from './types';

const App: React.FC = () => {
    const [gameOptions, setGameOptions] = useState<GameOptions | null>(null);

    const handleStartGame = (options: GameOptions) => {
        setGameOptions(options);
    };
    
    const handleExitGame = () => {
        setGameOptions(null);
    };

    return (
        <div style={{ fontFamily: "'Inter', sans-serif" }} className="min-h-screen text-center p-2 sm:p-4 flex flex-col items-center justify-center text-slate-800">
            {gameOptions ? (
                <Game options={gameOptions} onExit={handleExitGame} />
            ) : (
                <Lobby onStartGame={handleStartGame} />
            )}
        </div>
    );
};

export default App;
