import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Music, User, Quote, BarChart3, Shuffle } from "lucide-react";
import { Song } from "@/data/songs";
import { Logo } from "@/components/Logo";

interface SongResultProps {
  song: Song;
  searchedAge: number;
  onBack: () => void;
  onShowVisualization: () => void;
  onGetAnotherSong?: () => void;
  totalSongsForAge: number;
}

export const SongResult = ({ song, searchedAge, onBack, onShowVisualization, onGetAnotherSong, totalSongsForAge }: SongResultProps) => {
  // Extract YouTube video ID from URL
  const getYouTubeEmbedUrl = (url: string) => {
    const videoId = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/);
    return videoId ? `https://www.youtube.com/embed/${videoId[1]}` : null;
  };

  // Highlight age numbers in lyrics
  const highlightAgeInLyrics = (lyrics: string, age: number) => {
    const ageStr = age.toString();
    const ageRegex = new RegExp(`(${ageStr}歲)`, 'g');
    return lyrics.replace(ageRegex, '<strong>$1</strong>');
  };

  const embedUrl = getYouTubeEmbedUrl(song.mv);

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="w-full flex justify-center pt-2 pb-4">
        <Logo className="scale-75" />
      </div>
      
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <Button onClick={onBack} variant="outline" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            重新搜尋
          </Button>
          <Button onClick={onShowVisualization} variant="outline" size="sm">
            <BarChart3 className="w-4 h-4 mr-2" />
            了解數據
          </Button>
        </div>

        {/* Another song button - prominently displayed at top */}
        {onGetAnotherSong && (
          <div className="text-center mb-4">
            <Button onClick={onGetAnotherSong} variant="default" className="mb-2">
              <Shuffle className="w-4 h-4 mr-2" />
              換一首 {searchedAge} 歲的歌曲
            </Button>
            <div className="text-sm text-muted-foreground">
              此歲數共有 {totalSongsForAge} 首歌曲
            </div>
          </div>
        )}

        <Card className="p-6 border-0 shadow-lg">
          <div className="text-center mb-4">
            <Badge variant="secondary" className="mb-3 text-lg px-4 py-2">
              {searchedAge} 歲
            </Badge>
            <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mb-3">
              <Music className="w-6 h-6 text-primary" />
            </div>
          </div>

          <div className="space-y-4">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-foreground mb-2">
                {song.title}
              </h2>
              <div className="flex items-center justify-center text-muted-foreground mb-3">
                <User className="w-4 h-4 mr-2" />
                <span className="text-base">{song.artist}</span>
              </div>
              <p className="text-sm text-muted-foreground">
                填詞：{song.lyricist}
              </p>
            </div>

            <div className="bg-muted/50 rounded-lg p-4">
              <div className="flex items-start mb-3">
                <Quote className="w-5 h-5 text-primary mr-2 mt-1 flex-shrink-0" />
                <p 
                  className="text-base leading-relaxed text-foreground"
                  dangerouslySetInnerHTML={{ 
                    __html: `「${highlightAgeInLyrics(song.lyrics, searchedAge)}」` 
                  }}
                />
              </div>
            </div>

            {/* YouTube embed */}
            {embedUrl && (
              <div className="w-full">
                <h3 className="text-base font-semibold mb-3 text-center">觀看音樂錄影帶</h3>
                <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                  <iframe
                    src={embedUrl}
                    title={`${song.title} - ${song.artist}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute top-0 left-0 w-full h-full rounded-lg"
                  />
                </div>
              </div>
            )}

          </div>
        </Card>
      </div>
    </div>
  );
};