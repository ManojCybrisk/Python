import React, { useState, useEffect } from 'react';
import { Sparkles, Trophy, RotateCcw } from 'lucide-react';

// Card types with emojis for easy visualization
const CARD_EMOJIS = ['🌟', '🎨', '🌈', '🎭', '🎪', '🎡', '🎢', '🎠'];

interface Card {
  id: number;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
}

function App() {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [matches, setMatches] = useState(0);
  const [isWon, setIsWon] = useState(false);

  // Initialize game
  const initializeGame = () => {
    const duplicatedEmojis = [...CARD_EMOJIS, ...CARD_EMOJIS];
    const shuffledCards = duplicatedEmojis
      .sort(() => Math.random() - 0.5)
      .map((emoji, index) => ({
        id: index,
        emoji,
        isFlipped: false,
        isMatched: false,
      }));
    setCards(shuffledCards);
    setFlippedCards([]);
    setMoves(0);
    setMatches(0);
    setIsWon(false);
  };

  useEffect(() => {
    initializeGame();
  }, []);

  const handleCardClick = (id: number) => {
    if (
      flippedCards.length === 2 ||
      flippedCards.includes(id) ||
      cards[id].isMatched
    ) {
      return;
    }

    const newFlippedCards = [...flippedCards, id];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      setMoves((prev) => prev + 1);
      const [firstId, secondId] = newFlippedCards;
      
      if (cards[firstId].emoji === cards[secondId].emoji) {
        setCards((prev) =>
          prev.map((card) =>
            card.id === firstId || card.id === secondId
              ? { ...card, isMatched: true }
              : card
          )
        );
        setMatches((prev) => {
          const newMatches = prev + 1;
          if (newMatches === CARD_EMOJIS.length) {
            setIsWon(true);
          }
          return newMatches;
        });
        setFlippedCards([]);
      } else {
        setTimeout(() => {
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 to-pink-500 flex flex-col items-center justify-center p-4">
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-2xl p-8">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-2">
            <Sparkles className="text-yellow-500" />
            <h1 className="text-3xl font-bold text-gray-800">Memory Game</h1>
          </div>
          <div className="flex gap-4">
            <div className="flex items-center gap-2">
              <Trophy className="text-yellow-500" />
              <span className="text-lg font-semibold">Matches: {matches}</span>
            </div>
            <div className="text-lg font-semibold">Moves: {moves}</div>
            <button
              onClick={initializeGame}
              className="flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
            >
              <RotateCcw size={20} />
              Restart
            </button>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4">
          {cards.map((card) => (
            <button
              key={card.id}
              onClick={() => handleCardClick(card.id)}
              className={`aspect-square text-4xl rounded-xl transition-all duration-300 transform ${
                card.isFlipped || card.isMatched || flippedCards.includes(card.id)
                  ? 'bg-white border-2 border-purple-500 rotate-0'
                  : 'bg-purple-500 rotate-y-180'
              } ${
                card.isMatched
                  ? 'border-green-500 opacity-60'
                  : ''
              } hover:scale-105`}
              disabled={card.isMatched}
            >
              {(card.isFlipped ||
                card.isMatched ||
                flippedCards.includes(card.id)) &&
                card.emoji}
            </button>
          ))}
        </div>

        {isWon && (
          <div className="mt-8 text-center">
            <h2 className="text-2xl font-bold text-green-500">
              🎉 Congratulations! You won in {moves} moves! 🎉
            </h2>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;