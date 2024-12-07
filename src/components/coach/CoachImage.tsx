interface CoachImageProps {
  src: string;
  alt: string;
}

export default function CoachImage({ src, alt }: CoachImageProps) {
  return (
    <div className="relative">
      <img
        src={src}
        alt={alt}
        className="w-full h-48 object-cover rounded-lg"
      />
    </div>
  );
}