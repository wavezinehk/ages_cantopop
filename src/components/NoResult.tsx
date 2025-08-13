import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Music, Search } from "lucide-react";

interface NoResultProps {
  searchedAge: number;
  onBack: () => void;
}

export const NoResult = ({ searchedAge, onBack }: NoResultProps) => {
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
          Try Another Age
        </Button>

        <Card className="p-8 bg-card/90 backdrop-blur-sm shadow-musical border-0 text-center">
          <Badge variant="secondary" className="mb-6 text-lg px-4 py-2 bg-gradient-musical">
            Age {searchedAge}
          </Badge>
          
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-dreamy rounded-full mb-6 opacity-60">
            <Music className="w-10 h-10 text-foreground" />
          </div>

          <h2 className="text-2xl font-bold text-foreground mb-4">
            No Song Found
          </h2>
          
          <p className="text-muted-foreground mb-6 leading-relaxed">
            Unfortunately, we don't have a Cantopop song that specifically references age {searchedAge} in our collection. 
            The database contains songs from ages -0.1 to 1,000,000 years.
          </p>

          <div className="bg-gradient-dreamy/20 rounded-lg p-4 mb-6 border border-musical-blue/30">
            <p className="text-sm text-muted-foreground">
              <strong>Tip:</strong> Try popular ages like 16, 17, 18, 20, 25, 27, 30, or even unique ones like 100!
            </p>
          </div>

          <Button 
            onClick={onBack} 
            className="bg-gradient-musical hover:scale-105 transition-bounce shadow-soft"
          >
            <Search className="w-4 h-4 mr-2" />
            Search Another Age
          </Button>
        </Card>
      </div>
    </div>
  );
};