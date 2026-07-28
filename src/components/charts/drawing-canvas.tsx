'use client'

import { forwardRef } from 'react'

const DrawingCanvas = forwardRef<
    HTMLCanvasElement,
    React.CanvasHTMLAttributes<HTMLCanvasElement>
>((props, ref) => {

    return (

        <canvas
            ref={ref}
            {...props}
            className="
                absolute
                inset-0
                z-10
            "
        />

    )

})

DrawingCanvas.displayName = 'DrawingCanvas'

export default DrawingCanvas