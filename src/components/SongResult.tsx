import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ExternalLink, Music, User, Quote } from "lucide-react";
import { Song } from "@/data/songs";

interface SongResultProps {
  song: Song;
  searchedAge: number;
  onBack: () => void;
}

export const SongResult = ({ song, searchedAge, onBack }: SongResultProps) => {
  const openMusicVideo = () => {
    window.open(song.mv, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-nostalgic p-4">
      <div className="absolute inset-0 bg-gradient-dreamy opacity-40"></div>
      
      <div className="relative z-10 max-w-2xl mx-auto pt-8">
        <Button 
          onClick={onBack} 
          variant="outline" 
          className="mb-6 bg-card/80 backdrop-blur-sm hover:bg-card/90 transition-smooth"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Search Again
        </Button>

        <Card className="p-8 bg-card/90 backdrop-blur-sm shadow-musical border-0">
          <div className="text-center mb-6">
            <Badge variant="secondary" className="mb-4 text-lg px-4 py-2 bg-gradient-musical">
              Age {searchedAge}
            </Badge>
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-dreamy rounded-full mb-4 animate-pulse-soft">
              <Music className="w-10 h-10 text-foreground" />
            </div>
          </div>

          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-foreground mb-2">
                {song.title}
              </h2>
              <div className="flex items-center justify-center text-muted-foreground mb-4">
                <User className="w-4 h-4 mr-2" />
                <span className="text-lg">{song.artist}</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Lyrics by {song.lyricist}
              </p>
            </div>

            <div className="bg-gradient-dreamy/20 rounded-lg p-6 border border-musical-blue/30">
              <div className="flex items-start mb-3">
                <Quote className="w-5 h-5 text-musical-purple mr-2 mt-1 flex-shrink-0" />
                <p className="text-lg leading-relaxed text-foreground italic">
                  "{song.lyrics}"
                </p>
              </div>
            </div>

            <div className="text-center space-y-4">
              <Button 
                onClick={openMusicVideo} 
                className="w-full bg-gradient-musical hover:scale-105 transition-bounce shadow-soft text-lg h-12"
              >
                <ExternalLink className="w-5 h-5 mr-2" />
                Watch Music Video
              </Button>
              
              <p className="text-sm text-muted-foreground">
                Experience the full song on YouTube
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};