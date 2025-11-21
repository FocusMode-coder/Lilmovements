import Link from "next/link";

interface GlassButtonProps {
  label: string;
  onClick?: () => void;
  href?: string;
  variant?: "primary" | "secondary";
  className?: string;
}

export default function GlassButton({ 
  label, 
  onClick, 
  href, 
  variant = "primary", 
  className = ""
}: GlassButtonProps) {
  const baseClasses = `
    rounded-full px-6 py-3 text-sm font-medium shadow-md border backdrop-blur-md 
    transition-all duration-300 ease-out
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-400
    active:scale-95
  `.trim();
  
  const variantClasses = {
    primary: `
      bg-white/50 border-white/70 text-neutral-900 
      hover:bg-white/80 hover:shadow-xl hover:-translate-y-0.5
      shadow-lg
    `.trim(),
    secondary: `
      bg-white/30 border-white/50 text-neutral-700 
      hover:bg-white/50 hover:shadow-lg hover:-translate-y-0.5
    `.trim()
  };

  const finalClasses = `${baseClasses} ${variantClasses[variant]} ${className}`;

  if (href) {
    return (
      <Link 
        href={href} 
        className={finalClasses}
        aria-label={label}
      >
        {label}
      </Link>
    );
  }

  return (
    <button 
      onClick={onClick}
      className={finalClasses}
      aria-label={label}
    >
      {label}
    </button>
  );
}