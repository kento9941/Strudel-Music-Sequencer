
import { useState, useEffect, useRef } from "react";
import BankSelector from "./bank-selector";
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

export default function DrumSequencer() {
    return (
        <div className="">
            <BankSelector />
            <div className="mt-4">
                <Hihat />
            </div>
            <div className="mt-4">
                <OpenHihat />
            </div>
            <div className="mt-4">
                <SnareDrum />
            </div>
            <div className="mt-4">
                <RimShot />
            </div>
            <div className="mt-4">
                <LowTom />
            </div>
            <div className="mt-4">
                <MiddleTom />
            </div>
            <div className="mt-4">
                <HighTom />
            </div>
            <div className="mt-4">
                <RideCymbal />
            </div>
            <div className="mt-4">
                <CrashCymbal />
            </div>
            <div className="mt-4">
                <BassDrum />
            </div>
        </div>
    )
}