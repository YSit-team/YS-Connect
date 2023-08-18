import React, { useState, ChangeEvent } from 'react';
import axiosInstance from '../../../api/API_Server';
import styled from 'styled-components';

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
const [imageData, setImgData] = useState<{
    uri: string;
    type: string;
    fileName: string;
} | null>(null);

const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const uploadedImage = event.target.files?.[0];
    if (uploadedImage) {
        setImage(uploadedImage);
        setImgData({
            uri: URL.createObjectURL(uploadedImage),
            type: uploadedImage.type,
            fileName: uploadedImage.name,
        });
    }
};

const handleCheckStudentIDForm = async () => {
    if (!image) {
    alert('먼저 사진을 촬영하거나 선택해주세요.');
    return;
    }

    try {


    const form = new FormData()
    // form.append('image', image);
    const imageInfo = {
        uri: URL.createObjectURL(image),
        type: image.type,
        name: image.name,
    };

    form.append('image', JSON.stringify(imageInfo));
    form.append('data', JSON.stringify({
        studentID: formData.studentID,
        firstName: formData.firstName,
        lastName: formData.lastName,
    }))

    console.log(form.get('image'))
    console.log(form.get('data'));

    // REST API 호출 및 처리 로직
    const response = await axiosInstance.post('/register/CheckStudentID', form);

    // API 호출 성공 시의 처리 로직
    if (response.status === 200) {
        alert(response.data.message);
    }
    } catch (error) {
    // API 호출 실패 또는 예외 발생 시의 처리 로직
    alert('예외가 발생했습니다.\n나중에 다시 시도해 주세요.');
    console.error(error);
    }
};

return (
    <_Wrap>
    <_FormWrap>
        <_Subtitle>학생증을 확인할게요</_Subtitle>

        <_InputWrap>
        <_Input type="file" accept="image/*" onChange={handleImageUpload} />
        </_InputWrap>
        {image && <_Image src={URL.createObjectURL(image)} alt="학생증 사진" />}

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