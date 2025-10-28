export function MyTunes({
    //global settings
    steps, BPM, 
    // drums
    dBank, dFast, dSlow, dGain, dLinger,
    bdStruct, hhStruct, sdStruct
}) {
    return `
    setcps(${BPM}/60)

    samples('https://raw.githubusercontent.com/Mittans/tidal-drum-machines/main/machines/tidal-drum-machines.json')
    
    drums:
    stack(
        s("${bdStruct}").bank("${dBank}").gain(${dGain}).fast(${dFast}),

        s("${hhStruct}").bank("${dBank}").gain(${dGain}).fast(${dFast}),

        s("${sdStruct}").bank("${dBank}").gain(${dGain}).fast(${dFast})
    )`
}