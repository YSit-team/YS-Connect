import React, { useState, useEffect } from 'react';
import { useNavigate, Link} from 'react-router-dom';
import styled from 'styled-components';
import Menubar from '../components/Menubar';

const Notlogin = () => {
    let navigate = useNavigate();
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);

    const handleResize = () => {
        setIsMobile(window.innerWidth <= 600);
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <>
            <HomeImgwrap>
            {isMobile ? <HomeImg src='MobileImg.jpeg'/> : <HomeImg src='HomeImg.png'/>}
                {/* <HomeImg src={isMobile ? 'MobileHome.png' : 'DesktopHome.png'} alt="홈 배경화면" /> */}
                {isMobile ? <>
                        <MobileWrap>
                            <Title>
                            당신 근처의{'\n'}
                            학교 생활 도우미
                            </Title>
                            <StartBtn onClick={()=>navigate('/login')}>시작하기</StartBtn>
                            <Text>계정이 없나요? 여기에서 <Link to='signup-form' style={{color:'#1e00d3'}}>회원가입</Link>하세요!</Text>
                            <Text style={{marginTop:"20px"}}>앱 다운로드하기</Text>

                            <StoreBtnwrap>
                                <StoreBtn href="https://play.google.com/store/apps/details?id=com.sejong.jys&hl=ko-KR">GooglePlay</StoreBtn>
                                <StoreBtn href="https://play.google.com/store/apps/details?id=com.sejong.jys&hl=ko-KR">AppStore</StoreBtn>
                            </StoreBtnwrap>
                        </MobileWrap>

                        
                    </> : ''}
                <Buttonwrap>
                    <Button onClick={()=>navigate('/login')}>로그인</Button>
                    <Button onClick={()=>navigate('/signup-form')}>회원가입</Button>
                </Buttonwrap>
                <Buttonwrap style={{top : "75%"}}>
                    <Storelink href="https://play.google.com/store/apps/details?id=com.sejong.jys&hl=ko-KR">Google Play</Storelink>
                    <Storelink href="https://play.google.com/store/apps/details?id=com.sejong.jys&hl=ko-KR">App Store</Storelink>
                </Buttonwrap>
            </HomeImgwrap>
        </>
    );
}

export default Notlogin;

const HomeImgwrap = styled.div`
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    position: relative;
    

    @media (max-width: 600px) {
        display: flex;
        justify-content: center;
    }
`

const HomeImg = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: left center; /* This will keep the right side of the image centered */
`

const LogoImg = styled.img`
    width: 450px;
    height: 450px;
    position: absolute;
    top: 43%;
    left: 50%;
    transform: translate(-50%, -50%); /* Center the image */
`

const Title = styled.div`
    color: #000000;
    
    white-space: pre-line; /* Allow line breaks */
    font-size: 40px;
    text-align: center;

    font-family: 'BMJUA';
`

const Buttonwrap = styled.div`
    position: absolute;
    top: 65%;
    left: 50;
    margin-left: 140px;
    width: 30vw;
    display: flex;
    justify-content: space-around;
    flex-direction: row;
    align-items: center;

    @media (max-width: 600px) {
        display: none;
    }
`

const Button = styled.span`
    width: 10rem;
    height: 70px;
    border-radius: 50px;
    background-color: #ffffff;
    color: #000000;
    font-size: 20px;
    font-weight: 700;
    box-sizing: border-box;
    text-decoration: none;

    display: flex;
    align-items: center;
    justify-content: center;

    :hover {
        background-color: #f0f0f0;
    }

    @media (max-width: 780px) {
        font-size: 14px;
    }

    @media (max-width: 600px) {
        width: 160px;
        height: 60px;
        font-size: 16px;
        top: 50;
        left: 50;
        margin-left: 0;
    }
`

const Storelink = styled.a`
    text-decoration: none;

    width: 10rem;
    height: 70px;
    margin-top: 10px;
    border-radius: 50px;
    background-color: #ffffff;
    color: #000000;
    font-size: 20px;
    font-weight: 700;
    box-sizing: border-box;
    text-decoration: none;

    display: flex;
    align-items: center;
    justify-content: center;

    :hover {
        background-color: #f0f0f0;
    }

    @media (max-width: 780px) {
        font-size: 14px;
    }

    @media (max-width: 600px) {
        width: 160px;
        height: 60px;
        font-size: 16px;
        top: 50;
        left: 50;
        margin-left: 0;
    }
`

const MobileWrap = styled.div`
    position: absolute;
    top: 55%;

    display: flex;
    justify-content: center;
    flex-direction: column;
`

const StartBtn = styled.span`
    width: 9.5rem;
    height: 50px;
    border-radius: 50px;
    background-color: #1E00D3;
    color: #ffffff;
    font-size: 20px;
    font-weight: 500;
    box-sizing: border-box;
    text-decoration: none;
    margin: 0 auto;
    margin-top: 13px;

    display: flex;
    align-items: center;
    justify-content: center;

    font-family: 'BMJUA';

    :hover {
        background-color: #1c00bc;
    }
`

const StoreBtnwrap = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;

    width: 70vw;
`

const StoreBtn = styled.a`
    width: 7rem;
    height: 40px;
    border-radius: 50px;
    background-color: #ffffff;
    color: #000000;
    font-size: 13px;
    font-weight: 500;
    box-sizing: border-box;
    text-decoration: none;
    margin: 0 auto;

    display: flex;
    align-items: center;
    justify-content: center;

    font-family: 'BMJUA';

    :hover {
        background-color: #e1e1e1;
    }
`

const Text = styled.p`
    text-align: center;
    font-size: 13px;
    font-weight: 100;
    font-family: 'BMJUA';
`