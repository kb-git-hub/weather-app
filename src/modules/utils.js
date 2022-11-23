function generateQueryConstructor(query) {
    for (const key in query) {
        this[key] = query[key]
    }
}

function generateSpanIcon(name) {
    const span = document.createElement('span')
    span.classList.add('material-symbols-outlined')
    span.textContent = name
    return span
}

export { generateQueryConstructor, generateSpanIcon }
