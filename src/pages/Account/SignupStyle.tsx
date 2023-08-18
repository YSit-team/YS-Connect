import styled from "styled-components";

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

export {
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
};