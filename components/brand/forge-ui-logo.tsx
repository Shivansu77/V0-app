interface ForgeUiLogoProps {
  className?: string
}

export function ForgeUiLogo({ className }: ForgeUiLogoProps) {
  return (
    <svg
      aria-label="Forge-UI"
      className={className}
      role="img"
      viewBox="0 0 152 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="1"
        y="1"
        width="38"
        height="38"
        rx="12"
        fill="currentColor"
        fillOpacity="0.08"
        stroke="currentColor"
        strokeOpacity="0.42"
        strokeWidth="1.5"
      />
      <path
        d="M20 9.5L22.45 17.55L30.5 20L22.45 22.45L20 30.5L17.55 22.45L9.5 20L17.55 17.55L20 9.5Z"
        fill="currentColor"
      />
      <text
        x="49"
        y="26"
        fill="currentColor"
        fontFamily="Arial, Helvetica, sans-serif"
        fontSize="19"
        fontWeight="700"
        letterSpacing="-0.8"
      >
        Forge-UI
      </text>
    </svg>
  )
}
