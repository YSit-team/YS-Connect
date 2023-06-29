import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {useNavigate} from 'react-router-dom';
import axiosInstance from '../api/API_Server';


const ResponsiveNavbar = () => {
    let navigate = useNavigate();
    const [ID, setID] = useState(sessionStorage.getItem('userId'));
    const [job, setjob] = useState(sessionStorage.getItem('job'));
    const [name, setname] = useState("");

    const Logout = () => {
        sessionStorage.removeItem('userId');
        navigate('/')
        window.location.reload();
    }
    useEffect(() => {
    if (ID) {
        axiosInstance
        .post("/profile", { id: ID, job: job })
        .then((response) => {
            console.log(response.data);
            setname(response.data.firstName+response.data.lastName)
        })
        .catch((error) => console.log(error));
    }
    }, [ID, job]);

    if (ID) {
        if(job == "student") {
            return (
                <Navbar>
                <Logo src="/YSIT-logo.png" alt="logo" onClick={() => navigate('/home')} />
                <Menu>
                    <MenuItemWrapper>
                    <MenuItem onClick={() => navigate('/rental')}>
                        <_Link>대여 신청하기</_Link>
                    </MenuItem>
                    <MenuItem onClick={() => navigate('/status')}>
                        <_Link>기자재 신청현황</_Link>
                    </MenuItem>
                    <MenuItem onClick={() => navigate('/community')}>
                        <_Link>게시판</_Link>
                    </MenuItem>
                    <MenuItem onClick={() => navigate('/Room_S')}>
                        <_Link>방음부스</_Link>
                    </MenuItem>
                    {/* <MenuItem onClick={() => navigate('/add-camera')}>
                        <_Link>기자재 추가하기</_Link>
                    </MenuItem> */}
                    </MenuItemWrapper>
                    <Namewrap>
                        <Name>{name+"님"}</Name>
                        <Logoutbtn onClick={Logout}>로그아웃</Logoutbtn>
                    </Namewrap>
                </Menu>
                </Navbar>
            );
        }else {
            return (
                <Navbar>
                <Logo src="/YSIT-logo.png" alt="logo" onClick={() => navigate('/rentallist')} />
                <Menu>
                    <MenuItemWrapper>
                    <MenuItem onClick={() => navigate('/rentallist')}>
                        <_Link>기자재 신청내역</_Link>
                    </MenuItem>
                    <MenuItem onClick={() => navigate('/Room_T')}>
                        <_Link>방음부스</_Link>
                    </MenuItem>
                    {/* <MenuItem onClick={() => navigate('/add-camera')}>
                        <_Link>기자재 추가하기</_Link>
                    </MenuItem> */}
                    </MenuItemWrapper>
                    <Namewrap>
                        <Name>{name+"님"}</Name>
                        <Logoutbtn onClick={Logout}>로그아웃</Logoutbtn>
                    </Namewrap>
                    
                </Menu>
                </Navbar>
            );
        };
    } else {
    return (
        <Navbar>
        <Logo src="/YSIT-logo.png" alt="logo" onClick={() => navigate('/')} />
        <Menu>
            <MenuItemWrapper>
            
            </MenuItemWrapper>
            <LoginButton onClick={()=>navigate('/login')}>로그인</LoginButton>
        </Menu>
        </Navbar>
    );
    }
};


export default ResponsiveNavbar;

    const Navbar = styled.nav`
    position: fixed;
    top: 0;
    width: 100%;
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: center;
    padding: 10px;
    background-color: #fff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    `;
    
    const Logo = styled.img`
        width: 45px;
        height: 45px;
        cursor: pointer;
    `;
    
    const Menu = styled.div`
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        
    `;
    
    const MenuItemWrapper = styled.div`
    display: flex;
    align-items: center;
    margin-left: 10px;
    overflow-x: scroll;
    overflow-y: hidden;
    white-space: nowrap;
    `;
    
    const MenuItem = styled.li`
    margin-left: 1rem;
    margin-right: 1rem;
    font-size: 0.9rem;
    font-weight: bold;
    color: #333;
    @media (max-width: 600px) {
        font-size: 0.7rem;
        margin-right: 0;
    }
    `;

    const _Link = styled.span`
    color: #555555;
    text-decoration: none;
    cursor: pointer;
    &:hover {
        color: #1E00D3;
        padding-bottom: 18px;
    }
`;
    
    const LoginButton = styled.button`
    /* background-color: #0077cc; */
    background-color: #1E00D3;
    color: #fff;
    padding: 0.5rem 0.7rem;
    border-radius: 0.3rem;
    margin-right : 2rem;
    font-size: 0.9rem;
    font-weight: bold;
    border-style: none;
    cursor: pointer;
`;

const Logoutbtn = styled.span`
    background-color: #6f6f6f;
    color: #fff;
    padding: 0.2rem 0.7rem;
    border-radius: 10px;
    font-size: 0.9rem;
    font-weight: bold;
    border-style: none;
    cursor: pointer;
`

const Namewrap = styled.div`
    display: flex;
    width: 150px;
    align-items: center;
    justify-content: space-around;
    margin-right: 15px;

`

const Name = styled.span`
    font-size: 0.9rem;
    font-weight: bold;
    color: #333;
    @media (max-width: 600px) {
        font-size: 0.7rem;
    }
`