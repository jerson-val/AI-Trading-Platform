import { AVAILABLE_CRYPTO_ICONS } from "@/src/config/availableCryptoIcons";

export const getCoinIcon = (symbol: string) => {
    const coin = symbol
        .replace("USDT", "")
        .toLowerCase();

    if (AVAILABLE_CRYPTO_ICONS.has(coin)) {
        return `${coin}.svg`;
    }

    return "default.svg";
}