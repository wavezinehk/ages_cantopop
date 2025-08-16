export const Logo = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className="flex items-baseline font-bold text-foreground tracking-wide">
        <span className="text-2xl">m</span>
        <span className="text-2xl">o</span>
        <div className="w-6 h-6 bg-foreground rounded-full mx-1"></div>
        <span className="text-2xl">v</span>
        <div className="w-6 h-6 bg-foreground mx-1" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}></div>
      </div>
    </div>
  );
};