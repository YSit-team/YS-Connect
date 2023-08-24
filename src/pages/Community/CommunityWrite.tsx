import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../../api/API_Server';
import Menubar from '../../components/Menubar';

const CommunityWrite: React.FC = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('');
    const [files, setFiles] = useState<File[]>([]); // 이미지 파일 배열
    const [previewURL, setPreviewURL] = useState<string | null>(null); // 추가: 미리보기 URL 상태
    const [userID, setUserID] = useState<string | null>(null);
    const [name, setName] = useState<string | null>(sessionStorage.getItem('name'));

    const fileInputRef = useRef<HTMLInputElement>(null); // 파일 입력 엘리먼트를 위한 ref 생성

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const selectedFiles = Array.from(event.target.files); // 선택된 파일들을 배열로 변환
            setFiles([...files, ...selectedFiles]); // 기존 파일 배열과 새 파일들을 합쳐서 업데이트
        }
    };
    // 파일 입력 클릭을 트리거하는 함수
    const handlePictureClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click(); // 파일 입력 클릭 이벤트를 프로그래머적으로 트리거합니다.
        }
    };

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
                <TopWrap>
                    <_BoardTitle>커뮤니티 글쓰기</_BoardTitle>
                    <CategorySelect value={category} onChange={handleCategoryChange}>
                    <option value="">게시판을 선택해주세요</option>
                    <option value="free">자유게시판</option>
                    <option value="travel">익명게시판</option>
                    </CategorySelect>
                </TopWrap>
            
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
            {/* 이미지들을 순회하여 렌더링 */}
            <Slider hasImages={files.length > 0}>
                {files.map((file, index) => (
                    <Slide key={index}>
                        <Image src={URL.createObjectURL(file)} alt={`Image ${index}`} />
                    </Slide>
                ))}
            </Slider>
            {/* 숨겨진 파일 입력 엘리먼트 #아이콘을 누르면 useRef로 인해 파일 인풋이 작동함*/}
            <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleFileChange}
                multiple // 다중 파일 선택 허용
            />

            {/* <FileInput type="file" onChange={handleFileChange} /> */}
            <ButtonWrapper>
            <Icon src="/icon/picture.svg" alt="picture" onClick={handlePictureClick}></Icon>
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

const TopWrap = styled.div`
    display: flex;
    border-bottom: 1px solid #ccc;
    padding: 15px;
    padding-bottom: 15px;
    margin-bottom: 20px;
    align-items: center;
    justify-content: space-between;
`

const _BoardTitle = styled.div`
    font-size: 1.4rem;
    font-weight: 600;
`

const CategorySelect = styled.select`
font-size: 14px;
padding: 8px;
border-radius: 5px;
border: 1px solid #ccc;
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
height: 250px;
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
justify-content: space-between;
align-items: center;

border-top: 1px solid #ccc;
`

const SubmitButton = styled.button`
width: 100px;
height: 40px;
font-weight: 600;
margin-top: 20px;
margin-right: 15px;
margin-bottom: 20px;
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

const Icon = styled.img`
    width: 25px;
    height: 25px;
    margin-left: 25px;
    cursor: pointer;
`
// const Imgwrap = styled.div`
//     display: flex;
//     height: 200px;
//     flex-wrap: wrap; /* 이미지가 가로로 최대한 쌓였을 때 줄바꿈 */
// `

// const ImgContainer = styled.div`
//     margin-right: 10px; /* 이미지 사이 간격을 조절 */
// `;

const Slider = styled.div<{ hasImages: boolean }>`
    display: flex;
    overflow-x: auto;
    align-items: flex-start;
    height: ${props => (props.hasImages ? '200px' : '0')}; /* 이미지가 있을 때 200px, 없을 때 0으로 조건부 높이 설정 */
`;

const Slide = styled.div`
    flex-shrink: 0;
    margin-right: 10px;
`;

const Image = styled.img`
    width: 200px;
`