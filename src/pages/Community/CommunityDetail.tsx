import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import Menubar from '../../components/Menubar';
import { useParams } from 'react-router-dom';
import {useNavigate} from "react-router-dom";
import axiosInstance from '../../api/API_Server';
import { Ring } from '@uiball/loaders'

interface PostData {
image: any;
image_Type: any;
title: string;
content: string;
author: string;
author_id: string;
date: string;
likes: number;
views: number;
}

interface CommentData {
image_Type: any;
image: any;
image_Path: string | undefined;
account_id: string | null;
id: string;
author: string;
content: string;
date: string;
}

interface ReplyData {
reply_id: string;
account_id: string | null;
id: string;
comment_id: string;
author: string;
content: string;
date: string;
}

const CommunityDetail = () => {
let navigate = useNavigate();
const { id } = useParams();

const [postsData, setPostsData] = useState<PostData | null>(null);
const [postImgData, setPostImgData] = useState([]);
const [postImgInfo, setPostImgInfo] = useState('');

const [commentsData, setCommentsData] = useState<CommentData[]>([]);
const [repliesData, setRepliesData] = useState<ReplyData[]>([]);

const [userID, setUserID] = useState<string | null>(null);
const [commentForm, setCommentForm] = useState('');
const [replyForm, setReplyForm] = useState('');
const [replyTarget, setReplyTarget] = useState('');

useEffect(() => {
    // 'userId'가 sessionStorage에 존재하는지 확인
    const storedUserID = sessionStorage.getItem('userId');
    if (storedUserID) {
      setUserID(storedUserID); // sessionStorage에 값이 있으면 userID 상태를 설정합니다.
    }
}, []);

const params = { // 게시글 조회요청용 변수생성
    postID: id,
};

const handle = async (): Promise<void> => { // 게시글 조회
    try {
    const res = await axiosInstance.get('/Community/postInquiry', { params });
    if (res.status === 200) {
        if (res.data) {
            console.log(res.data.data)
            setPostsData(res.data.data[0]);
            setPostImgData(res.data.data.imageData);
            setPostImgInfo(res.data.data.imageInfo);
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

const commentCheck = async () => { // 댓글 조회
    try {
    const res = await axiosInstance.post('/Community/commentsCheck', { postID: id });
    setCommentsData(res.data.data);
    console.log(res.data.data);
    } catch (error) {
    console.log(error);
    }
};

const repliesCheck = async () => { // 대댓글 조회
    try {
    const res = await axiosInstance.post('/Community/repliesCheck', { postID: id });
    setRepliesData(res.data.data);
    console.log(repliesData)
    } catch (error) {
    console.log(error);
    }
};

const handleCommentForm = (e: React.ChangeEvent<HTMLInputElement>) => { // 댓글 작성 실시간반영
    setCommentForm(e.target.value);
};

const handleReplyForm = (e: React.ChangeEvent<HTMLInputElement>) => { // 대댓글 작성 실시간반영
    setReplyForm(e.target.value);
};

const postComment = async () => { // 댓글작성
    try {
        await axiosInstance.post('/Community/commentForm', { accountID: userID, postID: id, content: commentForm });
        commentCheck();
        setCommentForm('');
    } catch (error) {
    console.log(error);
    }
};

const postReply = async (commentID: string) => { // 대댓글작성
    try {
        await axiosInstance.post('/Community/repliesForm', { accountID: userID, commentID, postID: id, content: replyForm });

        repliesCheck();
        setReplyForm('');
        setReplyTarget('');
    } catch (error) {
    console.log(error);
    }
};

const handleCommentKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => { // 댓글 엔터키
    if (event.nativeEvent.isComposing) { 	   // isComposing 이 true 이면 
        return;				   // 조합 중이므로 동작을 막는다.
    }
    if (event.key === 'Enter') {
        event.preventDefault();
        postComment();
    }
};

const handleReplyKeyPress = (event: React.KeyboardEvent<HTMLInputElement>, commentID: string) => { // 대댓글 엔터키
    if (event.nativeEvent.isComposing) { 	   // isComposing 이 true 이면 
        return;				   // 조합 중이므로 동작을 막는다.
    }
    if (event.key === 'Enter') {
        event.preventDefault();
        postReply(commentID);
    }
};

const handleDelete = async() => {
    console.log(id);
    console.log(userID);
    try {
        const res = await axiosInstance.post('/Community/deletePost', { postID: id, accountID: userID });
            alert("게시글이 삭제되었습니다.")
            navigate('/community');
        } catch (error) {
            alert(userID)
        console.log(error);
    }
};

const handleCommentDelete = async(commentId:any) => { // 댓글 삭제
    console.log(commentId);
    console.log(id);
    console.log(userID);
    try {
        const res = await axiosInstance.post('/Community/deleteComments', { commentID: commentId, postID: id, accountID: userID });
            alert("댓글이 삭제되었습니다.")
            window.location.reload();
        } catch (error) {
            alert(userID)
            console.log(error);
    }
};

const handleReplyDelete = async(replyId:any, commentId:any) => { // 대댓글 삭제
    console.log(replyId, commentId);
    try {
        const res = await axiosInstance.post('/Community/deleteReplies', { repliesID: replyId, commentID: commentId, postID: id, accountID: userID });
            alert("대댓글이 삭제되었습니다.")
            window.location.reload();
    } catch (error) {
        alert(userID)
        console.log(error);
}
};


useEffect(() => {
    handle();
}, [id]);

useEffect(() => {
    commentCheck();
}, [id, commentForm]);

useEffect(() => {
    repliesCheck();
}, [id, replyForm]);

if (postsData === null) {
    return <Rodingwrap>
            <Ring
            size={40}
            lineWeight={5}
            speed={2}
            color="black"
            />
            </Rodingwrap>;
}

return (
    <>
    <Menubar />
    <Wrapper>
        <Title>{postsData.title}</Title>
        <InfoWrapper>
        <Profilewrap>
            <Author>{postsData.author}</Author>
            <Author style={{ paddingLeft: '5px', paddingRight: '5px' }}>|</Author>
            <Time>{postsData.date.substring(0, 16).replace(/-/g, '.').replace(/T/g, ' ')}</Time>
        </Profilewrap>
        <StatsWrapper>
            {postsData.author_id === userID ? (
                <>
                <button onClick={() => navigate(`/communityedit/${id}`)}>수정</button>
                <button onClick={handleDelete}>삭제</button>
                <Stat>조회수 {postsData.views}</Stat>
                <Stat>좋아요 {postsData.likes}</Stat>
                </>
            ) : (
                <>
                <Stat>조회수 {postsData.views}</Stat>
                <Stat>좋아요 {postsData.likes}</Stat>
                </>
            )}
        </StatsWrapper>
        </InfoWrapper>
        <Content>
            
            {/* 댓글만 존재 */}
            {postsData.content != null && !postImgData &&
                    <>
                    {postsData.content}
                    </>
                }
                {/* 이미지만 존재 */}
                {postsData.content === null && postImgData && (
                <>
                    {postImgData.map((image, i) => (
                        <img
                        key={i} // 각 이미지마다 고유한 식별자를 지정
                        src={`data:image/jpeg;base64,${image}`} // MIME 타입 지정 및 base64 데이터 사용
                        alt={`Image ${i}`}
                        style={{ maxWidth: '200px', width: '100%', height: 'auto' }}
                        />
                    ))}
                </>
                )}
                {/* 댓글, 이미지 존재 */}
                {postsData.content != null && postImgData &&
                    <>
                    {postsData.content}
                    {postImgData.map((image, i) => (
                        <img
                        key={i} // 각 이미지마다 고유한 식별자를 지정
                        src={`data:image/jpeg;base64,${image}`} // MIME 타입 지정 및 base64 데이터 사용
                        alt={`Image ${i}`}
                        style={{ maxWidth: '200px', width: '100%', height: 'auto' }}
                        />
                    ))}
                    </>
                }
        </Content>
        <CommentWrapper>
        <CommentInputWrapper>
            <CommentAvatar src="/icon/profile.jpeg" alt="Avatar" />
            <_Inputwrapper2>
            <CommentInput
            type="text"
            placeholder="댓글을 입력하세요"
            value={commentForm}
            onChange={handleCommentForm}
            onKeyDown={handleCommentKeyPress}
            />
            <Underline />
            </_Inputwrapper2>
            <CommentButton onClick={postComment}>작성</CommentButton>
        </CommentInputWrapper>

        {commentsData.map((comment) => (
            <CommentItem key={comment.id}>
            <CommentContentWrap>
                {/* 댓글만 존재 */}
                {comment.content != null && !comment.image &&
                    <>
                    <CommentWriter>{comment.author}</CommentWriter>
                    <CommentContent>{comment.content}</CommentContent>
                    </>
                }
                {/* 이미지만 존재 */}
                {comment.content === null && comment.image && (
                <>
                    <CommentWriter>{comment.author}</CommentWriter>
                    <img src={`data:${""};base64,${comment.image}`} alt="Image"  style={{ maxWidth: '200px', width: '100%', height: 'auto' }}/>
                </>
                )}
                {/* 댓글, 이미지 존재 */}
                {comment.content != null && comment.image &&
                    <>
                    <CommentWriter>{comment.author}</CommentWriter>
                    <img src={`data:${""};base64,${comment.image}`} alt="Image"  style={{ maxWidth: '200px', width: '100%', height: 'auto' }}/>
                    <CommentContent>{comment.content}</CommentContent>
                    </>
                }
                <CommentWriter>
                {comment.account_id === userID ? (
                <>
                    <button onClick={() => handleCommentDelete(comment.id)}>삭제</button>
                    <button
                    style={{ marginRight: '20px' }}
                    onClick={() => setReplyTarget(comment.id)}
                    >
                        답글쓰기
                    </button>
                </>
            ) : (
                <>
                <button
                    style={{ marginRight: '20px' }}
                    onClick={() => setReplyTarget(comment.id)}
                >
                    답글쓰기
                </button>
                </>
            )}
                {comment.date.substring(5, 16).replace(/-/g, '.').replace(/T/g, ' ')}
                </CommentWriter>
            </CommentContentWrap>

            {replyTarget === comment.id && (
                <ReplyInputWrapper>
                <ReplyAvatar src="/profile.jpeg" alt="Avatar" />
                <_Inputwrapper2>
                <ReplyInput
                    type="text"
                    placeholder="답글을 입력하세요"
                    value={replyForm}
                    onChange={handleReplyForm}
                    onKeyDown={(event:any) => handleReplyKeyPress(event, comment.id)}
                />
                <ReplyUnderline />
                </_Inputwrapper2>
                <ReplyButton onClick={() => postReply(comment.id)}>작성</ReplyButton>
                </ReplyInputWrapper>
            )}

            {repliesData
                .filter((reply) => reply.comment_id === comment.id)
                .map((reply) => (
                <ReplyWrapper key={reply.id}>
                    <ReplyItem>
                    <CommentWriter>{reply.author}</CommentWriter>
                    <ReplyContent>{reply.content}</ReplyContent>
                    
                    {reply.account_id === userID ? (
                <>
                    <ReplyContent><button onClick={() => handleReplyDelete(reply.reply_id, comment.id)}>삭제</button> {reply.date.substring(5, 16).replace(/-/g, '.').replace(/T/g, ' ')}</ReplyContent>
                </>
            ) : (
                <>
                    <ReplyContent>{reply.date.substring(5, 16).replace(/-/g, '.').replace(/T/g, ' ')}</ReplyContent>
                </>
            )}
                    </ReplyItem>
                </ReplyWrapper>
                
                ))}

            
            </CommentItem>
        ))}
        
        </CommentWrapper>
    </Wrapper>
    </>
);
};

export default CommunityDetail;


const Wrapper = styled.div`
width: 80%;
margin: 0 auto;
padding: 20px;
background-color: #fff;
border: 1px solid #b1b1b1;
margin-top: 100px;

@media (max-width: 600px) {
    width: 90vw;
    border: none;
    margin-top: 50px;
}
`;

const Title = styled.h2`
font-size: 28px;
font-weight: bold;
`;

const Author = styled.p`
font-size: 14px;
color: #888;
margin-bottom: 10px;
white-space: nowrap;
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
white-space: nowrap;
`;

const StatsWrapper = styled.div`
display: flex;
align-items: center;
`;

const Stat = styled.p`
font-size: 14px;
color: #888;
margin-left: 10px;
white-space: nowrap;

@media (max-width: 600px) {
    font-size: 12px;
}
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

const _Inputwrapper2 = styled.div`
width: 88%;
position: relative;
`;

const CommentInput = styled.input`
flex: 1;
width: 100%;
height: 32px;
padding: 6px 10px;
border: none;
font-size: 14px;
outline: none;
`;

const Underline = styled.div`
position: absolute;
bottom: 0;
width: 100%;
height: 1px;
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
z-index: 2;
cursor: pointer;
border: none;
white-space: nowrap; 

@media (max-width: 600px) {
    white-space: nowrap; 
}
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

//답글쓰기
const ReplyInputWrapper = styled.div`
display: flex;
align-items: center;
margin-bottom: 10px;
justify-content: center;
position: relative;
height: 50px;
`;

const ReplyAvatar = styled.img`
width: 32px;
height: 32px;
border-radius: 50%;
margin-right: 10px;
`;

const ReplyInput = styled.input`
flex: 1;
width: 100%;
height: 32px;
padding: 6px 10px;
border: none;
font-size: 14px;
outline: none;
`;

const ReplyButton = styled.button`
padding: 6px 12px;
border-radius: 16px;
background-color: #3366ff;
color: #fff;
font-size: 14px;
font-weight: bold;
cursor: pointer;
z-index: 2;
border: none;
`;

const ReplyUnderline = styled.div`
position: absolute;
bottom: 0;
width: 100%;
height: 1px;
background-color: #1e00d3;
transform-origin: center;
transform: scaleX(0);
transition: transform 0.3s;

${ReplyInput}:focus ~ & {
    transform: scaleX(1);
}
`;

const Rodingwrap = styled.div`
    display: flex;
    width: 100vw;
    height: 100vh;
    justify-content: center;
    align-items: center;
`