import { useState } from "react";
import { AgeInput } from "@/components/AgeInput";
import { SongResult } from "@/components/SongResult";
import { NoResult } from "@/components/NoResult";
import { DataVisualization } from "@/components/DataVisualization";
import { songs, Song } from "@/data/songs";

const Index = () => {
  const [currentView, setCurrentView] = useState<'input' | 'result' | 'no-result' | 'visualization'>('input');
  const [foundSong, setFoundSong] = useState<Song | null>(null);
  const [searchedAge, setSearchedAge] = useState<number>(0);
  const [agesongs, setAgeSeongs] = useState<Song[]>([]);
  const [currentSongIndex, setCurrentSongIndex] = useState<number>(0);

  const handleAgeSubmit = (age: number) => {
    setSearchedAge(age);
    
    // Find all songs for exact age match
    const exactMatches = songs.filter(s => s.age === age);
    
    if (exactMatches.length > 0) {
      setAgeSeongs(exactMatches);
      // Randomly select one song to display first
      const randomIndex = Math.floor(Math.random() * exactMatches.length);
      setCurrentSongIndex(randomIndex);
      setFoundSong(exactMatches[randomIndex]);
      setCurrentView('result');
    } else {
      setCurrentView('no-result');
    }
  };

  const handleGetAnotherSong = () => {
    if (ageSeongs.length > 1) {
      // Get available indices excluding current one
      const availableIndices = ageSeongs.map((_, index) => index).filter(index => index !== currentSongIndex);
      const randomIndex = availableIndices[Math.floor(Math.random() * availableIndices.length)];
      setCurrentSongIndex(randomIndex);
      setFoundSong(ageSeongs[randomIndex]);
    }
  };

  const handleBack = () => {
    setCurrentView('input');
    setFoundSong(null);
    setSearchedAge(0);
    setAgeSeongs([]);
    setCurrentSongIndex(0);
  };

  const handleShowVisualization = () => {
    setCurrentView('visualization');
  };

  if (currentView === 'result' && foundSong) {
    return (
      <SongResult 
        song={foundSong} 
        searchedAge={searchedAge} 
        onBack={handleBack} 
        onShowVisualization={handleShowVisualization}
        onGetAnotherSong={ageSeongs.length > 1 ? handleGetAnotherSong : undefined}
        totalSongsForAge={ageSeongs.length}
      />
    );
  }

  if (currentView === 'no-result') {
    return <NoResult searchedAge={searchedAge} onBack={handleBack} />;
  }

  if (currentView === 'visualization') {
    return <DataVisualization onBack={handleBack} />;
  }

  return <AgeInput onAgeSubmit={handleAgeSubmit} />;
};

export default Index;
