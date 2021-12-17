import drops from "./data/drops.json";

const NOW = new Date();

const requiredProperties = [
  "network",
  "name",
  "symbol",
  "announcementLink",
  "ecosystems",
  "homeLink",
];

function verify(drop: any) {
  const missing = requiredProperties.find((prop) => !drop[prop]);
  if (missing) {
    return `Missing ${missing}`;
  }

  if (
    drop.startDate &&
    new Date(drop.startDate).getTime() < NOW.getTime() &&
    !drop.claimLink
  ) {
    return "Invalid claim link";
  }

  return true;
}

describe("verifies data.json", () => {
  drops.forEach((drop) => {
    it(drop.name, () => {
      expect(verify(drop)).toBe(true);
    });
  });
});
