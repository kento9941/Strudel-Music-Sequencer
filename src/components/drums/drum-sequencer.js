
import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";
import { useState, useEffect, useRef } from "react";
import Hihat from "./hihat";
import OpenHihat from "./open-hihat";
import SnareDrum from "./snare-drum";
import RimShot from "./rim-shot";
import LowTom from "./low-tom";
import MiddleTom from "./middle-tom";
import HighTom from "./high-tom";
import BassDrum from "./bass-drum";
import RideCymbal from "./ride-cymbal";
import CrashCymbal from "./crash-cymbal";

export default function DrumSequencer({
    // bass drum
    bdStruct, setBdStruct, 
    // hihat
    hhStruct, setHhStruct,
    // snare drum
    sdStruct, setSdStruct,
    // rim shot
    rimStruct, setRimStruct,
    // open hihat
    ohStruct, setOhStruct,
    // low tom
    ltStruct, setLtStruct,
    // middle tom
    mtStruct, setMtStruct,
    // high tom
    htStruct, setHtStruct,
    // ride cymbal
    rdStruct, setRdStruct,
    // crash cymbal
    crStruct, setCrStruct,
    // settings
    steps, 
    dPlay, setDPlay, 
    dBank, setDBank,
    dFast, setDFast,
    dGain, setDGain}) {

    return (
        <div className="row justify-content-start align-content-start">
            <div className="col-4">
                <div>Hihat</div>
                <div>Open Hihat</div>
                <div>Snare Drum</div>
                <div>Rim Shot</div>
                <div>Low Tom</div>
                <div>Middle Tom</div>
                <div>High Tom</div>
                <div>Ride Cymbal</div>
                <div>Crash Cymbal</div>
                <div>Bass Drum</div>
            </div>
            <div className="col-8">
                <div className="mt-3">
                    <Hihat hhStruct={hhStruct} setHhStruct={setHhStruct} steps={steps} />
                </div>
                <div className="mt-3">
                    <OpenHihat ohStruct={ohStruct} setOhStruct={setOhStruct} steps={steps} />
                </div>
                <div className="mt-3">
                    <SnareDrum sdStruct={sdStruct} setSdStruct={setSdStruct} steps={steps} />
                </div>
                <div className="mt-3">
                    <RimShot rimStruct={rimStruct} setRimStruct={setRimStruct} steps={steps} />
                </div>
                <div className="mt-3">
                    <LowTom ltStruct={ltStruct} setLtStruct={setLtStruct} steps={steps} />
                </div>
                <div className="mt-3">
                    <MiddleTom mtStruct={mtStruct} setMtStruct={setMtStruct} steps={steps} />
                </div>
                <div className="mt-3">
                    <HighTom htStruct={htStruct} setHtStruct={setHtStruct} steps={steps} />
                </div>
                <div className="mt-3">
                    <RideCymbal rdStruct={rdStruct} setRdStruct={setRdStruct} steps={steps} />
                </div>
                <div className="mt-3">
                    <CrashCymbal crStruct={crStruct} setCrStruct={setCrStruct} steps={steps} />
                </div>
                <div className="mt-3">
                    <BassDrum bdStruct={bdStruct} setBdStruct={setBdStruct} steps={steps} />
                </div>
            </div>
        </div>
    )
}