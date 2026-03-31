import { useState } from "react"
import { Star } from "./Star"
import type { CSSProperties } from "react"

interface StarRatingProps {
  maxRating?: number;
  defaultRating?: number;
  color?: string;
  size?: number;
  className?: string;
  onSetRating: (rating: number) => void;
}

const containerStyle: CSSProperties = 
{
  display: "flex",
  alignItems: "center",
  gap: "16px",
}

const starContainerStyle: CSSProperties = 
{
  display: "flex",
}

export default function StarRating(
  {
    maxRating = 5,
    color = "#fcc419",
    size = 48,
    className = "",
    defaultRating = 0,
    onSetRating,
  }: StarRatingProps) 
{
  const [rating, setRating] = useState(defaultRating)
  const [tempRating, setTempRating] = useState(0)

  function handleRating(ratingValue: number) 
  {
    setRating(ratingValue)
    onSetRating(ratingValue)
  }

  const textStyle: CSSProperties = 
  {
    lineHeight: "1",
    margin: "0",
    color,
    fontSize: `${size / 1.5}px`,
  }

  return (
    <div style={containerStyle} className={className}>
      
      <div style={starContainerStyle}>
        {Array.from({ length: maxRating }, (_, i) => (
          <Star
            key={i}
            full={tempRating ? tempRating >= i + 1 : rating >= i + 1}
            onRate={() => handleRating(i + 1)}
            onHoverIn={() => setTempRating(i + 1)}
            onHoverOut={() => setTempRating(0)}
            color={color}
            size={size}
          />
        ))}
      </div>

      <p style={textStyle}>
        {tempRating || rating || ""}
      </p>

    </div>
  )
}
