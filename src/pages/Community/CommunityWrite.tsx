import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Menubartest from '../../components/Menubar';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../../api/API_Server';
import Menubar from '../../components/Menubar';

const CommunityWrite = () => {
    // const [id, setId] = useState("");
    // const [name, setName] = useState("");
    let navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [id, setid] = useState(sessionStorage.getItem('userId'));
    const [job, setjob] = useState(sessionStorage.getItem('job'));
    const [name, setName] = useState("");
    //const [form, setform]: any = useState('');
    
    // const [postsData, setPostData] = useState([])
    // const handle = async() => {
    //     axios.post("http://www.zena.co.kr/api/Community/postsWrite",{
    //         id:id, 
    //         name:name, 
    //         title:title, 
    //         content:content
    //     })
    //     .then((res)=>{
    //         if (res.status === 200){
    //             console.log("성공")
    //         }else if(res.status === 202){
    //             console.log("에러")
    //         }else if(res.status === 500){
    //             console.log("서버에러")
    //         }
    //     }
    //         //setPostData(res.data.results)
    //     )
    //     .catch((error)=>(
    //         console.log(error)
    //     ))}
    // useEffect(() => {
    //     handle()
    // }, [])
    useEffect(() => {
        console.log(id);
        if (id) {
            axiosInstance
            .post("/profile", { id: id, job: job })
            .then((response) => {
                console.log(response.data);
                setName(response.data.firstName+response.data.lastName)
            })
            .catch((error) => console.log(error));
        }
        }, [id, job]);

    return (
        <>
        <Menubar/>
        <div>
            <form onSubmit={(event: any) => {
                event.preventDefault();
                axios.post("http://www.zena.co.kr/api/Community/postsWrite",{
                    id:id, 
                    name:name, 
                    title:title, 
                    content:content
                }).then((res)=>{
                    if (res.status == 200){
                        navigate('/community')
                        alert("글 작성 완료")
                        console.log("성공")
                    }else if(res.status == 202){
                        console.log("에러")
                    }else if(res.status == 500){
                        console.log("서버에러")
                    }
                }
                    //setPostData(res.data.results)
                )
                .catch((error)=>(
                    console.log(error)
                ))
            }}>
                <h4>커뮤니티 작성 페이지</h4>
                <input 
                value={title}
                onChange={(event) => {setTitle(event.target.value)}}
                type="text" 
                placeholder='제목을 입력해 주세요.'/>
                <p>
                    <_ContentInput 
                    value={content}
                    onChange={(event) => {setContent(event.target.value)}}
                    type="text" 
                    placeholder='내용을 입력하세요.'/>
                </p>
                <button type='submit'>등록</button>
            </form>
        </div>
      </>
    );
  };

  export default CommunityWrite;

  const _ContentInput = styled.input`
    width: 500px;
    height: 400px;
  `