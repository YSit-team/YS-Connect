import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

type ProfileInputProps = {
    formData: {
        email: string;
        accountID: string;
        password: string;
        phoneNumber: string;
        firstName: string,
        lastName: string,
        studentID: string,
        birthday: string
    };
    setFormData: React.Dispatch<
        React.SetStateAction<{
            email: string;
            accountID: string;
            password: string;
            phoneNumber: string;
            firstName: string,
            lastName: string,
            studentID: string,
            birthday: string
        }>
    >;
    onNextStep: () => void;
};

const ProfileInput: React.FC<ProfileInputProps> = ({ formData, setFormData, onNextStep }) => {
    const [numerr, setNumerr] = useState("");
    const [fnerr, setFnerr] = useState("");
    const [lnerr, setLnerr] = useState("");
    const [birtherr, setBirtherr] = useState("");
    const [error, setError] = useState('');
    let navigate = useNavigate();

    const handleNumBlur = () => {
        if (!formData.studentID) {
            setNumerr('학번을 입력해주세요.');
        } else if (formData.studentID.length < 5) {
            setNumerr('학번 형식이 올바르지 않습니다');
        } else {
            setNumerr('');
        }
    };
    
    const handleFnBlur = () => {
        if (!formData.firstName) {
            setFnerr('성을 입력해주세요.');
        }else {
            setFnerr('');
        }
    };
    
    const handleLnBlur = () => {
        if (!formData.lastName) {
            setLnerr('이름을 입력해주세요.');
        }else {
            setLnerr('');
        }
    };

    const handleBirthBlur = () => {
        if (!formData.birthday) {
            setBirtherr('생년월일을 입력해주세요.');
        }else {
            setBirtherr('');
        }
    };

    const handleFnChange = (event: any) => {
        setFormData((prevData) => ({
            ...prevData,
            firstName: event.target.value,
        }));
    };
    
    const handleLnChange = (event: any) => {
        setFormData((prevData) => ({
            ...prevData,
            lastName: event.target.value,
        }));
    };

    const handleNumChange = (event: any) => {
        setFormData((prevData) => ({
            ...prevData,
            studentID: event.target.value,
        }));
    };

    const handleBirthChange = (event: any) => {
        setFormData((prevData) => ({
            ...prevData,
            birthday: event.target.value,
        }));
    };

    const handleFormSubmit = () => {
        if (
            formData.firstName.length >= 1 &&
            formData.lastName.length >= 1 &&
            formData.studentID.length == 5
        ) {
            // 성공적인 제출 이후에 다음 페이지로 이동
            onNextStep();
        } else {
            alert('모든 필드를 올바르게 작성해주세요.');
        }
    };

    return (
        <_Wrap>
            <_FormWrap>
                <_Subtitle>이름과 학번을 입력해주세요</_Subtitle>

                    <_InputWrap>
                        <_Label>성</_Label>
                        {/* Use your Nameinput styled component here */}
                        <_Input
                            value={formData.firstName}
                            onChange={handleFnChange}
                            onBlur={handleFnBlur}
                            style={{ borderColor: fnerr ? "#ff0000" : "#000000" }}
                            type="text"
                            placeholder="성을 입력해 주세요."
                            minLength={1}
                        />
                        {fnerr && <ErrorText>{fnerr}</ErrorText>}
                    </_InputWrap>
                    <_InputWrap>
                        <_Label>이름</_Label>
                        {/* Use your Nameinput styled component here */}
                        <_Input
                            value={formData.lastName}
                            onChange={handleLnChange}
                            onBlur={handleLnBlur}
                            style={{ borderColor: lnerr ? "#ff0000" : "#000000" }}
                            type="text"
                            placeholder="이름을 입력해 주세요."
                            minLength={1}
                        />
                        {lnerr && <ErrorText>{lnerr}</ErrorText>}
                    </_InputWrap>

                    <_InputWrap>
                    <_Label>학번</_Label>
                    <_Input
                        value={formData.studentID}
                        onChange={handleNumChange}
                        onBlur={handleNumBlur}
                        style={{ borderColor: numerr ? "#ff0000" : "#000000" }}
                        type="text"
                        placeholder="학번을 입력해주세요(ex.30216)"
                        minLength={5}
                        maxLength={5}
                    />
                    {numerr && <ErrorText>{numerr}</ErrorText>}
                    </_InputWrap>

                    <_InputWrap>
                    <_Label>생년월일</_Label>
                    <_Input
                        value={formData.birthday}
                        onChange={handleBirthChange}
                        onBlur={handleBirthBlur}
                        style={{ borderColor: birtherr ? "#ff0000" : "#000000" }}
                        type="text"
                        placeholder="생년월일을 입력해주세요(ex.20050318)"
                        minLength={8}
                        maxLength={8}
                    />
                    {birtherr && <ErrorText>{birtherr}</ErrorText>}
                    </_InputWrap>
                
                <_SignUpBtnWrap>
                    <_SignUpBtn type="submit" onClick={handleFormSubmit}>
                        다음으로
                    </_SignUpBtn>
                </_SignUpBtnWrap>
            </_FormWrap>
        </_Wrap>
    );
};

