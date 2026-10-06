import { buildSeedSettings, saveSettings } from "../src/lib/store/menu-store";

async function main() {
  const settings = buildSeedSettings();
  await saveSettings(settings);
  console.log("CMS settings reset. setupComplete=", settings.setupComplete);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
