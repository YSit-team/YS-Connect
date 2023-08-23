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
        studentID: string
    };
    onNextStep: () => void;
};

const LastCheck: React.FC<ProfileInputProps> = ({ formData, onNextStep }) => {
    let navigate = useNavigate();

    return (
        <_Wrap>
            <_FormWrap>
                <_Subtitle>마지막으로 이 데이터가 맞는지 확인해주세요.</_Subtitle>

                    <_InputWrap>
                        <_Label>이메일</_Label>
                        <_Input
                        value={formData.email}
                        type="text"
                        readOnly
                        />
                    </_InputWrap>

                    <_InputWrap>
                        <_Label>아이디</_Label>
                        <_Input
                        value={formData.accountID}
                        type="text"
                        readOnly
                        />
                    </_InputWrap>

                    <_InputWrap>
                        <_Label>비밀번호</_Label>
                        <_Input
                        value={formData.password}
                        type="text"
                        readOnly
                        />
                    </_InputWrap>
                    <_InputWrap>
                        <_Label>전화번호</_Label>
                        <_Input
                        value={formData.phoneNumber}
                        type="text"
                        readOnly
                        />
                    </_InputWrap>

                    <_InputWrap>
                        <_Label>성</_Label>
                        {/* Use your Nameinput styled component here */}
                        <_Input
                            value={formData.firstName}
                            type="text"
                            readOnly
                        />
                    </_InputWrap>
                    <_InputWrap>
                        <_Label>이름</_Label>
                        {/* Use your Nameinput styled component here */}
                        <_Input
                            value={formData.lastName}
                            type="text"
                            readOnly
                        />
                    </_InputWrap>

                    <_InputWrap>
                    <_Label>학번</_Label>
                    <_Input
                        value={formData.phoneNumber}
                        type="text"
                        readOnly
                    />
                </_InputWrap>
                
                <_SignUpBtnWrap>
                    <_SignUpBtn type="submit">
                        가입하기
                    </_SignUpBtn>
                </_SignUpBtnWrap>
            </_FormWrap>
        </_Wrap>
    );
};

export default LastCheck;

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