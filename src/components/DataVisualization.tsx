import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, BarChart3 } from "lucide-react";
import { songs } from "@/data/songs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Logo } from "@/components/Logo";

interface DataVisualizationProps {
  onBack: () => void;
}

export const DataVisualization = ({ onBack }: DataVisualizationProps) => {
  // Process data to count songs by age
  const ageGroups = songs.reduce((acc, song) => {
    const age = song.age;
    acc[age] = (acc[age] || 0) + 1;
    return acc;
  }, {} as Record<number, number>);

  // Create data array for chart
  const chartData = [];
  const minAge = Math.min(...songs.map(s => s.age));
  const maxAge = Math.max(...songs.map(s => s.age).filter(age => age <= 100)); // Cap at 100 for better visualization

  // Add data points from minAge to maxAge
  for (let age = Math.floor(minAge); age <= maxAge; age++) {
    chartData.push({
      age: age,
      count: ageGroups[age] || 0,
      label: age === -0.1 ? "-0.1" : age.toString()
    });
  }

  // Add some notable high ages
  const notableAges = [120, 123, 200, 400, 600, 1000, 1300, 5000, 1000000, 4600000000];
  notableAges.forEach(age => {
    if (ageGroups[age]) {
      chartData.push({
        age: age,
        count: ageGroups[age],
        label: age >= 1000000 ? `${(age/1000000).toLocaleString()},000,000` : 
               age >= 1000 ? `${(age/1000).toLocaleString()},000` : age.toLocaleString()
      });
    }
  });

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="w-full flex justify-center pt-4 pb-4">
        <Logo className="scale-75" />
      </div>
      
      <div className="max-w-6xl mx-auto">
        <Button 
          onClick={onBack} 
          variant="outline" 
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          返回
        </Button>

        <Card className="p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
              <BarChart3 className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              歲數歌曲分佈圖
            </h1>
            <p className="text-muted-foreground">
              顯示不同歲數的香港流行曲數量統計
            </p>
          </div>

          <div className="space-y-8">
            {/* Main chart for ages -1 to 100 */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-foreground">
                主要年齡分佈 (-0.1 至 100 歲)
              </h3>
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={chartData.filter(d => d.age <= 100)}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                    <XAxis 
                      dataKey="label" 
                      interval="preserveStartEnd"
                      tick={{ fontSize: 12 }}
                    />
                    <YAxis 
                      tick={{ fontSize: 12 }}
                    />
                    <Tooltip 
                      formatter={(value, name) => [value, '歌曲數量']}
                      labelFormatter={(label) => `年齡: ${label}`}
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '6px'
                      }}
                    />
                    <Bar 
                      dataKey="count" 
                      fill="hsl(var(--primary))" 
                      radius={[2, 2, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Notable high ages */}
            {chartData.filter(d => d.age > 100).length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-4 text-foreground">
                  特殊高齡歌曲
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {chartData.filter(d => d.age > 100).map((item) => (
                    <Card key={item.age} className="p-4 text-center">
                      <div className="text-2xl font-bold text-primary mb-1">
                        {item.count}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {item.label}歲
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Summary statistics */}
            <div className="bg-muted/50 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4 text-foreground">
                統計摘要
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">
                    {songs.length}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    總歌曲數
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">
                    {(() => {
                      const maxCount = Math.max(...Object.values(ageGroups));
                      const ageWithMaxSongs = Object.keys(ageGroups).find(age => ageGroups[Number(age)] === maxCount);
                      return `${ageWithMaxSongs}歲`;
                    })()}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    最多相關歌曲的歲數
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Reserved space for explanatory text */}
          <div className="mt-8 pt-6 border-t border-border">
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p className="text-sm">
                {/* 預留位置給解說文字 - 可在此處添加數據分析和見解 */}
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};