export const Logo = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <img 
        src="/lovable-uploads/e09a5f4d-f21b-41b2-a6d0-c930f5aa5919.png" 
        alt="logo"
        className="h-8 filter invert"
      />
    </div>
  );
};