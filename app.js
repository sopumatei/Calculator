const calculatorInput = document.getElementById("calculator-input")
calculatorInput.value = 0

const nrButtons = [
    
    {
        value: 1,
        reference: document.getElementById("one-button")
    },

    {
        value: 2,
        reference: document.getElementById("two-button")
    },

    {
        value: 3,
        reference: document.getElementById("three-button")
    },

    {
        value: 4,
        reference: document.getElementById("four-button")
    },

    {
        value: 5,
        reference: document.getElementById("five-button")
    },

    {
        value: 6,
        reference: document.getElementById("six-button")
    },

    {
        value: 7,
        reference: document.getElementById("seven-button")
    },

    {
        value: 8,
        reference: document.getElementById("eight-button")
    },

    {
        value: 9,
        reference: document.getElementById("nine-button")
    },

    {
        value: 0,
        reference: document.getElementById("zero-button")
    }
]

const clearBtn = document.getElementById("cancel-button")
const decimalBtn = document.getElementById("decimal-button")

const addBtn = document.getElementById("add-button")
const subtractBtn = document.getElementById("subtract-button")
const multiplyBtn = document.getElementById("multiply-button")
const divideBtn = document.getElementById("divide-button")
const equalBtn = document.getElementById("equal-button")

let calculatorValues = []
let inUse = true

function addValue(value, sign) {
    const correctValue = value.includes('.') ? parseFloat(value) : parseInt(value) 
    calculatorValues.push({correctValue, sign})
    // calculatorInput.value = ''
    inUse = true
    console.log(calculatorValues);
}

function resolve() {
    let answear = null
    for(let i = 0; i < calculatorValues.length; ++i) {
        if(i === 0) {
            answear = calculatorValues[i].correctValue
        }
        else {
            if(calculatorValues[i - 1].sign === '+') {
                answear += calculatorValues[i].correctValue
            }
            else if(calculatorValues[i - 1].sign === '-') {
                answear -= calculatorValues[i].correctValue
            }
            else if(calculatorValues[i - 1].sign === '*') {
                answear *= calculatorValues[i].correctValue
            }
            else if(calculatorValues[i - 1].sign === '/') {
                answear /= calculatorValues[i].correctValue
            }
        }
        if(calculatorValues[i].sign === '=') {
            return answear
        }
    }
}

nrButtons.map((btn) => {
    return(
        btn.reference.addEventListener('click', () => {
            if(calculatorInput.value.length < 16) {
                if(inUse) {
                    inUse = false
                    calculatorInput.value = ''
                }
                calculatorInput.value += btn.value
            }
        })
    )
})

decimalBtn.addEventListener('click', () => {
    if(calculatorInput.value.length > 0) {
        calculatorInput.value += '.'
    }
})

clearBtn.addEventListener('click', () => {
    if(calculatorInput.value === '') {
        calculatorInput.value = 0
        calculatorValues = []
    }
    else {
        calculatorInput.value = 0
        inUse = true
    }
})

addBtn.addEventListener('click', () => {
    if(inUse) {
        addValue('', '+')    
    }
    else{
        addValue(calculatorInput.value, '+')
    }
})

subtractBtn.addEventListener('click', () => {
    if(inUse) {
        addValue('', '-')    
    }
    else{
        addValue(calculatorInput.value, '-')
    }
})

multiplyBtn.addEventListener('click', () => {
    if(inUse) {
        addValue('', '*')    
    }
    else{
        addValue(calculatorInput.value, '*')
    }
})

divideBtn.addEventListener('click', () => {
    if(inUse) {
        addValue('', '/')    
    }
    else{
        addValue(calculatorInput.value, '/')
    }
})

equalBtn.addEventListener('click', () => {
    addValue(calculatorInput.value, '=')
    let answear = resolve()
    calculatorInput.value = answear
    calculatorValues = []
    inUse = false
})