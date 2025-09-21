// inside TokenDetailsModal

const priceChange = token.price_change_24h ?? 0;
const totalSupply = token.total_supply ?? 0;
const availableSupply = token.available_supply ?? 0;

const progress = totalSupply > 0 
  ? ((totalSupply - availableSupply) / totalSupply) * 100 
  : 0;

const formatPrice = (price) => price != null ? `$${Number(price).toFixed(2)}` : "N/A";
const formatNumber = (num) => {
  if (num == null) return "N/A";
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`;
  if (num >= 1_000) return `${(num / 1_000).toFixed(1)}K`;
  return num.toLocaleString();
};
