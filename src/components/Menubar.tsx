import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {useNavigate} from 'react-router-dom';
import axiosInstance from '../api/API_Server';


const Menubar = () => {
    let navigate = useNavigate();
    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const [ID, setID] = useState(sessionStorage.getItem('userId'));
    const [job, setjob] = useState(sessionStorage.getItem('job'));
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [name, setname] = useState(sessionStorage.getItem('name'));
    const [email, setemail] = useState(sessionStorage.getItem('email'));

    const Logout = () => {
        sessionStorage.removeItem('userId');
        navigate('/')
        window.location.reload();
    }
    
    useEffect(() => {
    if (ID) {
        axiosInstance
        .post("/profile", { id: ID, job: job })
        .then((res) => {
            console.log(res.data);
            sessionStorage.setItem('name', res.data.firstName + res.data.lastName);
            sessionStorage.setItem('phoneNum', res.data.phoneNumber);
            sessionStorage.setItem('studentID', res.data.studentID);
            sessionStorage.setItem('email', res.data.email);
        })
        .catch((error) => console.log(error));
    }
    }, [ID, job]);

    if (ID) {
        if(job == "student") {
            return (
                <>
                <Navbar>
                <Logo src="/icon/YSlogo.png" alt="logo" onClick={() => navigate('/home')} />
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
                        <Name onClick={() => setIsModalVisible(!isModalVisible)}>{name+"님"}<img src='/icon/Down.svg' style={{ width: '20px', height: '20px' }}></img></Name>
                    </Namewrap>
                    {isModalVisible && (
                        <ModalContent>
                        <ProfileHeader>
                            <_modalname>{name}</_modalname>
                            <Email>{email}</Email>
                        </ProfileHeader>
                        <ButtonWrapper>

                            <IconBtn_wrap>
                            <IconButton onClick={() => navigate('/edit')}>
                                <Icon src='/icon/user.svg'></Icon>
                            </IconButton>
                            <ButtonText>프로필 수정</ButtonText>
                            </IconBtn_wrap>

                            {/* <IconBtn_wrap>
                            <IconButton>
                                <Icon src='/moon.svg'></Icon>
                            </IconButton>
                            <ButtonText>다크모드</ButtonText>
                            </IconBtn_wrap> */}

                            <IconBtn_wrap>
                            <IconButton onClick={Logout}>
                                <Icon src='/icon/signout.svg'></Icon>
                            </IconButton>
                            <ButtonText>로그아웃</ButtonText>
                            </IconBtn_wrap>

                        </ButtonWrapper>
                        </ModalContent>
            )}
                </Menu>
                </Navbar>
                </>
            );
        }else {
            return (
                <>
                <Navbar>
                <Logo src="/icon/YSlogo.png" alt="logo" onClick={() => navigate('/rentallist')} />
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
                        <Name onClick={() => setIsModalVisible(!isModalVisible)}>{name+"님"}</Name>
                        <Logoutbtn onClick={Logout}>로그아웃</Logoutbtn>
                    </Namewrap>
                    
                </Menu>
                </Navbar>
                </>
            );
        };
    } else {
    return (
        <>
        <Navbar>
        <Logo src="/icon/YSlogo.png" alt="logo" onClick={() => navigate('/')} />
        <Menu>
            <LoginButton onClick={()=>navigate('/login')}>로그인</LoginButton>
        </Menu>
        </Navbar>
        </>
    );
    }
};


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
    z-index: 2;
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
    
    const LoginButton = styled.button`
    /* background-color: #0077cc; */
    background-color: #1E00D3;
    color: #fff;
    padding: 0.5rem 0.7rem;
    border-radius: 0.3rem;
    margin-right : 4.5rem;
    font-size: 0.9rem;
    font-weight: bold;
    border-style: none;
    cursor: pointer;
    @media (max-width: 600px) {
        margin-right: 60px;
    }
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
    margin-right: 35px;
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

// const ModalWrapper = styled.div`
//     position: fixed;
//     top: 0;
//     left: 0;
//     margin-top: 70px;
//     /* margin-left: 50px; */
//     border-radius: 3px;
//     margin-left: 80%;
//     z-index: 2;
//     background-color: white;
//     width: 150px;
//     height: 117px;
//     box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.5);
// `

// const ModalContent = styled.div`
//     padding: 8px;
//     :hover {
//         color: #ffffff;
//         background-color: #afafaf;
//     }
// `;


const ModalContent = styled.div`
background: linear-gradient(to right, #6a11cb, #2575fc);
position: fixed;
top: 0;
right: 0;
margin-top: 70px;
/* margin-left: 50px; */
margin-right: 50px;
border-radius: 10px;
z-index: 2;
background-color: white;
width: 300px;
height: 145px;
padding: 20px;
@media (max-width: 600px) {
    margin-right: 25px;
    width: 220px;
    height: 125px;
}
`;

const ProfileHeader = styled.div`
display: flex;
flex-direction: column;
align-items: center;
margin-bottom: 20px;
`;

const _modalname = styled.div`
    font-size: 18px;
    font-weight: bold;
    color: #fff;
    @media (max-width: 600px) {
        font-size: 16px;
    }
`

const Email = styled.p`
    margin: 5px 0 0;
    font-size: 14px;
    color: #fff;
    @media (max-width: 600px) {
        font-size: 13px;
    }
    `;

const ButtonWrapper = styled.div`
display: flex;
justify-content: center;
`;

const IconBtn_wrap = styled.div`
    display: flex;
    flex-direction: column;
`

const IconButton = styled.button`
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 8px;
    margin-left: 20px;
    margin-right: 20px;
    border: none;
    border-radius: 50px;
    background-color: #fff;
    cursor: pointer;
    @media (max-width: 600px) {
        width: 45px;
        height: 45px;
    }
`;

const Icon = styled.img`
    width: 20px;
    height: 20px;
    padding: 8px;
`

const ButtonText = styled.span`
font-size: 14px;
color: #fff;
text-align: center;
font-weight: bold;
`;
