import React, {useEffect, useState} from 'react';
import styled, { keyframes } from 'styled-components';
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

    const [commentsData, setCommentsData] = useState([])
    const [repliesData, setRepliesData] = useState([])

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

    const commentCheck = async() => {
        await axiosInstance.post('/Community/commentCheck', { postID: id })
            .then((res) => {
                setCommentsData(res.data.data)
            }).catch((error) => {
                console.log(error)
            })
    }
    
    const repliesCheck = async() => {
        await axiosInstance.post('/Community/repliesCheck', { postID: id })
            .then((res) => {
                setRepliesData(res.data.data)
            }).catch((error) => {
                console.log(error)
            })
    }
    useEffect(() => {
        handle()
        commentCheck()
        repliesCheck()
    }, [])

    if (postsData === null) {
        return <div>불러오는중...</div>;
    }
    console.log(postsData)
    console.log(commentsData)
    console.log(repliesData)
    
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

        {/* <_Inputwrap> */}
        <CommentInput type="text" placeholder="댓글을 입력하세요" />
        <Underline/>
        {/* </_Inputwrap> */}
        
        <CommentButton>작성</CommentButton>
        </CommentInputWrapper>

        {commentsData &&
            commentsData.map((data:any) => {
                return (
                    <CommentItem key={data.id}>
                    <CommentContentWrap>
                        <CommentWriter>{data.author}</CommentWriter>
                        <CommentContent>{data.content}</CommentContent>
                        <CommentWriter>{data.date.substring(5, 16).replace(/-/g, '.').replace(/T/g, ' ')}</CommentWriter>
                    </CommentContentWrap>
                    {repliesData &&
                        repliesData.map((_data:any) => {
                        if (data.id === _data.comment_id) {
                            return (
                            <ReplyWrapper key={_data.id}>
                                <ReplyItem>
                                <CommentWriter>{_data.author}</CommentWriter>
                                <ReplyContent>{_data.content}</ReplyContent>
                                <ReplyContent>{_data.date.substring(5, 16).replace(/-/g, '.').replace(/T/g, ' ')}</ReplyContent>
                                </ReplyItem>
                            </ReplyWrapper>
                            );
                        }
                        return null; // Return null if the reply doesn't belong to the current comment
                        })}
                    </CommentItem>
                );
        })}


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
justify-content: center;
position: relative;
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
border: none;
font-size: 14px;
outline: none;
`;

const Underline = styled.div`
position: absolute;
bottom: 0;
width: 88%;
height: 1.5px;
background-color: #1e00d3;
transform-origin: center;
transform: scaleX(0);
transition: transform 0.3s;

${CommentInput}:focus ~ & {
    transform: scaleX(1);
}
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
    align-items: center;
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
align-items: center;
`;

const ReplyContent = styled.p`
font-size: 14px;
line-height: 1.4;
`;