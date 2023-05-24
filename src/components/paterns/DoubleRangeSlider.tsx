import React, { useEffect, useRef, useState } from 'react'
//React.Dispatch<React.SetStateAction<{ from: number, to: number }>>
export default function DoubleRangeSlider(props: {
    min: number, step: number, max: number,
    dispach: (response: { from: number, to: number }) => any
}) {
    const step = props.step, max = props.max, min = props.min, dispach = props.dispach

    const fromLabel = useRef<HTMLLabelElement>(null), toLabel = useRef<HTMLLabelElement>(null)
    const fromSlider = useRef<HTMLInputElement>(null), toSlider = useRef<HTMLInputElement>(null)
    const [fromValue, setFromValue] = useState(min)
    const [toValue, setToValue] = useState(max)

    function SliderChangeHanlder(slider: "left" | "right") {
        let from = fromSlider.current?.valueAsNumber!
        let to = toSlider.current?.valueAsNumber!
        if (from >= max - step) {
            fromSlider.current!.valueAsNumber = max - step * 2 //Se pone *2 por que si no se bugea
            setFromValue(max - step)
            setToValue(to)

        }
        else if (to <= min + step) {
            toSlider.current!.valueAsNumber = min + step * 2
            setToValue(min + step)
            setFromValue(from)

        }
        else if (from >= (to - step)) {
            if (slider === "left") {
                toSlider.current!.valueAsNumber = from + step * 2
            }
            else if (slider === "right") {
                fromSlider.current!.valueAsNumber = to - step * 2
            }
            setFromValue(from)
            setToValue(to)
        }
        else {
            setFromValue(from)
            setToValue(to)
        }

    }
    return (
        <div className='doubleRangeSlider'>
            <label className='fromLabel' htmlFor="range-1" ref={fromLabel}>{fromValue}</label>
            <input ref={fromSlider} className='fromRange' type="range" name="range-1"
                onInput={e => SliderChangeHanlder("left")} onMouseUp={() => dispach({from:fromValue, to:toValue})}
                id="r-1" min={min} max={max} step={step} defaultValue={min} />
            <input ref={toSlider} className='toRange' type="range" name="range-2"
                onInput={e => SliderChangeHanlder("right")} onMouseUp={() => dispach({from:fromValue, to:toValue})}
                id="r-2" min={min} max={max} step={step} defaultValue={max} />
            <label className='toLabel' htmlFor="range-2" ref={toLabel}>{toValue}</label>
        </div>
    )
}
