import React from "react";
import FirstStep from "./StepContents/FirstStep";
import SecondStep from "./StepContents/SecondStep";
import ThirdStep from "./StepContents/ThirdStep";

export const getSteps = () => {
    return ['Change avatar and username', 'Change birth year and gender ', 'Change password'];
};

export const getStepContent = (step,sendData, passValidator, handleChangePassword) => {
    switch (step) {
        case 0:
            return <FirstStep sendData={sendData} />;
        case 1:
            return <SecondStep sendData={sendData}/>;
        case 2:
            return <ThirdStep sendData={sendData} passValidator={passValidator} handleChangePassword={handleChangePassword} />;
        default:
            return 'Unknown step';
    }
};