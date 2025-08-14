import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Music, Search } from "lucide-react";
interface AgeInputProps {
  onAgeSubmit: (age: number) => void;
}
export const AgeInput = ({
  onAgeSubmit
}: AgeInputProps) => {
  const [age, setAge] = useState("");
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numericAge = parseFloat(age);
    if (!isNaN(numericAge) && numericAge >= 0) {
      onAgeSubmit(numericAge);
    }
  };
  return <div className="min-h-screen flex items-center justify-center bg-gradient-musical p-4">
      <div className="absolute inset-0 bg-gradient-nostalgic opacity-30"></div>
      
      <Card className="relative z-10 w-full max-w-md p-8 bg-card/90 backdrop-blur-sm shadow-musical border-0">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-dreamy rounded-full mb-4 animate-float">
            <Music className="w-8 h-8 text-foreground" />
          </div>
          <h1 className="font-bold bg-gradient-musical bg-clip-text mb-2 text-5xl text-rose-500">歲數如歌</h1>
          <p className="text-muted-foreground">尋找屬於某個歲數的廣東歌詞</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="age" className="text-sm font-medium text-foreground">輸入一個歲數</label>
            <Input id="age" type="number" placeholder="e.g. 25" value={age} onChange={e => setAge(e.target.value)} className="text-center text-lg h-12 border-2 border-border focus:border-primary transition-smooth" min="0" max="10000" step="0.1" />
          </div>
          
          <Button type="submit" className="w-full h-12 bg-gradient-musical hover:scale-105 transition-bounce shadow-soft" disabled={!age}>
            <Search className="w-4 h-4 mr-2" />
            Find My Song
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-xs text-muted-foreground">
            Ages from -0.1 to 1,000,000 years available
          </p>
        </div>
      </Card>
    </div>;
};