
interface ErrorMessageProps {
  message: string;
}

export function ErrorMessage({ message }: ErrorMessageProps) 
{
  return (
    <p className="error">
      <span className="error-badge">⚠</span> {message}
    </p>
  )
}
