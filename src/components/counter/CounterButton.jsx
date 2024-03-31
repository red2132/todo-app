import prototypes from 'prop-types'

export default function CounterButton({by, IncrementMethod, decrementMethod}) {

    // function incrementCounterFunction() {
    //     IncrementMethod(by)
    // }
    // function decrementCounterFunction() {
    //     decrementMethod(by)
    // }

    return (
        <div className="Counter">
            <div>
                <button
                    className="counterButton"
                    onClick={() => IncrementMethod(by)}
                >+{by}</button>
                <button
                    className="counterButton"
                    onClick={() => decrementMethod(by)}
                >-{by}</button>
            </div>
        </div>
    )
}

CounterButton.prototypes = {
    by : prototypes.number
}

CounterButton.defaultProps = {
    by: 1
}