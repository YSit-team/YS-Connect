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
        postID: "57"
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
    <h2>{postsData.title}</h2>
    <h4>{postsData.content}</h4>
    <div>{postsData.author}</div>
    <div>게시일 : {postsData.date}</div>
    <div>좋아요 : {postsData.likes}</div>
    <div>조회수 : {postsData.views}</div>
    </>
    );
};

export default CommunityDetail;

const _Wrap = styled.div`
    margin-top: 100px;
    display: grid;
    grid-template-columns: 1fr 3fr 1fr;
    grid-template-areas:
        "header header header"
        ". listtitle ."
        ". list ."
        ". writetitle ."
        ". write ."
        ". btn .";
`

const _Header = styled.header`
    width: 100%;
    margin-top: 30px;
    font-size: 28px;
    font-weight: 750;
    color: #000000;
    text-align: center;
    grid-area: header;
`

const _List = styled.div`
    width: 700px;
    font-size: 23px;
    font-weight: 700;
    color: #000000;
    box-shadow: inset 0 -2px 0 #1E00D3;
    padding-bottom: 10px;
    margin-top: 10px;
    grid-area: listtitle;
`

const _Write = styled.div`
    width: 700px;
    font-size: 23px;
    font-weight: 700;
    color: #000000;
    box-shadow: inset 0 -2px 0 #1E00D3;
    padding-bottom: 10px;
    margin-top: 10px;
    grid-area: writetitle;
`

//제출버튼부모
const Btnwrap = styled.div`
    display: flex;
    justify-content: center;
    grid-area: btn;
`

//제출버튼
interface Container{
    bgcolor: any;
    color: any;
}
const _SubmitBtn = styled.button<Container>`
    width: 25vw;
    height: 60px;
    border: none;
    color : ${props => props.color};
    border-radius: 15px;
    background: ${props => props.bgcolor};
    margin: 5px;
    margin-top: 15px;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    @media (max-width: 600px) {
    font-size: 13px;
    }
`

const _Writewrap = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    grid-area: write;
`

const _Inputtitle = styled.div`
    font-size: 20px;
    font-weight: 500;
    padding-top: 20px;
    padding-bottom: 20px;
    /* padding-left: 10px; */
    text-align: center;
    /* box-shadow: inset 0 -1px 0 #888888; */
    display: flex;
    justify-content: center;
`


