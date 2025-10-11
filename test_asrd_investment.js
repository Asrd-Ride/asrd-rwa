// Test the ASRD investment logic
function testInvestFunction() {
  const user = {
    name: "Test User",
    asrdBalance: 5000,
    portfolioValue: 100000
  };

  const investmentAmount = 32000; // $32,000 investment
  const asrdTokensCost = investmentAmount / 32; // 1000 ASRD tokens

  console.log("=== ASRD Investment Test ===");
  console.log("Initial ASRD Balance:", user.asrdBalance);
  console.log("Investment Amount: $", investmentAmount);
  console.log("ASRD Tokens Required:", asrdTokensCost);
  
  if (user.asrdBalance >= asrdTokensCost) {
    user.asrdBalance -= asrdTokensCost;
    user.portfolioValue += investmentAmount;
    console.log("✅ Investment Successful!");
    console.log("New ASRD Balance:", user.asrdBalance);
    console.log("New Portfolio Value: $", user.portfolioValue);
  } else {
    console.log("❌ Insufficient ASRD Balance!");
  }
}

testInvestFunction();
