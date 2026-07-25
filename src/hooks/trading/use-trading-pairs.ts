'use client'

import { useEffect } from 'react';

import { getPairs } from '../../services/trading/trading.service';

import { useTradingStore } from '../../store/trading.store';

import { useAuthStore } from '../../store/auth.store';
import { useLoaderStore } from '@/src/store/loader.store';

export const useTradingPairs = () => {

    const authStatus = useAuthStore( s => s.authStatus);

    const pairs = useTradingStore( s => s.pairs);

    const setPairs = useTradingStore( s => s.setPairs);

    const setLoadingPairs = useTradingStore( s => s.setLoadingPairs);

    const showLoader = useLoaderStore((state) => state.show)
    const hideLoader = useLoaderStore((state) => state.hide)

    useEffect(() => {

        if (authStatus !== 'authenticated') return;

        if (pairs.length > 0) return;

        const load = async () => {

            try {

                showLoader();
                setLoadingPairs(true);

                const response = await getPairs();

                setPairs(response);

            }
            finally {

                hideLoader();
                setLoadingPairs(false);

            }

        };

        load();

    }, [authStatus]);

};