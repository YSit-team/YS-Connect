import React, { useState, ChangeEvent } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

type TermsProps = {
    onNextStep: () => void;
};

const Term: React.FC<TermsProps> = ({ onNextStep }) => {
    const [isAgreed, setIsAgreed] = useState(false);
    let navigate = useNavigate();

    const handleAgreeChange = (event:any) => {
        setIsAgreed(event.target.checked);
    };

    return (
        <_Wrap>
        <_FormWrap>
            <_Subtitle>이용약관을 확인해주세요</_Subtitle>
            <_TermsBox>
                <_TermsText>{termsAndConditions}</_TermsText>
            </_TermsBox>
            <_AgreeCheckbox>
                <input
                    type="checkbox"
                    id="agreeCheckbox"
                    checked={isAgreed}
                    onChange={handleAgreeChange}
                />
                <label htmlFor="agreeCheckbox">위 이용약관에 동의합니다</label>
            </_AgreeCheckbox>
            <_SignUpBtnWrap>
                <_SignUpBtn
                    type="submit"
                    onClick={() => {
                        if (isAgreed) {
                            onNextStep();
                        } else {
                            alert('이용약관에 동의해주세요');
                        }
                    }}
                >
                    다음으로
                </_SignUpBtn>
            </_SignUpBtnWrap>
        </_FormWrap>
    </_Wrap>
    );
};

const termsAndConditions = `
회원가입 동의 및 개인정보 처리방침
안녕하세요, "영실커넥트" 앱을 이용해 주셔서 감사합니다. 회원가입을 시작하기 전에 아래의 내용을 숙지하고 동의해주시기 바랍니다.
1. 개인정보 수집 및 이용 동의
본 앱은 회원가입 및 서비스 이용을 위해 다음과 같은 개인정보를 수집하고 이용합니다:
- 이메일 주소
- 사용자명
- 전화번호
- 학번
- 학생증 (확인 후 데이터 파기)
- 이용 기록 (서비스 이용 내역)
- 기기 정보 (기기 종류, 운영 체제, IP 주소 등)
- 게시판 정보 (게시물 및 댓글 내용)
이러한 개인정보는 회원 식별, 서비스 제공, 품질 향상, 사용자 지원 등의 목적으로 사용됩니다.
2. 개인정보 제3자 제공 동의
앱은 사용자의 개인정보를 본래 수집 목적 범위 내에서 사용하며, 사용자의 사전 동의 없이는 제3자에게 제공하지 않습니다. 다만, 관련 법령에 따른 정부 기관이나 수사 기관의 요청이 있는 경우 등의 예외 상황이 있을 수 있습니다.
3. 개인정보 보관 및 보호
개인정보는 회원이 탈퇴하기 전까지 보유되며, 관련 법규 및 정책을 준수하여 적절한 보안 조치가 취해집니다.
4. 개인정보 열람, 수정 및 삭제 권리
회원님은 언제든지 자신의 개인정보를 열람, 수정, 삭제할 수 있습니다. 개인정보 열람 및 수정은 앱 내 "계정 설정"을 통해 가능하며, 삭제를 원하실 경우 고객센터로 문의하시기 바랍니다.
5. 게시판 이용 및 처리방침 동의
앱의 게시판 이용에 대한 내용을 숙지하시고 동의해주시기 바랍니다. 게시물 작성 및 관리에 대한 내용을 확인하실 수 있습니다.
위 내용을 확인하고 동의해주시면 "체크표시" 버튼을 눌러 회원가입을 진행해주시기 바랍니다.
동의하지 않으실 경우 회원가입이 제한될 수 있습니다.
더 자세한 내용은 [개인정보 처리방침](https://www.zena.co.kr/jys/privacy)에서 확인하실 수 있습니다.
`;

export default Term;

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
/* height: (job === "student" ? '690px' : '610px');

if (job === student) {
    height: 690px;
} else {
    height: 610px;
} */

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
margin-top: 3px;
margin-bottom: 15px;
font-weight: bold;
border-radius: 12px;
padding-left: 10px;
width: 200px;
border-color: gray;
outline: none;

@media (max-width: 600px) {
    width: 85vw;
}
`;

const _InputWrap = styled.div`
margin: 0 auto;
margin-top: 10px;
margin-bottom: 10px;
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

const _TermsText = styled.div`
font-family: 'Noto Sans KR';
font-size: 15px;
margin: 20px 0;
white-space: pre-line; /* Preserve newline formatting */
`;

const _TermsBox = styled.div`
    max-height: 300px; /* Adjust the height as needed */
    overflow-y: auto;
    margin-bottom: 20px; /* Add spacing between terms and button */
`;


const _AgreeCheckbox = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    font-size: 16px;

    input[type="checkbox"] {
        margin-right: 10px;
        transform: scale(1.3); /* Increase the checkbox size */
    }
`;