import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Music, User, Quote, BarChart3, Shuffle } from "lucide-react";
import { Song } from "@/data/songs";

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

  const embedUrl = getYouTubeEmbedUrl(song.mv);

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto pt-8">
        <div className="flex justify-between items-center mb-6">
          <Button onClick={onBack} variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            重新搜尋
          </Button>
          <Button onClick={onShowVisualization} variant="outline">
            <BarChart3 className="w-4 h-4 mr-2" />
            數據視覺化
          </Button>
        </div>

        <Card className="p-8 border-0 shadow-lg">
          <div className="text-center mb-6">
            <Badge variant="secondary" className="mb-4 text-lg px-4 py-2">
              {searchedAge} 歲
            </Badge>
            {totalSongsForAge > 1 && (
              <div className="text-sm text-muted-foreground mb-4">
                此歲數共有 {totalSongsForAge} 首歌曲
              </div>
            )}
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
              <Music className="w-8 h-8 text-primary" />
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
                填詞：{song.lyricist}
              </p>
            </div>

            <div className="bg-muted/50 rounded-lg p-6">
              <div className="flex items-start mb-3">
                <Quote className="w-5 h-5 text-primary mr-2 mt-1 flex-shrink-0" />
                <p className="text-lg leading-relaxed text-foreground">
                  「{song.lyrics}」
                </p>
              </div>
            </div>

            {/* YouTube embed */}
            {embedUrl && (
              <div className="w-full">
                <h3 className="text-lg font-semibold mb-4 text-center">觀看音樂錄影帶</h3>
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

            {/* Another song button */}
            {onGetAnotherSong && (
              <div className="text-center">
                <Button onClick={onGetAnotherSong} variant="outline" className="w-full">
                  <Shuffle className="w-4 h-4 mr-2" />
                  換一首 {searchedAge} 歲的歌曲
                </Button>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};