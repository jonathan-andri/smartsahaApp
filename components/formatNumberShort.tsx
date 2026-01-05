export function formatNumberShort(value: number): string {
    if (value < 1000) return value.toString();
  
    if (value < 1_000_000) {
      const num = value / 1000;
      return `${parseFloat(num.toFixed(1))}k`;
    }
  
    if (value < 1_000_000_000) {
      const num = value / 1_000_000;
      return `${parseFloat(num.toFixed(1))}M`;
    }
  
    const num = value / 1_000_000_000;
    return `${parseFloat(num.toFixed(1))}B`;
  }
  