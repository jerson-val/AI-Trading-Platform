const fs = require("fs");
const path = require("path");

const iconsFolder = path.join(
    __dirname,
    "..",
    "public",
    "crypto-icons"
);

const output = path.join(
    __dirname,
    "..",
    "src",
    "config",
    "availableCryptoIcons.ts"
);

const icons = fs
    .readdirSync(iconsFolder)
    .filter(f => f.endsWith(".svg"))
    .map(f => f.replace(".svg", "").toLowerCase());

const content = `export const AVAILABLE_CRYPTO_ICONS = new Set(${JSON.stringify(
    icons,
    null,
    4
)});`;

fs.writeFileSync(output, content);

console.log(`Generated ${icons.length} icons.`);