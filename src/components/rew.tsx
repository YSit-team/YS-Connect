import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {useNavigate} from 'react-router-dom';


const Menubar = () => {
    let navigate = useNavigate();

            return (
                <>
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
                    </MenuItemWrapper>
                    <Namewrap>
                        <Name>정채윤님<img src='/Down.svg' style={{ width: '20px', height: '20px' }}></img></Name>
                    </Namewrap>
                    
                </Menu>
                </Navbar>
                </>
            );
    }


export default Menubar;

    const Navbar = styled.nav`
    position: fixed;
    top: 0;
    width: 100vw;
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
        @media (max-width: 600px) {
            width: 35px;
            height: 35px;
        }
    `;
    
    const Menu = styled.div`
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100vw;
        
    `;
    
    const MenuItemWrapper = styled.div`
    display: flex;
    align-items: center;
    margin-left: 10px;
    overflow-x: scroll;
    overflow-y: hidden;
    white-space: nowrap;
    /* 스크롤바 숨김 스타일 */
    -ms-overflow-style: none; /* IE 및 Edge용 */
    scrollbar-width: none; /* Firefox 용 */

    &::-webkit-scrollbar {
        display: none; /* Chrome, Safari, Opera 용 */
    }
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

const Namewrap = styled.div`
    display: flex;
    width: 150px;
    align-items: center;
    justify-content: space-around;
    margin-right: 15px;
    @media (max-width: 600px) {
        margin-right: 35px;
    }
`

const Name = styled.button`
    display: flex;
    align-items: center;
    border: none;
    background: none;
    font-size: 0.9rem;
    font-weight: bold;
    cursor: pointer;
    color: #333;
    @media (max-width: 600px) {
        font-size: 0.7rem;
    }
    :hover {
        color: #1E00D3;
    }
`
