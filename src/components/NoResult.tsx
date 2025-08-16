import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Music, Search, BarChart3 } from "lucide-react";
import { Logo } from "@/components/Logo";

interface NoResultProps {
  searchedAge: number;
  onBack: () => void;
  onShowVisualization: () => void;
}

export const NoResult = ({ searchedAge, onBack, onShowVisualization }: NoResultProps) => {
  return (
    <div className="min-h-screen bg-background p-4">
      <div className="w-full flex justify-center pt-4 pb-4">
        <Logo className="scale-75" />
      </div>
      
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <Button 
            onClick={onBack} 
            variant="outline"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            重新搜尋
          </Button>
          <Button onClick={onShowVisualization} variant="default" className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg">
            <BarChart3 className="w-4 h-4 mr-2" />
            數據背後
          </Button>
        </div>

        <Card className="p-6 border-0 shadow-lg text-center">
          <Badge variant="secondary" className="mb-4 text-lg px-4 py-2">
            {searchedAge} 歲
          </Badge>
          
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
            <Music className="w-8 h-8 text-primary" />
          </div>

          <h2 className="text-2xl font-bold text-foreground mb-4">
            找不到歌曲
          </h2>
          
          <p className="text-muted-foreground mb-6 leading-relaxed">
            很抱歉，我們的資料庫中沒有找到涉及 {searchedAge} 歲的香港流行曲。
            資料庫涵蓋 -0.1 歲至 1,000,000 歲的歌曲。
          </p>

          <div className="bg-muted/50 rounded-lg p-4 mb-6">
            <p className="text-sm text-muted-foreground">
              <strong>建議：</strong>嘗試一些常見的歲數，如 16、17、18、20、25、27、30，或甚至特別的如 100！
            </p>
          </div>

          <div className="flex gap-3 justify-center">
            <Button 
              onClick={onBack} 
              variant="outline"
              className="hover:scale-105 transition-transform"
            >
              <Search className="w-4 h-4 mr-2" />
              搜尋其他歲數
            </Button>
            <Button 
              onClick={onShowVisualization} 
              variant="default"
              className="hover:scale-105 transition-transform bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg"
            >
              <BarChart3 className="w-4 h-4 mr-2" />
              看看數據背後
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};