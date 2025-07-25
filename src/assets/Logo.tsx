const Logo = () =>(

<div className="flex items-center space-x-2">
  <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" fill="none">
    <rect x="2" y="2" width="30" height="36" rx="3" ry="3" fill="#1D4ED8" />
    <path d="M10 8H24M10 16H24M10 24H24" stroke="white" strokeWidth="2" strokeLinecap="round" />
    <polygon points="4,2 8,2 8,16 6,14 4,16" fill="#FACC15" />
  </svg>
  <span className="text-black dark:text-white font-bold text-lg font-[Verdana]">
    LibManager
  </span>
</div>
);

export default Logo;