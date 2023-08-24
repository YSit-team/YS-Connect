import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axiosInstance from "../../../api/API_Server";

type AccountInputProps = {
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


const AccountInput: React.FC<AccountInputProps> = ({ formData, setFormData, onNextStep }) => {
    const [checkpw, setCheckpw] = useState("");
    const [isInputVisible, setIsInputVisible] = useState(true);
    const [emailerr, setEmailerr] = useState('');
    const [accountiderr, setAccountIDerr] = useState('');
    const [pwerr, setPwerr] = useState('');
    const [checkpwerr, setCheckpwerr] = useState('');
    const [telerr, setTelerr] = useState('');

    let navigate = useNavigate();

    const handleEmBlur = (event: any) => {
        const email = event.target.value;

        try {
            setEmailerr("중복검사중입니다.."); // 중복검사 중임을 표시
            setTimeout(() => {
                axiosInstance.post("/register", {
                    email
                }).then((res) => {
                    if (res.status === 200) {
                        setEmailerr('');
                    } else {
                        setEmailerr('예외 발생');
                    }
                }).catch((error) => {
                    console.log(error);

                    if (error.response) {
                        const res = error.response;
                        if (res.state === 400) {
                            setEmailerr(res.data.errorDescription);
                        } else {
                            setEmailerr(res.data.errorDescription);
                        }
                    } else {
                        alert('서버 통신 실패');
                    }
                });
            }, 1000)
        } catch (error) {
            console.log(error);
        }
    };

    const handleIDBlur = (event:any) => {
        const accountID = event.target.value;

        try {
            setAccountIDerr("중복검사중입니다.."); // 중복검사 중임을 표시
            setTimeout(() => {
                axiosInstance.post("/register", {
                    accountID
                }).then((res) => {
                    if (res.status === 200) {
                        setAccountIDerr('');
                    } else {
                        setAccountIDerr('예외 발생');
                    }
                }).catch((error) => {
                    console.log(error);

                    if (error.response) {
                        const res = error.response;
                        if (res.state === 400) {
                            setAccountIDerr(res.data.errorDescription);
                        } else {
                            setAccountIDerr(res.data.errorDescription);
                        }
                    } else {
                        alert('서버 통신 실패');
                    }
                });
            }, 1000)
        } catch (error) {
            console.log(error);
        }
    }

    const handlePwBlur = () => {
        if (!formData.password) {
            setPwerr('비밀번호를 입력해주세요.');
        } else if (formData.password.length < 8 || !/\d/.test(formData.password) || !/[!@#$%^&*]/.test(formData.password)) {
            setPwerr('최소 8자 이상, 숫자와 특수문자를 포함해야 합니다.');
        } else {
            setPwerr('');
        }
    };

    const handleTelBlur = () => {
        if (!formData.phoneNumber) {
            setTelerr('전화번호를 입력해주세요.');
        } else if (formData.phoneNumber.length < 13) {
            setTelerr('전화번호 형식이 잘못되었습니다.')
        } else {
            setTelerr('');
        }
    };

    const handleCheckPwBlur = () => {
        if (!checkpw) {
            setCheckpwerr('비밀번호를 다시 입력해주세요.');
        } else if (formData.password !== checkpw) {
            setCheckpwerr('비밀번호가 일치하지 않습니다.');
        } else {
            setCheckpwerr('');
        }
    };

    const handleFormSubmit = () => {
        if (
            emailerr.length <= 1  &&
            accountiderr.length <= 1 &&
            pwerr.length <= 1 &&
            formData.password === checkpw &&
            formData.phoneNumber.length >= 11
        ) {
            // 성공적인 제출 이후에 다음 페이지로 이동
            onNextStep();
        } else {
            alert('모든 필드를 올바르게 작성해주세요.');
        }
    };

    const handleCheckPw = (event: any) => {
        setCheckpw(event.target.value);
    };

    const handleEmChange = (event: any) => {
        setFormData((prevData) => ({
            ...prevData,
            email: event.target.value,
        }));
    };

    const handleIDChange = (event: any) => {
        setFormData((prevData) => ({
            ...prevData,
            accountID: event.target.value,
        }));
    };

    const handlePwChange = (event: any) => {
        setFormData((prevData) => ({
            ...prevData,
            password: event.target.value,
        }));
    };

    const handleTelChange = (event: any) => {
        // Remove any existing dashes from the input value
        const cleanedValue = event.target.value.replace(/-/g, '');

        // Add dashes at appropriate positions
        let formattedValue = '';
        for (let i = 0; i < cleanedValue.length; i++) {
            if (i === 3 || i === 7) {
                formattedValue += '-';
            }
            formattedValue += cleanedValue[i];
        }

        setFormData((prevData) => ({
            ...prevData,
            phoneNumber: formattedValue,
        }));
    };

    const [passwordType, setPasswordType] = useState({
        type: 'password',
        visible: false
    })

    const handlePasswordType = (e: any) => {
        setPasswordType(() => {
            if (!passwordType.visible) {
                return { type: 'text', visible: true };
            }
            return { type: 'password', visible: false };
        })
    }

    return (
        <_Wrap >
            <_FormWrap isInputVisible={isInputVisible}>
                <_Subtitle>양식에 맞게 작성해주세요</_Subtitle>

                <_InputWrap>
                    <_Label>이메일</_Label>
                    <_Input
                        value={formData.email}
                        onChange={handleEmChange}
                        onBlur={handleEmBlur}
                        style={{ borderColor: emailerr ? "#ff0000" : "#000000" }}
                        type="text"
                        placeholder="이메일을 입력해주세요."
                    />
                    {emailerr && <ErrorText style={{ marginTop: "-5px" }}>{emailerr}</ErrorText>}
                </_InputWrap>

                <_InputWrap>
                    <_Label>아이디</_Label>
                    <_Input
                        value={formData.accountID}
                        onChange={handleIDChange}
                        onBlur={handleIDBlur}
                        style={{ borderColor: accountiderr ? "#ff0000" : "#000000" }}
                        type="text"
                        placeholder="아이디를 입력해주세요"
                    />
                    {accountiderr && <ErrorText style={{ marginTop: "-5px" }}>{accountiderr}</ErrorText>}
                </_InputWrap>

                <_InputWrap>
                    <_Label>비밀번호</_Label>
                    <_Input
                        value={formData.password}
                        onChange={handlePwChange}
                        type={passwordType.type}
                        placeholder="비밀번호 입력 (최소 8자)"
                        onBlur={handlePwBlur}
                        style={{ borderColor: pwerr ? "#ff0000" : "#000000" }}
                        minLength={8}
                    />
                    <_Logowrap onClick={handlePasswordType}>
                        {passwordType.visible ? <_Logo src='/icon/eye1.svg'></_Logo> : <_Logo src='/icon/eye2.svg'></_Logo>}
                    </_Logowrap>
                    {pwerr && <ErrorText>{pwerr}</ErrorText>}
                </_InputWrap>

                <_InputWrap>
                    <_Label>비밀번호 확인</_Label>
                    <_Input
                        value={checkpw}
                        onChange={handleCheckPw}
                        onBlur={handleCheckPwBlur}
                        type="password"
                        placeholder="비밀번호를 다시 입력하세요."
                        style={{ borderColor: checkpwerr ? "#ff0000" : "#000000" }}
                        minLength={8}
                    />
                    {checkpwerr && <ErrorText>{checkpwerr}</ErrorText>}
                </_InputWrap>
                <_InputWrap>
                    <_Label>전화번호</_Label>
                    <_Input
                        value={formData.phoneNumber}
                        onChange={handleTelChange}
                        style={{ borderColor: telerr ? "#ff0000" : "#000000" }}
                        type="text"
                        id="phoneNum"
                        minLength={11}
                        maxLength={13}
                        placeholder="'-'없이 입력하세요."
                        onBlur={handleTelBlur}
                    />
                    {telerr && <ErrorText>{telerr}</ErrorText>}
                </_InputWrap>
                <_SignUpBtnWrap>
                    <_SignUpBtn type="button" onClick={handleFormSubmit}>
                        다음으로
                    </_SignUpBtn>
                </_SignUpBtnWrap>
            </_FormWrap>
        </_Wrap>
    );
};

export default AccountInput;

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

interface ContainerProps {
    isInputVisible: any;
}

const _FormWrap = styled.div<ContainerProps>`
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
    margin-bottom: 10px;
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

const _Logo = styled.img`
    width: 20px;
    height: 20px;
`;

const _Logowrap = styled.div`
    display: flex;
    justify-content: end;
    position: relative;
    z-index: 1;
    bottom: 35px;
    margin-right: 10px;
    margin-left: 95%;
    height: 0;

    @media (max-width: 600px) {
    bottom: 38px;
    }
`;


const ErrorText = styled.p`
    color: red;
    font-size: 14px;
    margin-top: 5px;
    margin-bottom: 0px;
`;