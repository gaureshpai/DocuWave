import React from 'react';
import '@/public/styles/Reader.css'

interface ReaderButtonsProps {
    speaking: boolean;
    searchTerm: string;
    setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
    handleTextToSpeech: () => void;
    handleSearch: () => void;
    handleQuestion: () => void;
}

const ReaderButtons: React.FC<ReaderButtonsProps> = ({
    speaking,
    searchTerm,
    setSearchTerm,
    handleTextToSpeech,
    handleSearch,
    handleQuestion,
}) => {
    return (
        <div className="navigation">
            <button className="nav-button" onClick={handleTextToSpeech}>
                {speaking ? 'Pause Speech' : 'Text to Speech'}
            </button>
            <button className="nav-button" onClick={() => window.speechSynthesis.cancel()}>
                Stop Speech
            </button>
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search term"
            />
            <button className="nav-button" onClick={handleSearch}>
                Search
            </button>
            <button className="nav-button" onClick={handleQuestion}>
                Ask Question
            </button>
        </div>
    );
};

export default ReaderButtons;
