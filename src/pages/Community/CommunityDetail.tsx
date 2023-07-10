import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Menubar from '../../components/Menubar'
import { useParams } from 'react-router-dom';
import axiosInstance from '../../api/API_Server';

interface PostData {
    title: string;
    content: string;
    author: string;
    date: string;
    likes: number;
    views: number;
}

const CommunityDetail = () => {
    const { id } = useParams();

    const [postsData, setPostsData] = useState<PostData | null>(null);

    console.log(id)
    const params = {
        postID: id
    }

    const handle = async (): Promise<void> => {
        try {
        const res = await axiosInstance.get('/Community/postInquiry', { params });
        if (res.status === 200) {
            if (res.data) { // 데이터가 유효한 경우에만 setPostsData 호출
                setPostsData(res.data.results[0]);
                console.log(res.data.results[0]);
            }
        } else if (res.status === 400) {
            alert('코드 400');
        } else if (res.status === 500) {
            alert('코드 500');
        } else {
            alert('예외발생');
        }
        } catch (error) {
        console.log(error);
        }
    };

    useEffect(() => {
        handle()
    }, [])

    if (postsData === null) {
        return <div>Loading...</div>;
    }
    // console.log(postsData)

    
    return (
    <>
    <Menubar/>
    <Wrapper>
    <Title>{postsData.title}</Title>
    <InfoWrapper>
        <Profilewrap><Author>{postsData.author}</Author><Author style={{paddingLeft: "5px", paddingRight: "5px"}}>|</Author><Time>{postsData.date.substring(0, 16).replace(/-/g, '.').replace(/T/g, ' ')}</Time></Profilewrap>
        <StatsWrapper>
        <Stat>조회수 {postsData.views}</Stat>
        <Stat>좋아요 {postsData.likes}</Stat>
        </StatsWrapper>
    </InfoWrapper>
    <Content>
        {postsData.content}
    </Content>
    <CommentWrapper>
        <CommentInputWrapper>
        <CommentAvatar src="/profile.jpeg" alt="Avatar" />
        <CommentInput type="text" placeholder="댓글을 입력하세요" />
        <CommentButton>작성</CommentButton>
        </CommentInputWrapper>

        <CommentItem>
            <CommentContentWrap>
                <CommentWriter>익명</CommentWriter>
                <CommentContent>우하하 나는 댓글이다</CommentContent>
                <CommentWriter>1시50분</CommentWriter>
            </CommentContentWrap>

        <ReplyWrapper>
            <ReplyItem>
                <CommentWriter>익명1</CommentWriter>
                <ReplyContent>우짤ㅐㅈㅂ야ㅓ배야ㅓㅂ재ㅑ어배쟈</ReplyContent>
                <ReplyContent>1시30분</ReplyContent>
            </ReplyItem>

            <ReplyItem>
                <CommentWriter>익명2</CommentWriter>
                <ReplyContent>하하하ㅏ</ReplyContent>
                <ReplyContent>4시50분</ReplyContent>
            </ReplyItem>
        </ReplyWrapper>
        </CommentItem>
    </CommentWrapper>
    </Wrapper>
    </>
    );
};

export default CommunityDetail;

const Wrapper = styled.div`
width: 100%;
max-width: 800px;
margin: 0 auto;
padding: 20px;
background-color: #fff;
border: 1px solid #b1b1b1;
margin-top: 100px;
`;

const Title = styled.h2`
font-size: 28px;
font-weight: bold;
`;

const Author = styled.p`
font-size: 14px;
color: #888;
margin-bottom: 10px;
`;


const InfoWrapper = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
border-bottom: 1px solid #000;
margin-bottom: 20px;
`;

const Profilewrap = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`

const Time = styled.p`
font-size: 14px;
color: #888;
`;

const StatsWrapper = styled.div`
display: flex;
align-items: center;
`;

const Stat = styled.p`
font-size: 14px;
color: #888;
margin-left: 10px;
`;

const Content = styled.div`
font-size: 16px;
line-height: 1.6;
margin-bottom: 30px;
`;

const CommentWrapper = styled.div`
margin-top: 30px;
`;

const CommentInputWrapper = styled.div`
display: flex;
align-items: center;
margin-bottom: 10px;
`;

const CommentAvatar = styled.img`
width: 32px;
height: 32px;
border-radius: 50%;
margin-right: 10px;
`;

const CommentInput = styled.input`
flex: 1;
height: 32px;
padding: 6px 10px;
border-radius: 16px;
border: none;
font-size: 14px;

`;

const CommentButton = styled.button`
padding: 6px 12px;
border-radius: 16px;
background-color: #3366ff;
color: #fff;
font-size: 14px;
font-weight: bold;
cursor: pointer;
border: none;
`;

const CommentItem = styled.div`
margin-top: 10px;
padding-left: 42px;
`;

const CommentContent = styled.p`
font-size: 14px;
line-height: 1.4;
`;

const CommentContentWrap = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    border-bottom: 1px solid #888;
`

const CommentWriter = styled.div`
    font-size: 14px;
    line-height: 1.4;
`

const ReplyWrapper = styled.div`
margin-left: 32px;
`;

const ReplyItem = styled.div`
margin-top: 10px;
padding-left: 42px;
display: flex;
flex-direction: row;
justify-content: space-between;
border-bottom: 1px solid #888;
`;

const ReplyContent = styled.p`
font-size: 14px;
line-height: 1.4;
`;