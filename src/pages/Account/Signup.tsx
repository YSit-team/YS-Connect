import styled from "styled-components";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [number, setNumber] = useState("");
  const [firstname, setfirstName] = useState("");
  const [lastname, setlastName] = useState("");
  const [form, setform]: any = useState('');
  const [job, setJob] = useState("student");
  const [tel, setTel] = useState("");
  const [isInputVisible, setIsInputVisible] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const [email, setemail] = useState("");
  const [error, setError] = useState('');
  let navigate = useNavigate();
  const [color1, setJobColor1] = useState("#1E00D3");
  const [color2, setJobColor2] = useState("#B7B7B7");

  const handleJobClick1 = () => {
    setJobColor1(color1 === "#B7B7B7" ? "#1E00D3" : "#1E00D3");
    setJobColor2(color2 === "#1E00D3" ? "#B7B7B7" : "#B7B7B7");
    setIsInputVisible(true);
  };

  const handleJobClick2 = () => {
    setJobColor2(color2 === "#B7B7B7" ? "#1E00D3" : "#1E00D3");
    setJobColor1(color1 === "#1E00D3" ? "#B7B7B7" : "#B7B7B7");
    setIsInputVisible(false);
  };

  const handleBlur = () => {
    if (!email.includes('@')) {
      setError('Invalid email format');
    } else {
      setError('');
      // Perform additional logic or submit the form
    }
  };

  const handleChange = (event:any) => {
    setemail(event.target.value);
    setError('');
  };

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

  useEffect(() => {
    if (tel.length === 10) {
      setTel(tel.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3'));
    }
    if (tel.length === 13) {
      setTel(tel.replace(/-/g, '').replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3'));
    }
  }, [tel]);

  return (
    <_Wrap >
      <form
        onSubmit={(event: any) => {
          event.preventDefault();

        axios.post("https://www.zena.co.kr/api/register", {
            // job: job, //학생, 교사
            accountID: id,
            email: email, //이메일아이디
            password: pw, //비밀번호
            phoneNumber: tel, //전화번호
            studentID: number, //학번
            firstName: firstname, //성
            lastName: lastname //이름
          })
          .then((res: {
            data: any; status: number; 
          }) => {
            if (res.status == 200) {
                navigate("/login")
                alert(res.data.message)

            } else if (res.status == 202) {
                //경고 => 메시지 res.data.message
                alert(res.data.message)
            } else {
                //예외
                alert(res.data.message)
            }
        })
        .catch(()=>{alert("로그인 요청 실패")})
        console.log({
          // job: job, //학생, 교사
          accountID: id,
          email: email, //이메일아이디
          password: pw, //비밀번호
          phoneNumber: tel, //전화번호
          studentID: number, //학번
          firstName: firstname, //성
          lastName: lastname //이름
        });
        }}
      >
        <_FormWrap isInputVisible={isInputVisible}>
        <_Subtitle>환영합니다!</_Subtitle>
          <_TeamName>
            <_TeamNameColor>HIYS!</_TeamNameColor>
          </_TeamName>

      {/* -------------------학생,교사 구분 버튼-------------------------- */}

          {/* <_BottonWrap>
            <_JobBtn
              style={{ color: color1 }}
              className="stduent"
              onClick={() => {
                setJob("student");
                console.log(job);
                // isInputVisible==true;
                handleJobClick1();
                }}>
              학생
            </_JobBtn>
            <_Line></_Line>
            <_JobBtn style={{ color: color2 }}
              onClick={() => {
                setJob("teacher");
                console.log(job);
                
                // isInputVisible==true;
                handleJobClick2();
              }}>
              교사
            </_JobBtn>
          </_BottonWrap> */}

      {/* --------------------------------------------------------- */}
      <_InputWrap>
            <_Label>아이디</_Label>
            <_Input
              value={id}
              onChange={(event) => {setId(event.target.value);}}
              type="text"
              placeholder="아이디를 입력해주세요."
            />
          </_InputWrap>
          <_InputWrap>
            <_Label>이메일</_Label>
            <_Input
              value={email}
              onChange={handleChange}
              onBlur={handleBlur}
              type="text"
              placeholder="이메일을 입력해주세요."
            />
            {error && id && <span style={{ color: 'red' }}>{error}</span>}
          </_InputWrap>
          <_InputWrap>
            <_Label>비밀번호</_Label>
            <_Input
              value={pw}
              onChange={(event) => {setPw(event.target.value);}}
              type={passwordType.type}
              placeholder="비밀번호 입력 (최소 8자)"
              minLength={8}
              maxLength={12}
            />
            <_Logowrap onClick={handlePasswordType}>
              {passwordType.visible ? <_Logo src='eye1.svg'></_Logo> : <_Logo src='eye2.svg'></_Logo>}
            </_Logowrap>
          </_InputWrap>
          
          <_InputWrap>
            <_Label>전화번호</_Label>
            <_Input
              value={tel}
              onChange={(event) => {setTel(event.target.value);
                const regex = /^[0-9\b -]{0,13}$/;
                if (regex.test(event.target.value)) {
                  setTel(event.target.value);
                }
              }}
              type="text"
              id="phoneNum" 
              minLength={11}
              maxLength={13}
              placeholder="'-'없이 입력하세요."
            />
          </_InputWrap>
          {isInputVisible && (
          <_InputWrap>
            <_Label>학번</_Label>
            <_Input
              value={number}
              onChange={(event) => {setNumber(event.target.value);}}
              type="text"
              placeholder="예. 30216"
              minLength={5}
              maxLength={5}
            />
          </_InputWrap>
          )}
          <Namewrap>
          <_InputWrap>
            <_Label>성</_Label>
            <Nameinput
              value={firstname}
              onChange={(event) => {setfirstName(event.target.value);}}
              type="text"
              placeholder="성을 입력해 주세요."
              minLength={0}
              maxLength={2}
            />
          </_InputWrap>
          <_InputWrap>
            <_Label>이름</_Label>
            <Nameinput
              value={lastname}
              onChange={(event) => {setlastName(event.target.value);}}
              type="text"
              placeholder="이름을 입력해 주세요."
              minLength={0}
              maxLength={5}
            />
          </_InputWrap>
          </Namewrap>
          <_SignUpBtnWrap>
            <_SignUpBtn type="submit" onClick={handleBlur}>
              가입하기
            </_SignUpBtn>
          </_SignUpBtnWrap>
        </_FormWrap>
      </form>
    </_Wrap>
  );
};

export default Signup;

const _Wrap = styled.div`
  background: linear-gradient(to right bottom, #9786ff, #2805fc);
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  
  @media (max-width: 600px) {
    background: none;
  }
`;

interface ContainerProps {
  isInputVisible: any;
}

const _FormWrap = styled.div<ContainerProps>`
  display: flex;
  flex-direction: column;

  background-color: #ffffff;
  /* height: ${({ isInputVisible }) => (isInputVisible ? '710px' : '620px')}; */
  height: 750px;
  /* height: (job === "student" ? '690px' : '610px');
  
  if (job === student) {
    height: 690px;
  } else {
    height: 610px;
  } */

  width : 500px;

  box-shadow: 8px 8px 15px 5px rgba(0, 0, 0, 0.25);
  border-radius: 15px;

  @media (max-width: 600px) {
    box-shadow: none;
    width: 100vw;
  }
`;

const _Subtitle = styled.div`
    font-family: 'Noto Sans KR';
    font-size: 25px;
    text-align: center;
    margin: 0;
    margin-top: 20px;
    font-weight: bold;
`

const _TeamName = styled.div`
  font-size: 32px;
  text-align: center;

  margin-top: 10px;

  font-weight: bold;
`;

const _TeamNameColor = styled.span`
  color: #1e00d3;
`;

const _Label = styled.label`
  font-size: 13px;

  margin-left: 5px;
  font-weight: bold;
`;

const _Input = styled.input`
  width: 400px;
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
    width: 85vw;
  }
`;

const _InputWrap = styled.div`
  margin: 0 auto;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
`;

const _SignUpBtn = styled.button`
  width: 412px;
  height: 60px;
  font-size: 20px;

  background: #1e00d3;
  border: 0px solid #e5e5e5;
  border-radius: 12px;
  font-weight: bold;

  color: white;
  cursor: pointer;

  @media (max-width: 600px) {
    width: 90vw;
    margin-bottom: 10px;
  }
`;

const _SignUpBtnWrap = styled.div`
  margin-top: 20px;
  
  display: flex;
  justify-content: center;
`;

const _Logo = styled.img`
    width: 20px;
    height: 20px;
`;

const _Logowrap = styled.div`
    display: flex;
    justify-content: end;
    position: relative;
    z-index: 1;
    bottom: 35px;
    margin-right: 10px;
    margin-left: 95%;
    height: 0;

    @media (max-width: 600px) {
      bottom: 38px;
    }
`;

const Namewrap = styled.div`
  display: flex;
  width: 440px;
  margin: 0 auto;

  @media (max-width: 600px) {
    width: auto;
    flex-direction: column;
  }
`

const Nameinput = styled.input`
  width: 180px;
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
    width: 85vw;
  }
`