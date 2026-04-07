
interface LogoProps {
  className?: string;
}

export default function Logo({ className }: LogoProps) {
  return (
    <svg 
      className={className} 
      viewBox="0 0 220 60" 
      width="100%"
      height="100%"
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Artisan Cafe Logo"
    >
      {/* Minimalist Coffee Cup Line Art */}
      <g stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        {/* Cup Body */}
        <path d="M15 22C15 35 24 44 35 44C46 44 55 35 55 22V18H15V22Z"/>
        {/* Handle */}
        <path d="M55 22C55 26 58 29 61 29C64 29 67 26 67 22C67 18 64 15 61 15H55"/>
        {/* Steam */}
        <path d="M28 10C31 10 32 6 35 6C38 6 39 10 42 10" strokeWidth="2"/>
        <path d="M23 14C26 14 27 10 30 10C33 10 34 14 37 14" strokeWidth="2"/>
        {/* Accent / Bean detail inside cup */}
        <path d="M28 28C28 32 35 36 42 32" strokeWidth="1.5"/>
      </g>
      
      {/* Typography */}
      <text 
        x="80" 
        y="36" 
        fontFamily="ui-sans-serif, system-ui, sans-serif" 
        fontSize="28" 
        fontWeight="700" 
        letterSpacing="0.08em" 
        fill="currentColor"
      >
        ARTISAN
      </text>
    </svg>
  );
}
