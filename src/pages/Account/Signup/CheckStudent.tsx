import React, { useState, ChangeEvent } from 'react';
import axiosInstance from '../../../api/API_Server';
import styled from 'styled-components';
import { useNavigate } from "react-router-dom";

type NextProps = {
    formData: {
        email: string;
        password: string;
        phoneNumber: string;
        firstName: string,
        lastName: string,
        studentID: string
    };
    onNextStep: () => void;
};

const CheckStudent: React.FC<NextProps> = ({ formData, onNextStep }) => {
    const [image, setImage] = useState<File | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    let navigate = useNavigate();

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedFile(file);
        }
    };

    const handleCheckStudentIDForm = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!selectedFile) {
            alert('먼저 사진을 선택해주세요.');
            return;
        }
        try {
            const form = new FormData();
            form.append('image', selectedFile);

            form.append('data', JSON.stringify({
                studentID: '30263',
                firstName: '이',
                lastName: '길동',
            }));

            // REST API 호출 및 처리 로직
            await axiosInstance.post('/register/CheckStudentID', form, {
                headers: { 'Content-Type': 'multipart/form-data' }
            })
                .then((res) => {
                    if (res.status === 200) {
                        alert(res.data.message)
                        onNextStep()
                    } else {
                        alert('예외 발생')
                    }
                }).catch((error) => {
                    console.log(error)
                    if (error.response) {
                        const res = error.response
                        if (res.state === 400) {
                            alert(res.data.errorDescription)
                        } else {
                            alert(res.data.errorDescription)
                        }
                    } else {
                        alert('서버 통신 실패')
                    }
                })
        } catch (error) {
            // API 호출 실패 또는 예외 발생 시의 처리 로직
            console.error(error);
        }
    };

    return (
        <_Wrap>
            <_FormWrap>
                <_Subtitle>학생증을 확인할게요</_Subtitle>

                <_InputWrap>
                    <_Input type="file" accept="image/*" onChange={handleFileChange} />
                </_InputWrap>
                {selectedFile && <_Image src={URL.createObjectURL(selectedFile)} alt="학생증 사진" />}

                <_SignUpBtnWrap>
                    <_SignUpBtn type="button" onClick={handleCheckStudentIDForm}>
                        전송
                    </_SignUpBtn>
                </_SignUpBtnWrap>
            </_FormWrap>
        </_Wrap>
    );
};

export default CheckStudent;



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

const _Image = styled.img`
    max-width: 40%; /* 이미지의 최대 너비를 100%로 설정 */
    margin-top: 10px;
    margin: 0 auto;
`;