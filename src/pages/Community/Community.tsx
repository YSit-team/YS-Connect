import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Menubar from '../../components/Menubar';
import { Link } from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import { Ring } from '@uiball/loaders'

const Community = () => {
    let navigate = useNavigate();

    const [postsData, setPostData] = useState([])
    const [page, setPage] = useState(1)
    const [totalpage, setTotalpage] = useState(0)
    const [displayedPages, setDisplayedPages] = useState([]);
    const [currentPageSet, setCurrentPageSet] = useState(1);
    const pagesPerSet = 5;
    const totalSets = Math.ceil(totalpage / pagesPerSet);
    let j = 0;
    //const [j, setj] = useState(0)

    const nextpage = () => {
        if (currentPageSet === totalSets) {
        setPage(totalpage);
        console.log("마지막 페이지 입니다.", page);
        } else {
        setCurrentPageSet((prevSet) => prevSet + 1);
        setPage((prevPage) => prevPage + pagesPerSet);
        }
    };
    
    
    const prevpage = () => {
        if (currentPageSet === 1) {
            setPage(1);
            console.log("마지막 첫 페이지 입니다.", page);
        } else {
            setCurrentPageSet((prevSet) => prevSet - 1);
            setPage((prevPage) => prevPage - pagesPerSet);
        }
    };
    //console.log('currentPageSet',currentPageSet)
    
    
    const btnpages: JSX.Element[][] = [[]]; // btnpages 배열을 빈 배열로 초기화
    
    const renderPaginationButtons = () => {
        for (let i = 1; i <= totalpage; i++) {
        if ((i - 1) % 5 === 0) {
            btnpages[j] = []; // 새로운 배열을 초기화
        }
        btnpages[j].push(
        <a
            key={i}
            onClick={() => setPage(i)}
            className={`num${page === i ? 'active' : i}`}
            
        >
            {i}
        </a>
        );
        
        if (i % 5 === 0 || i === totalpage) { // 페이지 번호가 5의 배수이거나 마지막 페이지일 때 j 값을 증가시킴
            //setj(j+1)
            j++
        }
        }
        console.log(btnpages)

        console.log('영준',)
        //setj(0)
        console.log(j)
        return btnpages[j];
    };
    
    useEffect(() => {
        const handle = async () => {
            const params = {
                page: page,
                limit: 10,
            };
    
            console.log(page);
    
            try {
                const response = await axios.get("https://www.zena.co.kr/api/Community/postInquiry", { params });
                setTotalpage(response.data.totalPages);
                setPostData(response.data.data);
                console.log("api호출 완료");
                console.log(response.data);
            } catch (error) {
                console.log("api호출 안됨...");
                console.log(error);
            }
        };
    
        setPostData([]);
        handle();
    }, [page]);
    
    return (
        <>
            {postsData.length == 0 ?
            <Rodingwrap>
                <Ring 
                size={40}
                lineWeight={5}
                speed={2} 
                color="black" 
                />
            </Rodingwrap>
                :
                <> 
                <_GlobalWrap>
                <Menubar/>
                <_BoardListWrap>
                <_BoardTitle>커뮤니티</_BoardTitle>
                <_BoardList>
                <_ListHead>
                <_Title>제목</_Title>
                <_Name>작성자</_Name>
                <_Time>작성일</_Time>
                <_Views>조회</_Views>
                <_Likes>댓글 수</_Likes>
                </_ListHead>
                <_ListBody>
                {
                    postsData.map((data:any) => {
                        //console.log(data)
                        return(
                            <_Item className='list-item' key={data.id}>
                                <_Title className='item-title'>
                                <Link to={`/communitydetail/${data.id}`}
                                style={{ textDecoration: 'none', color: 'inherit'}}>
                                    <div>{data.title}</div>
                                </Link>
                                </_Title>
                                <_Name>{data.author}</_Name>
                                <_Time>{`${data.date.slice(0, 10)}`}</_Time>
                                <_Views>{data.views}</_Views>
                                <_Likes>{data.commentsCount}</_Likes>
                            </_Item>
                    )
                })}
                </_ListBody>
                <_WriteBtn onClick={()=>navigate('/communitywrite')}>글쓰기</_WriteBtn>
                </_BoardList>
                <_Paging>
                    {/* <button className='first' >처음 페이지</button> */}
                    {currentPageSet == 1 ? null : <PrevBtn className='prev' onClick={prevpage}>이전</PrevBtn>}
                    {/* <button className='num'>{page}</button> */}
                    {renderPaginationButtons()}
                    <Pagination><a className='midnum'>{btnpages[currentPageSet - 1]}</a></Pagination>
                    {btnpages[currentPageSet-1][(btnpages[currentPageSet - 1].length)-1].key == totalpage ? null:<NextBtn className='next' onClick={nextpage}>다음</NextBtn>}
                </_Paging>
                    {/* <div>{page}</div> */}
                </_BoardListWrap>
                </_GlobalWrap>
                </>
            }
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
    margin-bottom: 10px;
`
const _BoardListWrap = styled.div`
    //padding: 100px 350px 0px 350px;
    padding: 100px;
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
        //background-color: yellow;
        display: inline-block;
        font-size: 14px;
    }
    > .item-title {
        :hover {
            text-decoration: underline;
        }
    }
    font-size: 0px;

    padding: 10px 0;
    border-bottom: 1px solid #ccc;
`
// const _Num = styled.div`
//     text-align: center;
//     width: 10%;
// `
const _Title = styled.div`
    text-align: left;
    width: 50%;
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
    border: none;
    background-color: white;
    border: solid 1px gray;

    margin-top: 20px;
    width: 75px;
    height: 35px;

    float: right;
    cursor: pointer;
    :hover {
        text-decoration: underline;
    }

`
const Pagination = styled.span`
    > a > a {
        //style={{marginLeft:"5px", cursor:"pointer"}}
        margin-left: 5px;
        margin-right: 5px;
        cursor: pointer;
    }
    align-items: center;
    justify-content: space-around;
`
const _Paging = styled.div`
    > .midnum {
        //width: 100px;
    }
    align-items: center;
    text-align: center;
    margin-top: 30px;
`

const PrevBtn = styled.a`
    /* display: inline-block;
    vertical-align: middle; */

    margin-right: 15px;

    cursor: pointer;
`
const NextBtn = styled.a`
    margin-left: 15px;
    cursor: pointer;
`

const Rodingwrap = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`