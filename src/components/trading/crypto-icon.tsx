'use client';

import Image from 'next/image';
import { useState } from 'react';
import { getCoinIcon } from '@/src/utils/icons/get-coin-icon';

interface Props {
    symbol: string;
    size?: number;
}

export default function CryptoIcon({
    symbol,
    size = 20,
}: Props) {

    const [error, setError] = useState(false);

    const coin = getCoinIcon(symbol);

    return (
        <Image
            src={
                error
                    ? "/crypto-icons/default.svg"
                    : `/crypto-icons/${coin}`
            }
            alt={symbol}
            width={size}
            height={size}
            onError={() => setError(true)}
        />
    );
}