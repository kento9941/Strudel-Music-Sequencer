
import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";
import { useState, useEffect, useRef } from "react";
import BassDrum from "./bass-drum";
import Hihat from "./hihat";

export default function DrumSequencer({
    // bass drum
    bdStruct, setBdStruct, 
    // hihat
    hhStruct, setHhStruct,
    // global settings
    steps, 
    // drum settings
    dBank, setDBank, dFast, setDFast, dSlow, setDSlow, dGain, setDGain, dLinger, setDLinger}) {

    return (
        <>
            <div className="mt-3">
                <BassDrum bdStruct={bdStruct} setBdStruct={setBdStruct} steps={steps} />
            </div>
            <div className="mt-3">
                <Hihat hhStruct={hhStruct} setHhStruct={setHhStruct} steps={steps} />
            </div>
        </>
    )
}