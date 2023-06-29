import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Menubartest from '../../components/Menubar';
import axios from 'axios';
import Menubar from '../../components/Menubar';
import { Link } from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import { Script } from 'vm';

const Community = () => {
    let navigate = useNavigate();
    const [postsData, setPostData] = useState([])

    const handle = async() => {
        axios.post("http://www.zena.co.kr/api/Community/postInquiry",)
            .then((res)=>(
                //console.log(res.data)
                setPostData(res.data.results),
                console.log(res.data.results)
            )).catch((error)=>(
                console.log(error)
            ))
    }

    useEffect(() => {
        handle()
    }, [])

    return (
        <>
        <Menubar/>
        <_GlobalWrap>
        {/* <Menubar/> */}
        <_BoardListWrap>
        <_BoardTitle>커뮤니티</_BoardTitle>
        <_BoardList>
        <_ListHead>
        <_Num>번호</_Num>
        <_Title>제목</_Title>
        <_Name>작성자</_Name>
        <_Time>작성일</_Time>
        <_Views>조회</_Views>
        <_Likes>좋아요</_Likes>
        </_ListHead>
        <_ListBody>
        <_Item>
            <_Num>1</_Num>
            <_Title>오늘의 일기</_Title>
            <_Name>박상규</_Name>
            <_Time>2024.02.02</_Time>
            <_Views>0</_Views>
            <_Likes>0</_Likes>
        </_Item>
        {
            postsData.map((data:any) => {
                console.log(data)
                return(
                    <_Item className='list-item' key={data.id}>
                        <_Num>{data.id}</_Num>
                        <_Title>
                        <Link to={`/communitydetail/${data.id}`}>
                            <div>{data.title}</div>
                        </Link>
                        </_Title>
                        <_Name>{data.author}</_Name>
                        <_Time>{data.date}</_Time>
                        {/* <_Time>2024.02.02</_Time> */}
                        <_Views>{data.views}</_Views>
                        <_Likes>{data.likes}</_Likes>
                    </_Item>
            )
        })}
        </_ListBody>
        {/* <_WriteBtn onClick={()=>navigate('/communitywrite')}>글 작성</_WriteBtn> */}
        </_BoardList>
        </_BoardListWrap>
        </_GlobalWrap>
        </>
        );
};

export default Community;
const _GlobalWrap = styled.div`
    margin: 0;
    padding: 0;
`
const _BoardTitle = styled.div`
    font-size: 3rem;
    font-weight: 600;
`
const _BoardListWrap = styled.div`
    padding: 200px 350px 0px 350px;
`
const _BoardList = styled.div`
    /* margin: 0;
    padding: 0;

    width: 1000px;
    margin: 100px auto; */
    //margin-top: 5px;
`
const _ListHead = styled.div`
    > div {
        display: inline-block;
        //background-color: yellow;
        text-align: center;
        font-size: 14px;
        font-weight: 600;
    }
    font-size: 0px;

    padding: 10px 0;
    border-top: 2px solid #000;
    border-bottom: 1px solid #ccc;
`
const _ListBody = styled.div`
`
const _Item = styled.div`
    > div {
        display: inline-block;
        //background-color: yellow;
        font-size: 14px;
    }
    font-size: 0px;

    padding: 10px 0;
    border-bottom: 1px solid #ccc;
`
const _Num = styled.div`
    text-align: center;
    width: 10%;
`
const _Title = styled.div`
    :hover {
        text-decoration: underline;
    }
    > Link {
        text-decoration: none;
    }
    text-align: left;
    width: 40%;
    
`
const _Name = styled.div`
    text-align: center;
    width: 10%;
    
`
const _Time = styled.div`
    text-align: center;
    width: 20%;
    
`
const _Views = styled.div`
    text-align: center;
    width: 10%;
`
const _Likes = styled.div`
    text-align: center;
    width: 10%;
`
const _WriteBtn = styled.button`
    
`