export function MyTunes({
    //global settings
    steps, BPM, 
    // drums
    dPlay, dBank, dFast, dGain,
    bdStruct, hhStruct, sdStruct, rimStruct, ohStruct, ltStruct, mtStruct, htStruct, rdStruct, crStruct
}) {
    return `
    setcps(${BPM}/60/4)
    samples('https://raw.githubusercontent.com/Mittans/tidal-drum-machines/main/machines/tidal-drum-machines.json')    
    drums:
    when(${dPlay},
        stack(
            s("${hhStruct}"),
            s("${ohStruct}"),
            s("${sdStruct}"),
            s("${rimStruct}"),
            s("${ltStruct}"),
            s("${mtStruct}"),
            s("${htStruct}"),
            s("${rdStruct}"),
            s("${crStruct}"),
            s("${bdStruct}"),
        ),
        silence    
    ).bank("${dBank}").gain(${dGain}).fast(${dFast})`
}