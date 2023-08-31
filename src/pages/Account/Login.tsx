import React, { useState, useEffect } from 'react';
import styled,{keyframes} from 'styled-components';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

const UserLogin = () => {
    const [inputId, setInputId] = useState('')
    const [inputPw, setInputPw] = useState('')
    const [job, setjob] = useState('student')
    const [form, setform] : any = useState('')
    // const [Loding, setLoding] = useState(false)
    const [passwordType,setPasswordType] = useState({
        type:'password',
        visible:false
    })

    const handlePasswordType = (e:any) => {
        setPasswordType(()=>{
            if(!passwordType.visible) {
                return {type: 'text', visible:true};
            }
            return {type:'password',visible:false};
        })
    }
    // input data 의 변화가 있을 때마다 value 값을 변경해서 useState 해준다
    const handleInputId = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setInputId(e.target.value)
    }

    const handleInputPw = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setInputPw(e.target.value)
    }

    let navigate = useNavigate();
    const [color1, setColor1] = useState('#1E00D3');
    const [color2, setColor2] = useState('#B7B7B7');

    const handleClick1 = () => {
        setColor1(color1 === '#B7B7B7' ? '#1E00D3' : '#1E00D3');
        setColor2(color2 === '#1E00D3' ? '#B7B7B7' : '#B7B7B7');
        setjob("student");
    };
    
    const handleClick2 = () => {
        setColor2(color2 === '#B7B7B7' ? '#1E00D3' : '#1E00D3');
        setColor1(color1 === '#1E00D3' ? '#B7B7B7' : '#B7B7B7');
        setjob("teacher");
    };
        
    return (
        <div>
            <form onSubmit={(event: any) => {
                event.preventDefault();
                setform({
                    email : inputId,
                    password : inputPw,
                    job : job
                    //Rhcbrjfnfmfskffu
                });

                axios.post("https://www.zena.co.kr/api/login", {
                    accountID : inputId,
                    password : inputPw,
                    job : job
                })
                    .then((res: {
                        data: any; status: number; 
                    }) => {
                        sessionStorage.setItem('userId', res.data.id);
                        sessionStorage.setItem('job', res.data.job);
                        sessionStorage.setItem('name', res.data.firstname + res.data.lastName);
                        sessionStorage.setItem('phoneNum', res.data.phoneNumber);
                        sessionStorage.setItem('studentID', res.data.studentID);
                        sessionStorage.setItem('email', res.data.email);
                        if (res.status == 200) {
                            navigate("/")
                            alert(res.data.message)
                            if(res.data.job === 'student') {
                                navigate("/home")
                            }
                            else if(res.data.job === "teacher") {
                                navigate("/rentallist")
                            }
                        } else if (res.status == 202) {
                            //경고 => 메시지 res.data.message
                            alert(res.data.message)
                        } else {
                            //예외
                            alert(res.data.message)
                        }
                    })
                    .catch((error)=>{
                        console.log(error);
                        alert('로그인 실패');
                    })
                console.log({form})
                }}>

                
            <_Wrapper>

            <_Form>
            {/* <_Logo src='YSIT22.png'></_Logo> */}
                <_Subtitle>안녕하세요!</_Subtitle>
                <_TeamName>
                    <_TeamNameColor>영실커넥트</_TeamNameColor>입니다
                </_TeamName>
                <_BtnWrap>
                    <_Jobbtn type = 'button' style={{ color: color1 }} onClick={handleClick1}>학생</_Jobbtn>
                    <_JobLine/>
                    <_Jobbtn type = 'button' style={{ color: color2 }} onClick={handleClick2}>교사</_Jobbtn>
                </_BtnWrap>
            <_InputWrap>
            <_Label>아이디</_Label>
            <br />
            <_Input
                value={inputId}
                onChange={handleInputId}
                type="text"
                placeholder="아이디를 적어주세요."
            />
        </_InputWrap>
        <_InputWrap>
            <_Label>비밀번호</_Label>
            <br />
            <_Input
                value={inputPw}
                onChange={handleInputPw}
                type={passwordType.type}
                placeholder="비밀번호를 입력해주세요."
                minLength={8}
            />
            <_Logowrap onClick={handlePasswordType}>
                {passwordType.visible ? <_Logo src='/icon/eye1.svg'></_Logo> : <_Logo src='/icon/eye2.svg'></_Logo>}
            </_Logowrap>
        </_InputWrap>
            <_Submitbtn type='submit'>
                로그인 하기
            </_Submitbtn>
            
            <_FindWrap>
                <_Find onClick={()=>navigate('/find-id')}>아이디 찾기</_Find>
                <_Line/>
                <_Find onClick={()=>navigate('/find-pw')}>비밀번호 찾기</_Find>
                <_Line/>
                <_Find onClick={()=>navigate('/signup-form')}>회원가입</_Find>
            </_FindWrap>
            </_Form>
            </_Wrapper>
            </form>
        </div>
    );
};

