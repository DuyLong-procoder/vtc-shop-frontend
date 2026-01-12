
interface PriceDisplayProps {
  price: number;
  oldPrice?: number;
}

export default function PriceDisplay({ price, oldPrice }: PriceDisplayProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-lg font-bold text-gray-900">
        ${price.toFixed(2)}
      </span>
      
      {oldPrice && (
        <span className="text-sm text-gray-400 line-through">
          ${oldPrice.toFixed(2)}
        </span>
      )}
    </div>
  );
}