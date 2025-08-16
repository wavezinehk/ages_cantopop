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

  // Process data to count songs by lyricist
  const lyricistCounts = songs.reduce((acc, song) => {
    const lyricist = song.lyricist;
    acc[lyricist] = (acc[lyricist] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Get top 5 lyricists
  const topLyricists = Object.entries(lyricistCounts)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 5);

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

  // Helper function to format large numbers
  const formatAge = (age: number): string => {
    if (age === 1300) return "1,300";
    if (age === 1000000) return "100萬";
    if (age === 4600000000) return "46億";
    if (age >= 1000000) return `${(age/1000000).toLocaleString()}萬萬`;
    if (age >= 1000) return `${(age/1000).toLocaleString()},000`;
    return age.toLocaleString();
  };

  // Add some notable high ages
  const notableAges = [120, 123, 200, 400, 600, 1000, 1300, 5000, 1000000, 4600000000];
  notableAges.forEach(age => {
    if (ageGroups[age]) {
      chartData.push({
        age: age,
        count: ageGroups[age],
        label: formatAge(age)
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
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
              
              {/* Top lyricists */}
              <div>
                <h4 className="text-md font-semibold mb-3 text-foreground">
                  最多歲數歌曲的填詞人（頭五位）
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
                  {topLyricists.map(([lyricist, count], index) => (
                    <div key={lyricist} className="text-center p-3 bg-background rounded-lg">
                      <div className="text-lg font-bold text-primary">
                        {count}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {lyricist}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Explanatory text */}
          <div className="mt-8 pt-6 border-t border-border">
            <div className="space-y-4 text-muted-foreground leading-relaxed text-sm">
              <p>
                這個「歲數如歌」互動專頁，來自早前在 Threads 看到有人說 26 歲生日將至，問起有沒有關於這個歲數的流行曲？不少網民都熱心留言，也挑起了我們的好奇心：究竟關於歲數的流行曲有幾多？是不是每個歲數都有相關的歌？
              </p>
              
              <p>
                記者首先自行搜索，再於 Threads 發文呼籲「脆友」集思廣益，結果發現數量著實不少 — 尤其將搜索範圍從歌名或歌曲主題，擴大至所有歌詞內容。
              </p>
              
              <p>
                有些歌曲整首都以某歲數為主題，較近期的例子有 Moon Tang 的〈二十五圓舞曲〉，由小克填詞，說的是廿五歲女生的成長之痛，又例如盧凱彤為電影《那夜凌晨，我坐上旺角開往大埔的紅 VAN》創作的〈Twenty Seven〉，整首歌主題統一，以 27 歲女子角度，敘述了在城市發展過程中，香港人的集體迷失，亦寄托了對未來的美好盼望。
              </p>
              
              <p>
                但整首歌都關於某一歲數的作品，終究只是少數。我們搜集到的不少香港流行曲，歌詞中的歲數更似是一種符號，是填詞人用來說故事的詞彙。例如陳展鵬的〈零歲〉，內容談的當然不是初生嬰孩的心境，而是一種重拾最初衝勁的比喻，如歌詞所述，「如零歲那樣豁出去」。
              </p>
              
              <p>
                從這個角度，我們就能理解為何某些歲數特別常見於香港流行歌詞，例如六歲，就經常被填詞人用來代表懵懂無知的童年，如「如何又信六歲聽過的童話」（〈愛我請留言〉）、「不想哭與啼 要人抱我 別犯六歲的錯」（張蔓莎〈你不是可有可無的〉）。
              </p>
              
              <p>
                「六歲」等同童年，那老年呢？不少歌詞以八十歲來代表年老、生命將近終結，如「八十歲 到病榻 相伴 我也算是 笑著蓋棺」（E先生 連環不幸事件）、「要 在八十歲跟你大跳土風舞」（人生有幾個十年）。
              </p>
              
              <p>
                整個資料庫之中，六歲和八十歲的相關歌曲正正最多，分別有 13 首及 9 首。
              </p>
              
              <p>
                另一個發現是，由零歲至 30 歲，基本上每個年齡都找到相關歌曲 — 當然如前所述，有些比較貼切，也有些歲數的代表作品略為牽強。但到了 30 歲過後，相關的歲數歌曲就開始變得稀少，只有一些特別的歲數關口（如 60 歲）才有相關作品。這一來可能因為流行曲的聽眾／消費者多是 18 至 30 歲一群，詞人「度身訂造」相關歌曲，二來又呼應不少成年人的生活經驗 — 年輕時每年生日都很著緊，好像每一歲都很不同，但到三十過後，對於歲數開始沒那麼著緊，甚至覺得每一年都差不多。
              </p>
              
              <p>
                當然還有另一原因 — 流行曲跟新詩有別，填詞人除了考慮文意，也要歌詞「啱音」— 「六歲」、「十七歲」、「廿五歲」字數較少，或許較易入詞，「五十四歲」呢？好像比較棘手了。
              </p>
              
              <p>
                最後戴個頭盔，由於倚賴網上搜尋來建立，這個歲數歌曲資料庫並不完整。如果你想到一些有關某個歲數的香港流行曲，而我們未包括在內，歡迎到 <a href="https://forms.gle/Bz8Txh4AKta8ZNyV6" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">https://forms.gle/Bz8Txh4AKta8ZNyV6</a> 提交，感謝！
              </p>
              
              <div className="pt-4 text-right">
                <p className="font-medium">製作／阿果</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};