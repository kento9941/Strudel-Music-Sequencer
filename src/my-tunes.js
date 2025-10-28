export function MyTunes({
    //global settings
    steps, BPM, 
    // drums
    dBank, dFast, dSlow, dGain, dLinger,
    bdStruct, hhStruct, sdStruct, rimStruct, ohStruct, ltStruct, mtStruct, htStruct, rdStruct, crStruct
}) {
    return `
    setcps(${BPM}/60/4)
    samples('https://raw.githubusercontent.com/Mittans/tidal-drum-machines/main/machines/tidal-drum-machines.json')    
    drums:
    stack(
        s("${hhStruct}").bank("${dBank}").gain(${dGain}).fast(${dFast}),
        s("${ohStruct}").bank("${dBank}").gain(${dGain}).fast(${dFast}),
        s("${sdStruct}").bank("${dBank}").gain(${dGain}).fast(${dFast}),
        s("${rimStruct}").bank("${dBank}").gain(${dGain}).fast(${dFast}),
        s("${ltStruct}").bank("${dBank}").gain(${dGain}).fast(${dFast}),
        s("${mtStruct}").bank("${dBank}").gain(${dGain}).fast(${dFast}),
        s("${htStruct}").bank("${dBank}").gain(${dGain}).fast(${dFast}),
        s("${rdStruct}").bank("${dBank}").gain(${dGain}).fast(${dFast}),
        s("${crStruct}").bank("${dBank}").gain(${dGain}).fast(${dFast}),
        s("${bdStruct}").bank("${dBank}").gain(${dGain}).fast(${dFast}),
    )`
}