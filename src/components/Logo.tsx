export const Logo = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <img 
        src="/lovable-uploads/white-logo.png" 
        alt="logo"
        className="h-8"
      />
    </div>
  );
};