export default ProfileInput;

const _Wrap = styled.div`
background: linear-gradient(to right bottom, #9786ff, #2805fc);
width: 100vw;
height: 100vh;
display: flex;
justify-content: center;
align-items: center;

@media (max-width: 600px) {
    background: none;
}
`;

const _FormWrap = styled.div`
display: flex;
flex-direction: column;

background-color: #ffffff;
padding: 20px;
width : 500px;

box-shadow: 8px 8px 15px 5px rgba(0, 0, 0, 0.25);
border-radius: 15px;

@media (max-width: 600px) {
    box-shadow: none;
    width: 100vw;
}
`;

const _Subtitle = styled.div`
    font-family: 'Noto Sans KR';
    font-size: 25px;
    text-align: center;
    margin: 0;
    margin-top: 20px;
    margin-bottom: 20px;
    font-weight: bold;
`

const _Label = styled.label`
font-size: 13px;

margin-left: 5px;
font-weight: bold;
`;

const _Input = styled.input`
width: 400px;
height: 50px;
margin-top: 3px;
font-weight: bold;
border: 1px solid;
:focus {
    border: 1.3px solid;
}
border-radius: 12px;
padding-left: 10px;

border-color: gray;
outline: none;

@media (max-width: 600px) {
    width: 85vw;
}
`;

const _InputWrap = styled.div`
margin: 0 auto;
margin-top: 10px;
display: flex;
flex-direction: column;
`;

const _SignUpBtn = styled.button`
width: 412px;
height: 60px;
font-size: 20px;

background: #1e00d3;
border: 0px solid #e5e5e5;
border-radius: 12px;
font-weight: bold;

color: white;
cursor: pointer;

@media (max-width: 600px) {
    width: 90vw;
    margin-bottom: 10px;
}
`;

const _SignUpBtnWrap = styled.div`
margin-top: 20px;

display: flex;
justify-content: center;
`;

const Namewrap = styled.div`
display: flex;
width: 440px;
margin: 0 auto;

@media (max-width: 600px) {
    width: auto;
    flex-direction: column;
}
`

const Nameinput = styled.input`
width: 180px;
height: 50px;
margin-top: 3px;
font-weight: bold;
border: 1px solid #e5e5e5;
:focus {
    border: 1.8px solid blue;
}
border-radius: 12px;
padding-left: 10px;

border-color: gray;
outline: none;

@media (max-width: 600px) {
    width: 85vw;
}
`

const ErrorText = styled.p`
    color: red;
    font-size: 14px;
    margin-top: 5px;
    margin-bottom: 0px;
`;