import { useState } from "react";
import { AgeInput } from "@/components/AgeInput";
import { SongResult } from "@/components/SongResult";
import { NoResult } from "@/components/NoResult";
import { songs, Song } from "@/data/songs";

const Index = () => {
  const [currentView, setCurrentView] = useState<'input' | 'result' | 'no-result'>('input');
  const [foundSong, setFoundSong] = useState<Song | null>(null);
  const [searchedAge, setSearchedAge] = useState<number>(0);

  const handleAgeSubmit = (age: number) => {
    setSearchedAge(age);
    
    // Find exact match first
    let song = songs.find(s => s.age === age);
    
    // If no exact match, find closest age
    if (!song) {
      const sortedSongs = [...songs].sort((a, b) => Math.abs(a.age - age) - Math.abs(b.age - age));
      song = sortedSongs[0];
      
      // Only show result if the closest song is within a reasonable range
      const ageDifference = Math.abs(song.age - age);
      if (ageDifference > 5 && age < 100) {
        song = null;
      }
    }
    
    if (song) {
      setFoundSong(song);
      setCurrentView('result');
    } else {
      setCurrentView('no-result');
    }
  };

  const handleBack = () => {
    setCurrentView('input');
    setFoundSong(null);
    setSearchedAge(0);
  };

  if (currentView === 'result' && foundSong) {
    return <SongResult song={foundSong} searchedAge={searchedAge} onBack={handleBack} />;
  }

  if (currentView === 'no-result') {
    return <NoResult searchedAge={searchedAge} onBack={handleBack} />;
  }

  return <AgeInput onAgeSubmit={handleAgeSubmit} />;
};

export default Index;
