// Safe user utilities to prevent undefined errors

export function safeWalletAddress(user: any): string {
  if (!user?.walletAddress) return '0x0000...0000';
  return `${user.walletAddress.slice(0, 6)}...${user.walletAddress.slice(-4)}`;
}

export function safePortfolioValue(user: any): string {
  if (!user?.portfolioValue) return '0';
  return user.portfolioValue.toLocaleString();
}

export function safeAsrdBalance(user: any): string {
  if (!user?.asrdBalance) return '0';
  return user.asrdBalance.toLocaleString();
}
