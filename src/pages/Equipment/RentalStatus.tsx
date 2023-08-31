import React, { useState, useEffect } from "react";
import axiosInstance from '../../api/API_Server'; // Replace with your axios instance
import styled from "styled-components";
import { Link } from "react-router-dom";
import Menubar from '../../components/Menubar'

interface RentalDataItem {
created_at: any;
id: number;
index: number;
type: number;
}

const RentalStatus: React.FC = () => {
const [rentalData, setRentalData] = useState<RentalDataItem[]>([]);
const [type, setType] = useState<number>(0);
const [ID, setID] = useState<string | null>(sessionStorage.getItem('userId'));


useEffect(() => {
    axiosInstance
    .post("/EquipmentRental/RentalInquiry")
    .then((res) => {
        setRentalData(res.data.data);
        setType(res.data.data.type);
        console.log(res.data);
    })
    .catch(() => {
        alert("요청 실패");
    });
}, []);

const getStatusLabelColor = (type: number): string => {
    if (type === 2 || type === 4) {
      return "#999999"; // Gray color for 대기중
    } else if (type === 3) {
      return "#00b815"; // Green color for 수락됨
    } else {
      return ""; // Default color
    }
};

console.log(ID)
return (
    <>
    <Menubar/>
    <Bar>신청내역</Bar>
    {rentalData.filter((item) => ID !== null && item.id.toString() === ID).map((item) => (
        <div key={item.id}>
    <_Graybar>
        <div>날짜</div>
        <div>내용</div>
        <div>상태</div>
        {item.type === 2 ? "" : item.type === 3 ? <div>{"버튼"}</div> : ""}
    </_Graybar>
        <_Link key={item.id} to={``}>
        <Listwrap key={item.id}>
        <_List>{item.created_at.substring(5, 16).replace(/-/g, '/').replace(/T/g, ' ')}</_List>
        <_List>{item.type === 2 || item.type === 3 ? "기자재대여신청" : item.type === 4 ? "기자재반납신청" : ""}</_List>
        <Statuswrap>
            <_Liststatus style={{ color: getStatusLabelColor(item.type) }}>
            <Dot style={{ backgroundColor: getStatusLabelColor(item.type) }}/>
            {item.type === 2 || item.type === 4? "대기중" : item.type === 3 ? "수락됨" : ""}
            </_Liststatus>
        </Statuswrap>
        {item.type === 2||item.type === 4 ? "" : item.type === 3 ? (<_returnwrap><_returnbtn
        onClick={()=>{
            axiosInstance.post('/v1/EquipmentRental/RentalStop', {
                id: ID,
            })
            .then(response => {
                alert("반납신청이 완료되었습니다.");
            })
            .catch(error => {
                console.error(error);
                alert("에러");
            });
        }}
        >{"반납하기"}</_returnbtn></_returnwrap>) : ("")}
        </Listwrap>
        </_Link>
        </div>
    ))}
    </>
);
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
    width: 100%;
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

const Statuswrap = styled.ul`
width: 130px;
z-index: -1;
`;

const Dot = styled.span`
    position: absolute;
    left: 1.8em;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 6px;
    height: 6px;
    background-color: #00b815;
    border-radius: 50%;
`;

const _Liststatus = styled.li`
    list-style-type: none;
    text-align: center;
    color: #00b815;
    position: relative;
`;

const _Link = styled(Link)`
    text-decoration: none;
    color: inherit;
`
const _returnwrap = styled.div`
    width: 130px;
    display: flex;
    justify-content: center;
`
const _returnbtn = styled.span`
    background-color: #6f6f6f;
    color: #fff;
    padding: 0.2rem 0.7rem;
    border-radius: 10px;
    font-size: 0.9rem;
    font-weight: bold;
    border-style: none;
    cursor: pointer;
`