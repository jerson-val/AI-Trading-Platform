'use client'

import { useMemo, useState } from 'react'

export function usePinnedTimeframes(
    allTimeframes: string[],
    onSelect: (tf: string) => void,
) {

    const DEFAULT_QUICK = useMemo(
        () => allTimeframes.slice(0, 5),
        [allTimeframes],
    )

    const [pinnedTimeframe, setPinnedTimeframe] =
        useState<string | null>(null)

    const quickTimeframes = useMemo(() => {

        return pinnedTimeframe
            ? [...DEFAULT_QUICK, pinnedTimeframe]
            : DEFAULT_QUICK

    }, [DEFAULT_QUICK, pinnedTimeframe])

    const extraTimeframes = useMemo(() => {

        return allTimeframes.filter(tf =>

            !DEFAULT_QUICK.includes(tf) &&
            tf !== pinnedTimeframe

        )

    }, [
        allTimeframes,
        DEFAULT_QUICK,
        pinnedTimeframe,
    ])

    const selectTimeframe = (tf: string) => {

        if (!DEFAULT_QUICK.includes(tf)) {

            if (tf !== pinnedTimeframe) {
                setPinnedTimeframe(tf)
            }

        }

        onSelect(tf)

    }

    return {
        quickTimeframes,
        extraTimeframes,
        selectTimeframe,
    }

}