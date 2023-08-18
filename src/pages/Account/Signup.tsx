import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  _Wrap,
  _FormWrap,
  _Subtitle,
  _TeamName,
  _TeamNameColor,
  _Label,
  _Input,
  _InputWrap,
  _SignUpBtn,
  _SignUpBtnWrap,
  _Logo,
  _Logowrap,
  Namewrap,
  Nameinput,
} from "./SignupStyle";

const Signup = () => {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [number, setNumber] = useState("");
  const [firstname, setfirstName] = useState("");
  const [lastname, setlastName] = useState("");
  const [form, setform]: any = useState('');
  const [tel, setTel] = useState("");
  const [isInputVisible, setIsInputVisible] = useState(true);
  const [email, setemail] = useState("");
  const [error, setError] = useState('');
  let navigate = useNavigate();
  const [color1, setJobColor1] = useState("#1E00D3");
  const [color2, setJobColor2] = useState("#B7B7B7");

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