interface MoviePosterProps {
  src: string | undefined;
  alt: string;
  className?: string;
}

export function MoviePoster({ src, alt, className }: MoviePosterProps)
{
  const isValid = src && src !== "N/A"

  if (!isValid)
  {
    return (
      <img
        src="/no-image.png"
        alt={alt}
        className={`poster-fallback ${className ?? ""}`.trim()}
      />
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={(e) =>
      {
        const target = e.currentTarget
        target.src = "/no-image.png"
        target.className = `poster-fallback ${className ?? ""}`.trim()
      }}
    />
  )
}
