import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../../api/API_Server';
import Menubar from '../../components/Menubar';

const CommunityWrite: React.FC = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('');
    const [file, setFile] = useState<File | null>(null);
    const [userID, setUserID] = useState<string | null>(null);
    const [name, setName] = useState<string | null>(sessionStorage.getItem('name'));

    useEffect(() => {
        // 'userId'가 sessionStorage에 존재하는지 확인
        const storedUserID = sessionStorage.getItem('userId');
        if (storedUserID) {
          setUserID(storedUserID); // sessionStorage에 값이 있으면 userID 상태를 설정합니다.
        }
    }, []);

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

    const handleSubmit = async () => {
        try {
        const response = await axiosInstance.post('/Community/postWrite', {
            id: userID,
            name: name,
            title: title,
            content: content,
        });
    
        if (response.status === 200) {
            alert('성공' + response.data.message + "200");
        } else if (response.status === 202) {
            alert('에러' + response.data.message + "202");
        } else if (response.status === 500) {
            alert('에러' + '서버에 오류가 발생했습니다.' + "500");
        }
        } catch (error) {
        console.log('Profile API | ', error);
            alert('에러' + error + "catch");
        }
    
        // 글 작성 폼이 제출되었을 때의 동작을 수행하는 함수입니다.
        // 여기서는 단순히 title, content, category, file을 출력하는 예시를 보여줍니다.
        console.log('유저아이디:', userID)
        console.log('이름:', name);
        console.log('Title:', title);
        console.log('Content:', content);
    };

    return (
        <>
        <Menubar/>
        <Wrap>
            <Container>
            <_BoardTitle>커뮤니티 글쓰기</_BoardTitle>
            {/* <CategorySelect value={category} onChange={handleCategoryChange}>
            <option value="">게시판을 선택해주세요</option>
            <option value="technology">기술</option>
            <option value="travel">여행</option>
            <option value="food">음식</option>
            </CategorySelect> */}
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
            
            {/* <FileInput type="file" onChange={handleFileChange} /> */}
            <ButtonWrapper>
            <SubmitButton onClick={handleSubmit}>글 작성</SubmitButton>
            </ButtonWrapper>
            </Container>
        </Wrap>
    </>
    );
};


export default CommunityWrite;

const Wrap = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Container = styled.div`
display: flex;
flex-direction: column;
width: 900px;

border: 1px solid #ccc;
border-radius: 8px;
`;

const _BoardTitle = styled.div`
    font-size: 1.4rem;
    font-weight: 600;
    border-bottom: 1px solid #ccc;
    padding: 15px;
    padding-bottom: 15px;
    margin-bottom: 20px;
`

const CategorySelect = styled.select`
font-size: 18px;
padding: 8px;
margin-bottom: 20px;
`;

const TitleInput = styled.input`
font-size: 25px;
margin-bottom: 20px;
padding: 10px;
font-weight: 600;
border: none;
outline: none;
`;

const ContentTextarea = styled.textarea`
font-size: 18px;
height: 300px;
padding: 10px;
resize: none; //크기조절 불가
border: none;
outline: none;

`;

const FileInput = styled.input`
    margin-bottom: 20px;
`;

const ButtonWrapper = styled.div`
display: flex;
justify-content: flex-end;
margin-bottom: 20px;

border-top: 1px solid #ccc;
`

const SubmitButton = styled.button`
width: 100px;
height: 40px;
font-weight: 600;
margin-top: 20px;
margin-right: 15px;
display: flex;
align-items: center;
font-size: 16px;
background-color: #007bff;
color: #fff;
padding: 12px 24px;
border: none;
border-radius: 4px;
cursor: pointer;
`;