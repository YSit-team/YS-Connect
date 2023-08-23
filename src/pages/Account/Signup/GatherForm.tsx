import React, { useState } from "react";
import AccountInput from "./AccountInput"; // 각 단계 컴포넌트를 임포트
import ProfileInput from "./ProfileInput"; // 다른 단계 컴포넌트를 임포트
import CheckStudent from "./CheckStudent";
import Term from "./이용약관";
import LastCheck from "./LastCheck";

const RegistrationForm = () => {
const [currentStep, setCurrentStep] = useState(1);
const [formData, setFormData] = useState({
    email: "",
    accountID:"",
    password: "",
    phoneNumber: "",
    firstName: "",
    lastName: "",
    studentID: ""
    // ...기타 폼 필드
});

const handleFormSubmit = () => {
    // formData를 서버에 제출할 수 있습니다
    // axios.post('/api/signup', formData);
    // 다음 단계로 이동하거나 회원가입 프로세스 완료
    setCurrentStep(currentStep + 1);
};

// 현재 단계 상태에 기반하여 적절한 단계를 렌더링합니다
const renderStep = () => {
    switch (currentStep) {
    case 1:
        return (
        <Term
        onNextStep={handleFormSubmit}
        />
        );
    case 2:
        return (
        <AccountInput
        formData={formData}
        setFormData={setFormData}
        onNextStep={handleFormSubmit}
        />
        );
    case 3:
        return (
        <ProfileInput
            formData={formData}
            setFormData={setFormData}
            onNextStep={handleFormSubmit}
        />
        );
    case 4:
        return (
        <CheckStudent
            formData={formData}
            onNextStep={handleFormSubmit}
        />
        );
    case 5:
        return (
            <LastCheck
            formData={formData}
            onNextStep={handleFormSubmit}
            />
        );
    // 다른 단계에 대한 추가 case를 추가합니다
    default:
        return null;
    }
};

return <div>{renderStep()}</div>;
};

export default RegistrationForm;
