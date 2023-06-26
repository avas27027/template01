import React from "react"

export default function FilterCheckbox(props: {
    getValues: (title: string) => string[],
    setValues(filterName: string, filterType: "checkbox" | "doubleRange" | "subcategories", vals: string[]): void,
    checkboxFilters: Array<{ title: string, filterName: string, boxes: Array<string> }>,
}) {
    const getValues = props.getValues, setValues = props.setValues
    function checkboxClick(title: string, word: string) {
        let l = getValues(title)
        if (l.includes(word)) {
            let list = l.filter(x => x != word)
            setValues(title, "checkbox", list)
        }
        else setValues(title, "checkbox", [...l, word])
    }
    return (
        <div className='leftFilterBar-container'>{props.checkboxFilters?.map((x, index) => {
            return (
                <div key={"filter-" + index} className="leftFilterBar-element">
                    <h4>{x.title}</h4>
                    <div className='leftFilterBar-items'>
                        {x.boxes.map((y, i) =>
                            <div className='leftFilterBar-items-box' key={i}>
                                <input id={"rcol-" + x.title + i}
                                    type='checkbox' name={x.title} value={y} key={"rcol-" + i}
                                    onClick={e => checkboxClick(x.filterName, e.currentTarget.value)}
                                />
                                <p><label htmlFor={"rcol-" + x.title + i}>{y}</label></p>
                            </div>
                        )}
                    </div>
                </div>)
        })}</div>
    )
}