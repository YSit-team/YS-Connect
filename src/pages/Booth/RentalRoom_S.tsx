import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Menubar from '../../components/Menubar';
import axiosInstance from '../../api/API_Server';
import { useNavigate, Link} from "react-router-dom";
import axios from 'axios';

const RentalRoom_S = () => {

  const [roomdata, setRoomData]: any[] = useState([])

  const [studentID, setStudentID] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [roomNumber, setRoomNumber] = useState('2')
  const [roomUsingStartTime, setRoomUsingStartTime] = useState('')
  const [roomUsingEndTime, setRoomUsingEndTime] = useState('')
  const [roomPurpose, setRoomPurpose] = useState('')

  const test = async() =>{
    await axiosInstance.post('/profile', { id: "a7315506-ded3-42e9-aab6-0c92a70aca2a", job: "student" })
      .then((res) => {
        setFirstName(res.data.firstName)
        setLastName(res.data.lastName)
        setStudentID(res.data.studentID)
        console.log(res.data)

      })

  } 
  const test2 = async() =>{
    console.log(roomUsingStartTime)
    console.log(roomUsingEndTime)
    console.log(roomNumber)
    console.log(roomPurpose)
    await axiosInstance.post('/RoomRental/RentalForm', {
      id: "a7315506-ded3-42e9-aab6-0c92a70aca2a",
      studentID: studentID,
      firstName: firstName,
      lastName: lastName,
      roomNumber: roomNumber,
      purpose: roomPurpose,
      usingStartTime: roomUsingStartTime,
      usingEndTime: roomUsingEndTime,
    }).then((res) => {
      console.log(res.data)
    })

    }
        // const RoomInfo = () => {
        //   axiosInstance.post('/RoomRental/RoomStatus')
        //     .then(res => {
        //       const a = [];
          
        //       if(res.data.room1.is_available === 0){
        //         a.push({id : 1, value : "1번부스" ,disabled : false})
        //       } else{
        //         a.push({id : 1, value : "1번부스" ,disabled : true})
        //       }
        //       if(res.data.room2.is_available === 0){
        //         a.push({id : 2, value : "2번부스" ,disabled : false})
        //       } else{
        //         a.push({id : 2, value : "2번부스" ,disabled : true})
        //       }
        //       if(res.data.room3.is_available === 0){
        //         a.push({id : 3, value : "3번부스" ,disabled : false})
        //       } else{
        //         a.push({id : 3, value : "3번부스" ,disabled : true})
        //       }
        //       if(res.data.room4.is_available === 0){
        //         a.push({id : 4, value : "4번부스" ,disabled : false})
        //       } else{
        //         a.push({id : 4, value : "4번부스" ,disabled : true})
        //       }
          
        //       setRoomData(a);
        //       console.log(roomdata)
        //       console.log(a)
        //     })
        //     .catch(error => {
        //       // 오류 처리
        //       console.log(error);
        //     });
        // }
        
        const RoomInfo = async() => {
          await axiosInstance.post('/RoomRental/RoomStatus')
                .then(res => {
                  const a = [
                  ]
      
                  if(res.data.room1.is_available === 0){
                    a.push({id : 1, value : "1번부스" ,disabled : false})
                  } else{
                    a.push({id : 1, value : "1번부스" ,disabled : true})
                  }
                  if(res.data.room2.is_available === 0){
                    a.push({id : 2, value : "2번부스" ,disabled : false})
                  } else{
                    a.push({id : 2, value : "2번부스" ,disabled : true})
                  }
                  if(res.data.room3.is_available === 0){
                    a.push({id : 3, value : "3번부스" ,disabled : false})
                  } else{
                    a.push({id : 3, value : "3번부스" ,disabled : true})
                  }
                  if(res.data.room4.is_available === 0){
                    a.push({id : 4, value : "4번부스" ,disabled : false})
                  } else{
                    a.push({id : 4, value : "4번부스" ,disabled : true})
                  }
                  const updatedRoomData = [...a];
                  setRoomData(updatedRoomData);
          })
          
        }

    useEffect(()=>{
      RoomInfo();
      test();
    },[])
    return (
      <_Wrap>
        <Menubar/>
      <_Writewrap>
        <_Header>방음부스 신청</_Header>
        <_Listwrap>
        </_Listwrap>


{/*-----------------------------------신청서 작성----------------------------------*/}
        <_Subtext>신청서 작성 <_SubmitBtn type="submit" bg="#1E00D3" color="#ffffff" onClick={test2}>제출하기</_SubmitBtn></_Subtext>
        <_Inputtitle><Label>이름</Label><_Input value={firstName+lastName} disabled/></_Inputtitle>
        <_Inputtitle><Label>학번</Label><_Input value={studentID} disabled/></_Inputtitle>
        <_Inputtitle><Label>방음부스</Label><select name="language">
                <option>방음부스 선택하기</option>
                {
                  roomdata.map((item:any)=>(
                    <option key={item.id}  value={item.id} disabled ={item.disabled}>{item.id} 방음부스</option>
                  ))}
              </select></_Inputtitle>
        <_Inputtitle><Label>대여 시간</Label><_Input type="time"  min="08:40" max="22:00" 
        onChange={(event) =>{
          setRoomUsingStartTime(event.target.value)
        }}/><_Line1/><_Input type="time" min="08:40" max="22:00" 
        onChange={(event) =>{
          setRoomUsingEndTime(event.target.value)
        }}/></_Inputtitle>
        <_Input2title>이용목적 및 이용내역
          <_Input2wrap>
          <_Subinputtitle>※사용 용도, 작품 내용 등을 구체적으로 적어주세요.</_Subinputtitle>
              <_Input2
              onChange={(event) =>{
                setRoomPurpose(event.target.value);
                  }}
              placeholder='-이용목적: (예: 영화콘텐츠 편집, 행사영상 편집)&#13;&#10;
                    - 사용일자:  월  일&#13;&#10;
                      - 장소:&#13;&#10;
                      - 제작내용:'>
              </_Input2>
          </_Input2wrap>

        </_Input2title>
      </_Writewrap>
      {/*---------------------------------------------------------------------*/}
      </_Wrap>
      
    )
  }

