import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Menubar from '../../components/Menubar';
import axiosInstance from '../../api/API_Server';
import { useNavigate, Link} from "react-router-dom";

const Profile = () => {
    let navigate = useNavigate();

    return (
        <div>
            <Menubar/>
            <Wrap>
            <ProfileImg>정</ProfileImg>
            <Name>정채윤</Name>
            <Email>steve328@naver.com</Email>
            <EditProfileBtn onClick={()=>navigate('/edit')}>프로필 수정</EditProfileBtn>
            </Wrap>
        </div>
    );
};

export default Profile;


const Wrap = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`
const ProfileImg = styled.div`
    width: 150px;
    height: 150px;
    border-radius: 50%;
    background-color: #cfcfcf;
    margin-top: 90px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 65px;
    font-weight: 500;
`

const Name = styled.div`
    font-size: 40px;
    font-weight: bold;
    margin-top: 15px;
`

const Email = styled.div`
    font-size: 16px;
    margin-top: 8px;
    color: #999;
`

const EditProfileBtn = styled.button`
    border: none;
    background-color: #c1c1c1;
    width: 110px;
    height: 50px;
    border-radius: 50px;
    font-size: 16px;
    font-weight: bold;
    margin-top: 20px;
    cursor: pointer;
`
