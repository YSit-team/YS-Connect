import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Menubar from '../../components/Menubar';
import axiosInstance from '../../api/API_Server';
import { useNavigate, Link} from "react-router-dom";

const RentalStatus = () => {
    const [rentaldata, setrentaldata] = useState([]);

    const [saveRentalMessage, setSaveRentalMessage] = useState('현재 요청이 없어요.')
    const [saveRentalInfo, setSaveRentalInfo] = useState([]);
    const [job, setjob] = useState(sessionStorage.getItem('job'));

    // useEffect(() => {
    //     axiosInstance.post("/EquipmentRental/RentalInquiry")
    //         .then(res => {
    //         setrentaldata(res.data.data);
    //         console.log(res.data);
    //         })
    //         .catch(() => {
    //         alert("요청 실패");
    //         });
    //     }, []);
    const rentalInquiry = async() => {
        axiosInstance.post('/RoomRental/RentalInquiry')
            .then((res) => {
                if (res.data.type === 2) {
                    console.log(res.data)
                    setSaveRentalInfo(res.data.data);
            }
        }).catch((error) => {
            console.log('RentalInquiry API | ', error)
        })
    }
    useEffect(()=>{
        rentalInquiry();
    },[]);
    return (
        <>
            {job === 'teacher' &&
                <>

                    <Menubar/>
                    <Bar>신청내역</Bar>
                    <_Graybar>
                        <div>학번</div>
                        <div>이름</div>
                        <div>날짜</div>
                    </_Graybar>
                    {saveRentalInfo.map((item:any) => (
                        <_Link key={item.id} to={`/roomdetail/${item.index}`}>
                            <Listwrap>
                                <_List>{item.studentID}</_List>
                                <_List>{item.first_name+item.last_name}</_List>
                                <_List>{item.date.substr(2, 8)}</_List>
                            </Listwrap>
                        </_Link>
                    ))}
                </>
            }
        </>
    )
};

export default RentalStatus;

const Bar = styled.div`
    width: 100vw;
    height: 50px;
    margin-top: 69px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    font-weight: bold;
    /* border-bottom: 0.8px solid #999999; */
`
const _Graybar = styled.div`
    background: #5038ff;
    color: #fff;
    width: 100vw;
    height: 30px;
    /* border-top: 1.5px solid gray; */
    display: flex;
    justify-content: space-between;
    align-items: center;
    >div{
        font-weight: 600;
        width: 130px;
        text-align: center;
    }
`

const Listwrap = styled.ul`
    display: flex;
    justify-content: space-between;
    padding-top: 15px;
    padding-bottom: 15px;
    border-bottom: 0.8px solid #999999;
    cursor: pointer;
`

const _List = styled.li`
    font-weight: 400;
    width: 130px;
    text-align: center;
`

const _Link = styled(Link)`
    text-decoration: none;
    color: inherit;
`