import { useState } from 'react'
import './Counter.css'
import CounterButton from './CounterButton'

export default function Counter() {
    const [count, setCount] = useState(0)

    function incrementCounterParentFuntion(by) {
        setCount(count+by)
    }
    function decrementCounterParentFuntion(by) {
        setCount(count-by)
    }
    function ResetCounter() {
        setCount(0)
    }
    return (
        <div>
            <span className="totalCount">{count}</span>
            <CounterButton IncrementMethod={incrementCounterParentFuntion} decrementMethod={decrementCounterParentFuntion}/>
            <CounterButton by={3} IncrementMethod={incrementCounterParentFuntion} decrementMethod={decrementCounterParentFuntion}/>
            <CounterButton by={5} IncrementMethod={incrementCounterParentFuntion} decrementMethod={decrementCounterParentFuntion}/>
            <button
                    className="resetButton"
                    onClick={ResetCounter}
                >reset</button>
        </div>
    )
}