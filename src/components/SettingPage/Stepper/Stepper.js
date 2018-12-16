import React from "react";
import FirstStep from "./StepContents/FirstStep";
import SecondStep from "./StepContents/SecondStep";
import ThirdStep from "./StepContents/ThirdStep";

export function getSteps() {
    return ['Change avatar and username', 'Change birth year and gender ', 'Change password'];
}

export function getStepContent(step) {
    switch (step) {
        case 0:
            return <FirstStep />;
        case 1:
            return <SecondStep/>;
        case 2:
            return <ThirdStep/>;
        default:
            return 'Unknown step';
    }
}