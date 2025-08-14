import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Music, Search } from "lucide-react";

interface AgeInputProps {
  onAgeSubmit: (age: number) => void;
}

export const AgeInput = ({ onAgeSubmit }: AgeInputProps) => {
  const [age, setAge] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numericAge = parseFloat(age);
    if (!isNaN(numericAge) && numericAge >= -1) {
      onAgeSubmit(numericAge);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md p-8 border-0 shadow-lg">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
            <Music className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-2">
            歲數如歌
          </h1>
          <p className="text-muted-foreground">
            尋找屬於某個歲數的粵語歌曲
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="age" className="text-sm font-medium text-foreground">
              輸入一個歲數
            </label>
            <Input 
              id="age" 
              type="number" 
              placeholder="例如: 25" 
              value={age} 
              onChange={e => setAge(e.target.value)} 
              className="text-center text-lg h-12"
              min="-1" 
              max="10000000000" 
              step="0.1" 
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full h-12"
            disabled={!age}
          >
            <Search className="w-4 h-4 mr-2" />
            尋找我的歌曲
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-xs text-muted-foreground">
            涵蓋 -0.1 歲至億萬歲的歌曲
          </p>
        </div>
      </Card>
    </div>
  );
};