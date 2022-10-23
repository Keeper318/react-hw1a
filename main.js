const maxNumberLength = 20
const error = "Error"
const overflow = "Overflow"
const output = document.querySelector(".output")
const operations = {
    "plus": (a, b) => a + b,
    "minus": (a, b) => a - b,
    "multiply": (a, b) => a * b,
    "divide": (a, b) => a / b
}
const resultInto = {
    "plus": 1,
    "minus": 1,
    "multiply": 2,
    "divide": 1
}

let operation
let clearOutput = false

function read() {
    return output.textContent
}

function write(str) {
    output.textContent = str
}

function append(str) {
    output.textContent += str
}

function toString(number) {
    let str = number.toString()
    const expIndex = str.indexOf("e")
    if (str === "NaN" || str === "Infinity") {
        str = error
    } else if (expIndex !== -1) {
        str = number.toFixed(expIndex + 5)
    }
    return str.length <= maxNumberLength ? str : overflow
}

document.querySelector(".keys").addEventListener("click", e => {
    if (!e.target.matches("button")) {
        return
    }
    const action = e.target.dataset.action

    if (action === "clear") {
        clearOutput = false
        operation = undefined
        write("0")
        return
    }
    if (read() === error || read() === overflow) {
        return
    }

    if (!action) {
        if (clearOutput || read() === "0") {
            write("")
            clearOutput = false
        }
        if (read().length < maxNumberLength) {
            append(e.target.textContent)
        }
    } else if (action === "decimal") {
        if (clearOutput) {
            write("0")
            clearOutput = false
        }
        if (read().length < maxNumberLength && !read().includes(".")) {
            append(".")
        }
    } else if (action === "sign") {
        if (read().length < maxNumberLength && read() !== "0" && read()[0] !== '-') {
            write("-" + read())
        } else if (read()[0] === '-') {
            write(read().slice(1))
        }
    } else if (action === "sqrt") {
        write(toString(Math.sqrt(Number.parseFloat(read()))))
        clearOutput = true
    } else if (action === "calculate") {
        if (operation !== undefined) {
            if (operation.length < 3) {
                operation.push(Number.parseFloat(read()))
            }
            const operationName = operation[0]
            const result = operations[operationName](operation[1], operation[2])
            write(toString(result))
            operation[resultInto[operationName]] = result
        }
        clearOutput = true
    } else {
        operation = [action, Number.parseFloat(read())]
        clearOutput = true
    }
})