export default UserLogin;

const _Logo = styled.img`
    width: 20px;
    height: 20px;
`;

const flow = keyframes`
0% {
    background-position: 0 0;
}
100% {
    background-position: 100% 0;
}
`;

const _Wrapper = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;

    background: linear-gradient(to right bottom, #9786ff, #2805fc);
    animation: ${flow} 30s linear infinite;

    @media (max-width: 600px) {
        height: 73vh;
    }
`;

const _TeamName = styled.div`
font-size: 32px;
text-align: center;

margin-top: 10px;

font-weight: bold;
`;

const _TeamNameColor = styled.span`
color: #1e00d3;
`;

const _BtnWrap = styled.div`
padding: 5px 20px 5px 20px;
margin: 0px 50px 0px 50px;

display: flex;
align-items: center;

@media (max-width: 600px) {
    margin: 0px 20px 0px 20px;
}
`;

const _Form = styled.div`
    background-color: #ffffff;
    border-radius: 15px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 500px;
    height: 530px;
    margin: 0 auto;

    box-shadow: 8px 8px 15px 5px rgba(0, 0, 0, 0.25);

    > label {
    :first-of-type {
        margin-top: 20px;
    }
        margin-top: 20px;
    }
    > button {
        margin-top: 26px;
    }

    @media (max-width: 600px) {
        width: 100vw;
        height: 100vh;
        border-radius: 0;
        box-shadow: none;
    }
`;

const _Jobbtn = styled.button`
    margin: 0px 30px 0px 30px;
    width: 200px;
    height: 47px;

    color: #b7b7b7;

    font-size: 20px;
    font-weight: bold;
    font-family: sans-serif;

    background: none;
    border: none;
    cursor: pointer;
    
    @media (max-width: 600px) {
        margin: 0px 10px 0px 10px;
    }
`;

const _JobLine = styled.span`
    width: 1px;
    height: 20px;

    background-color: gray;
`

const _Line = styled.span`
    width: 1px;
    height: 15px;

    background-color: rgb(174, 174, 174);
`;

const _Subtitle = styled.div`
    font-family: 'Noto Sans KR';
    font-size: 25px;
    text-align: center;
    margin: 0;
    margin-top: 20px;

    font-weight: bold;
`

const _FindWrap = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    //margin: 0 auto;
    
    margin-top: 30px;
    margin-left: 35px;
    margin-right: 35px;
`;

const _Find = styled.button`
    width: 160px;
    height: 47px;
    background: none;
    color: #666666;
    border: none;
    cursor: pointer;
    font-family: 'Noto Sans';
    font-style: normal;
    font-size: 15px;
    font-weight: bold;
    @media (max-width: 600px) {
        font-size: 13px;
    }
`;

const _Label = styled.label`
font-size: 13px;

margin-left: 5px;
font-weight: bold;
`;

const _Input = styled.input`
width: 365px;
height: 50px;
margin-top: 3px;
font-weight: bold;
border: 1px solid #e5e5e5;
:focus {
    border: 1.8px solid blue;
}
border-radius: 12px;
padding-left: 10px;

border-color: gray;
outline: none;

@media (max-width: 600px) {
        width: 88vw;
    }
`;

const _InputWrap = styled.div`
margin: 0 auto;
margin-top: 10px;
`;

const _Logowrap = styled.div`
    display: flex;
    justify-content: end;
    position: relative;
    z-index: 1;
    bottom: 35px;
    margin-right: 10px;
    width: 10px;
    margin-left: 95%;
`;

const _Submitbtn = styled.button`
    width: 380px;
    height: 56px;
    background-color: #1e00d3;
    border-radius: 12px;
    color: #ffffff;
    font-size: 20px;
    margin: 0 auto;
    font-weight: bold;
    border: none;
    cursor: pointer;
    
    @media (max-width: 600px) {
        width: 92vw;
    }
`