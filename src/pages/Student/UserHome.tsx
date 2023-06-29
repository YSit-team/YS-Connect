import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Menubar from '../../components/Menubar';
import {useNavigate} from 'react-router-dom';
import axiosInstance from '../../api/API_Server';
import Channeltalk from '../../api/Channeltalk';

const Detailsvg = () => {
return (
    <svg width="20" height="20" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M19.6514 13.6543C19.6426 13.3467 19.5283 13.083 19.291 12.8457L12.4531 6.15723C12.251 5.96387 12.0137 5.8584 11.7236 5.8584C11.1348 5.8584 10.6777 6.31543 10.6777 6.9043C10.6777 7.18555 10.792 7.44922 10.9941 7.65137L17.1465 13.6543L10.9941 19.6572C10.792 19.8594 10.6777 20.1143 10.6777 20.4043C10.6777 20.9932 11.1348 21.4502 11.7236 21.4502C12.0049 21.4502 12.251 21.3447 12.4531 21.1514L19.291 14.4541C19.5371 14.2256 19.6514 13.9619 19.6514 13.6543Z" fill="#777777"/>
    </svg>
)
}

const Home = () => {
    let navigate = useNavigate();
    const [meal, setmeal] = useState("");
    const [phonenum, setphonenum] = useState("");
    const [Name, setName] = useState("");
    const [email, setemail] = useState("");
    const [studentID, setstudentID] = useState("");
    const [ID, setID] = useState(sessionStorage.getItem('userId'));
    const [job, setjob] = useState(sessionStorage.getItem('job'));

    useEffect(() => {
        if (ID) {
            axiosInstance
            .post("/profile", { id: ID, job: job })
            .then((response) => {
                console.log(response.data);
                setName(response.data.firstName+response.data.lastName)
                setphonenum(response.data.phoneNumber)
                setstudentID(response.data.studentID)
                setemail(response.data.email)
            })
            .catch((error) => console.log(error));
        }
        }, [ID, job]);

    Channeltalk.loadScript();

    Channeltalk.boot({
        "pluginKey": "aac0f50c-39b0-4629-939e-a5bc11441405", // fill your plugin key
        "memberId": ID, // fill user's member id
        "profile": { // fill user's profile
          "name": Name, // fill user's name
          "mobileNumber": phonenum, // fill user's mobile number
          "studentID": studentID, // fill user's landline number
          "email": email, // fill user's landline number
    }});

    useEffect(() => {
        axiosInstance.post("/meal")
            .then(res => {
                setmeal(res.data.lunch);
                console.log(meal);
            })
            .catch(() => {
                alert("Request Failed")
            });
    }, []);

    return (
    <>
    <Menubar/>
    {/* <_Notice>공지사항</_Notice> */}
    <_Itfwrap>
    <_Interface>
        <Headerwrap>
        <Title1>📝 게시판</Title1>
        <Detail onClick={()=>navigate('/community')}>더보기 <Detailsvg/></Detail>
        </Headerwrap>
        <Msgwrap>
        <Nodatamsg>데이터없음</Nodatamsg>
        </Msgwrap>
    </_Interface>
    <_Interface>
        <Headerwrap>
        <Title1>📷 대여/반납</Title1>
        <Detail onClick={()=>navigate('/rental')}>더보기 <Detailsvg/></Detail>
        </Headerwrap>
        <Msgwrap>
        <Nodatamsg>데이터없음</Nodatamsg>
        </Msgwrap>
    </_Interface>
    </_Itfwrap>
    <_Itfwrap>
    <_Interface>
        <Headerwrap>
        <Title1>🍚 급식표</Title1>
        <Detail>더보기 <Detailsvg/></Detail>
        </Headerwrap>
        <Msgwrap>
            {meal !== undefined ? <pre>{meal}</pre> : "데이터를 불러올수없음"}
        </Msgwrap>
    </_Interface>
    <_Interface>
        <Headerwrap>
        <Title1>⏰ 시간표</Title1>
        <Detail>더보기 <Detailsvg/></Detail>
        </Headerwrap>
        <Msgwrap>
        <Nodatamsg>데이터없음</Nodatamsg>
        </Msgwrap>
    </_Interface>
    </_Itfwrap>
    
    </>
    );
};

export default Home;

const _Notice = styled.div`
width: 90vw;
height: 20vh;
margin-top: 80px;
margin-left:5%;

background: #D9D9D9;
border-radius: 20px;
text-align: center;
`

const _Itfwrap = styled.div`
width: 90vw;
height: 400px;
margin-left:5%;
margin-top: 6vw;
display: flex;
justify-content: space-between;

:last-child{
    margin-top: 20px;
}

@media (max-width: 600px) {
        flex-direction: column;
        height: auto;
    }
`

const _Interface = styled.div`
width: 44vw;
height: 400px;
margin-top: 13px;
border: 1px solid #999999;
border-radius: 15px;

@media (max-width: 600px) {
        width: 90vw;
    }
`

const Headerwrap = styled.div`
display: flex;
justify-content: space-between;
flex-direction: row;
align-items: center;
margin: 10px;
padding-bottom: 10px;
border-bottom: 1px dashed #999999;
`
//게시판홈
const Title1 = styled.div`
font-size: 1.3rem;
font-weight: 500;
`

const Detail = styled.div`
font-size: 1rem;
border: none;
background:none;
cursor: pointer;
color: #777777;
display: flex;
flex-direction: row;
`

const Msgwrap = styled.div`
display: flex;
justify-content: center;
align-items: center;
width: 100%;
height: 70%;
`

const Nodatamsg = styled.div`
font-size: 16px;
`
