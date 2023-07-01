import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Menubar from '../../components/Menubar';
import axiosInstance from '../../api/API_Server';
import { useNavigate, Link} from "react-router-dom";
import axios from 'axios';

const EditProfile = () => {
    let navigate = useNavigate();
    const [ID, setID] = useState(sessionStorage.getItem('userId'));
    const [job, setjob] = useState(sessionStorage.getItem('job'));
    const [firstname, setfirstname] = useState("");
    const [lastname, setlastname] = useState("");
    const [phonenum, setphonenum] = useState("");
    const [oldpw, setoldpw] = useState("");
    const [newpw, setnewpw] = useState("");
    const [checkpw, setcheckpw] = useState("");
    const [accountID, setaccountID] = useState("");
    const [email, setemail] = useState("");
    

    useEffect(() => {
        if (ID) {
            axiosInstance
            .post("/profile", { id: ID, job: job })
            .then((response) => {
                console.log(response.data);
                setfirstname(response.data.firstName)
                setlastname(response.data.lastName)
                setphonenum(response.data.phoneNumber)
                setaccountID(response.data.accountID)
                setemail(response.data.email)
            })
            .catch((error) => console.log(error));
        }
    }, [ID, job]);

    const Postform = () => {
        if (newpw == checkpw) {
            axios.post("http://www.zena.co.kr/api/profile", {
                        id: ID,
                        job: job,
                        methodName: 'edit',
                        accountID : accountID,
                        email: email,
                        oldPassword: oldpw,
                        newPassword: newpw,
                        phoneNumber: phonenum,
                        firstname: firstname,
                        lastname: lastname,
                    })
                    .then((res: {
                        data: any; status: number; 
                    }) => {
                        if (res.status == 200) {
                            alert(res.data.message)
                            navigate("/")
    
                        } else if (res.status == 202) {
                            //경고 => 메시지 res.data.message
                            alert(res.data.message)
                        } else {
                            //예외
                            alert(res.data.message)
                        }
                    })
                    .catch(()=>{alert("요청 실패")})
        }
        else {
            alert("비밀번호 확인이 다릅니다");
        }
    }

    return (
        <div>
            <Menubar/>
            <Wrap>
            <Title>내 정보 수정</Title>
            <ProfileWrap>
                <ProfileImg></ProfileImg>
                <Btnwrap>
                    <ProBtn>이미지 선택</ProBtn>
                    <ProBtn>이미지 제거</ProBtn>
                </Btnwrap>
            </ProfileWrap>
                <InputWrap>
                    <InputTitle>현재 비밀번호</InputTitle>
                    <_Input value={oldpw} onChange={(e)=>{setoldpw(e.target.value);}}></_Input>
                </InputWrap>
                <hr/>
                <InputWrap>
                    <InputTitle>아이디</InputTitle>
                    <_Input value={accountID} onChange={(e)=>{setaccountID(e.target.value);}}></_Input>
                </InputWrap>
                <hr/>
                <InputWrap>
                    <InputTitle>이메일 주소</InputTitle>
                    <_Input value={email} onChange={(e)=>{setemail(e.target.value);}}></_Input>
                </InputWrap>
                <hr/>
                <InputWrap>
                    <InputTitle>전화번호</InputTitle>
                    <_Input value={phonenum} onChange={(e)=>{setphonenum(e.target.value);}}></_Input>
                </InputWrap>
                <hr/>
                <InputWrap>
                    <InputTitle>성</InputTitle>
                    <_Input value={firstname} onChange={(e)=>{setfirstname(e.target.value);}}/>
                </InputWrap>
                <hr/>
                <InputWrap>
                    <InputTitle>이름</InputTitle>
                    <_Input value={lastname} onChange={(e)=>{setlastname(e.target.value);}}/>
                </InputWrap>
                <hr/>
                <InputWrap>
                    <InputTitle>새 비밀번호</InputTitle>
                    <_Input value={newpw} onChange={(e)=>{setnewpw(e.target.value);}}></_Input>
                </InputWrap>
                <hr/>
                <InputWrap>
                    <InputTitle>새 비밀번호 확인</InputTitle>
                    <_Input value={checkpw} onChange={(e)=>{setcheckpw(e.target.value);}}></_Input>
                </InputWrap>
                <hr/>
                <CompleteBtn onClick={Postform}>완료</CompleteBtn>
            </Wrap>
        </div>
    );
};

export default EditProfile;

const Wrap = styled.div`
    padding-left: 1rem;
    padding-right: 1rem;
    margin-top: 7rem;
    margin-left: auto;
    margin-right: auto;
    width: 800px;
    padding-bottom: 5rem;
`

const Title = styled.h1`
    display: block;
    font-size: 2.5em;
    margin-block-start: 0.67em;
    margin-block-end: 0.67em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    font-weight: bold;
`

const ProfileWrap = styled.div`
    display: flex;
`

const ProfileImg = styled.div`
    display: block;
    height: 10rem;
    width: 10rem;
    box-shadow: 0 0 8px rgb(0 0 0/9%);
    border-radius: 50%;
    object-fit: cover;
    transition: all .125s ease-in 0s;
    margin: 40px 0;
`

const Btnwrap = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    margin-left: 10px;
`

const ProBtn = styled.button`
    width: 7.5rem;
    height: 2rem;
    font-size: 1rem;
    color: #fff;
    border-radius: 4px;
    background-color: #262626;
    margin: 5px 0 5px 5px;
    padding: 0;
    font-weight: 600;
    outline: none;
    border: none;
    cursor: pointer;
`

const InputWrap = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 20px;
`

const InputTitle = styled.h3`
    display: block;
    font-size: 1.5rem;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 10px;
    margin-inline-end: 0px;
    font-weight: bold;
    width: 20rem;
`

const _Input = styled.input`
    border-radius: 8px;
    border: 1px solid #a1a1a1;
    font-size: large;
    width: 15rem;
    outline: none;
    min-height: 1.3rem;
    padding: 1rem;
    margin-right: 40px;
`

const CompleteBtn = styled.button`
    margin-top: 1.5rem;
    background-color: #262626;
    font-weight: 700;
    color: #fff;
    border-radius: 4px;
    width: 120px;
    margin-right: 10px;
    height: 2.5rem;
    border: none;
    cursor: pointer;
    font-size: 1rem;
`