export default RentalRoom_S;

//제목
const _Wrap = styled.div`
    margin-top: 70px;
    display: grid;
    grid-template-columns: 1fr 3fr 1fr;
    grid-template-areas:
        "header header header"
        "sbmenu list ."
        ". write ."
        ". btn .";
    padding-bottom: 30px;
`
const _Writewrap = styled.form`
    width: 100%;
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    grid-area: write;
    @media (max-width: 600px) {
        width: 85vw;
    }
`
const _Listwrap = styled.div`
    width: 100%;
    grid-area: list;
    margin-top: 20px;
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
`
const _Input2wrap = styled.div`
    display: flex;
    flex-direction: column;
`
const _Header = styled.header`
    width: 100%;
    margin-top: 30px;
    font-size: 28px;
    font-weight: 750;
    color: #000000;
    text-align: center;
    grid-area: header;
`
//방음부스 목록텍스트
const _Subtext = styled.div`
    width: 100%;
    font-size: 23px;
    font-weight: 700;
    color: #000000;
    box-shadow: inset 0 -2px 0 #1E00D3;
    padding-bottom: 10px;
`
const _Inputtitle = styled.div`
    margin-top: 20px;
    padding-bottom: 20px;
    padding-left: 10px;
    margin-right: 5px;
    box-shadow: inset 0 -1px 0 #888888;
    display: flex;
    align-items: center;

    @media (max-width: 600px) {
        display: flex;
        flex-direction: column;
        margin-bottom: 1rem;
        margin-top: 10px;
    }
    @media (max-width: 400px) {
        margin-bottom: -3px;
    }
`
//텍스트
const _Input2title = styled.div`
    margin-top: 20px;
    font-size: 20px;
    font-weight: 500;
    padding-bottom: 20px;
    padding-left: 10px;
    box-shadow: inset 0 -1px 0 #888888;
    display: flex;
    @media (max-width: 600px) {
    flex-direction: column;
    }
`
const Label = styled.label`
    font-size: 1.2rem;
    width: 200px;
    @media (max-width: 600px) {
        padding-bottom: 5px;
        margin-right: 55%;
    }
    @media (max-width: 400px) {
        margin-top: -4px;
    }

`
const _Input = styled.input`
    width:${props => props.width};
    height: 30px;
    border: 1px solid #888888;
    border-radius: 3px;
    padding-left: 5px;
    margin-right: 5px;
    margin-top: 5px;
    @media (max-width: 600px) {
        width: 95%;
        padding: 0.5rem;
        font-size: 1.2rem;
    }
`
const _Line1 = styled.div`
width: 8px;
height: 1.3px;
background-color: #000000;
margin:0 10px 0 10px;
@media (max-width: 600px) {
margin-top: 10px;
margin-bottom: 10px;
margin-left: 50px;
margin-right: 50px;
}
`
//제출버튼
interface Container{
  bg: any;
  color: any;
}
const _SubmitBtn = styled.button<Container>`
  background: ${props => props.bg};
  color : ${props => props.color};
  width: 100px;
  height: 35px;
  border: none;
  border-radius: 5px;
  background-color: #1E00D3;
  color: white;
  float: right;
  font-size: 14px;
  font-weight: 900;
  cursor: pointer;
  @media (max-width: 600px) {
      width: 80px;
  }
`
//경고문구
const _Subinputtitle = styled.span`
    font-size: 13px;
    margin-left: 10px;
    margin-top: 3px;
    color: red;
    @media (max-width: 600px) {
    font-size: 15px;
    margin-left: 0;
    }
`
//이용목적 및 이용내역 인풋
const _Input2 = styled.textarea`
    margin-top: 10px;
    width: 300px;
    height: 200px;
    margin-left: 20px;
    border: 1px solid #888888;
    border-radius: 3px;
    padding-left: 5px;
    white-space: pre-line;
    @media (max-width: 600px) {
        width: 420px;
        margin-left: 0;
        font-size: 13px;
    }
`
;