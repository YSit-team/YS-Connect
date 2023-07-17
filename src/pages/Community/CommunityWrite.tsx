import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Menubartest from '../../components/Menubar';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../../api/API_Server';
import Menubar from '../../components/Menubar';

const CommunityWrite: React.FC = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('');
    const [file, setFile] = useState<File | null>(null);

    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    };

    const handleContentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
    };

    const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(event.target.value);
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
        setFile(event.target.files[0]);
    }
    };

    const handleSubmit = () => {
    // 글 작성 폼이 제출되었을 때의 동작을 수행하는 함수입니다.
    // 여기서는 단순히 title, content, category, file을 출력하는 예시를 보여줍니다.
    console.log('Title:', title);
    console.log('Content:', content);
    console.log('Category:', category);
    console.log('File:', file);
    };

    return (
        <>
        <Menubar/>
    <Container>
        <CategorySelect value={category} onChange={handleCategoryChange}>
        <option value="">게시판을 선택해주세요</option>
        <option value="technology">기술</option>
        <option value="travel">여행</option>
        <option value="food">음식</option>
        </CategorySelect>
        <TitleInput
        type="text"
        placeholder="제목을 입력해주세요."
        value={title}
        onChange={handleTitleChange}
        />
        <ContentTextarea
        placeholder="내용을 입력해주세요."
        value={content}
        onChange={handleContentChange}
        />
        
        <FileInput type="file" onChange={handleFileChange} />
        
        <SubmitButton onClick={handleSubmit}>글 작성</SubmitButton>
    </Container>
    </>
    );
};


export default CommunityWrite;


const Container = styled.div`
display: flex;
flex-direction: column;
width: 100%;
max-width: 600px;
margin: 0 auto;
margin-top: 90px;
padding: 20px;
border: 1px solid #ccc;
border-radius: 8px;

@media (max-width: 768px) {
    max-width: 90%;
}
`;

const CategorySelect = styled.select`
font-size: 18px;
padding: 8px;
margin-bottom: 20px;

@media (max-width: 768px) {
    font-size: 16px;
}
`;

const TitleInput = styled.input`
font-size: 20px;
margin-bottom: 20px;
padding: 10px;

@media (max-width: 768px) {
    font-size: 20px;
}
`;

const ContentTextarea = styled.textarea`
font-size: 18px;
height: 800px;
margin-bottom: 20px;
padding: 10px;
resize: none; //크기조절 불가

@media (max-width: 768px) {
    font-size: 16px;
    height: 150px;
}
`;

const FileInput = styled.input`
    margin-bottom: 20px;
`;

const SubmitButton = styled.button`
font-size: 20px;
background-color: #007bff;
color: #fff;
padding: 12px 24px;
border: none;
border-radius: 4px;
cursor: pointer;

@media (max-width: 768px) {
    font-size: 18px;
    padding: 10px 20px;
}
`;