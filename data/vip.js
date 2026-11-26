export const VIP_LEVELS = [
  { level: 0, name: "VIP 0", priceNumber: 0, dailyNumber: 1500, boostNumber: 500, productsDaily: 3 },
  { level: 1, name: "VIP 1", priceNumber: 50000, dailyNumber: 1800, boostNumber: 900, productsDaily: 2 },
  { level: 2, name: "VIP 2", priceNumber: 180000, dailyNumber: 6000, boostNumber: 1000, productsDaily: 6 },
  { level: 3, name: "VIP 3", priceNumber: 600000, dailyNumber: 19000, boostNumber: 950, productsDaily: 20 },
  { level: 4, name: "VIP 4", priceNumber: 780000, dailyNumber: 25000, boostNumber: 834, productsDaily: 30 },
  { level: 5, name: "VIP 5", priceNumber: 900000, dailyNumber: 29000, boostNumber: 725, productsDaily: 40 },
  { level: 6, name: "VIP 6", priceNumber: 1500000, dailyNumber: 45000, boostNumber: 900, productsDaily: 50 },
  { level: 7, name: "VIP 7", priceNumber: 2300000, dailyNumber: 69000, boostNumber: 1150, productsDaily: 60 },
];

export function getVipByLevel(level) {
  return VIP_LEVELS.find(v => v.level === level) || VIP_LEVELS[0];
}