import React, { useEffect, useRef, useState } from 'react'

export default function DoubleRangeSlider() {
    const step = 10
    const max = 1000
    const min = 0
    const minRange = 80
    const toSlider = useRef<HTMLInputElement>(null)
    const fromSlider = useRef<HTMLInputElement>(null)
    const [fromValue, setFromValue] = useState(200)
    const [toValue, setToValue] = useState(800)

    function SliderChangeHanlder(slider: "left" | "right") {
        let from = fromSlider.current?.valueAsNumber!
        let to = toSlider.current?.valueAsNumber!
        if (from >= max - minRange) {
            fromSlider.current!.valueAsNumber = max - minRange
        }
        if(to <= min + minRange){
            toSlider.current!.valueAsNumber = min + minRange
        }
        if (from >= (to - minRange)) {
            if (slider === "left") {
                toSlider.current!.valueAsNumber = from + minRange
            }
            else if (slider === "right") {
                fromSlider.current!.valueAsNumber = to - minRange
            }
        }
    }
    return (
        <div className='doubleRangeSlider'>
            <input ref={fromSlider} className='fromRange' type="range" name="range-1"
                onInput={e => SliderChangeHanlder("left")}
                id="r-1" min={min} max={max} step={step} defaultValue={200} />
            <input ref={toSlider} className='toRange' type="range" name="range-2"
                onInput={e => SliderChangeHanlder("right")}
                id="r-2" min={min} max={max} step={step} defaultValue={800} />
        </div>
    )
}
