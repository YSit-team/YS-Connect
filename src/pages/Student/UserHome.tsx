import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Menubar from '../../components/Menubar';
import {useNavigate} from 'react-router-dom';
import axiosInstance from '../../api/API_Server';
import Channeltalk from '../../api/Channeltalk';

const Detailsvg = () => {
return (
    <svg width="20" height="20" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M19.6514 13.6543C19.6426 13.3467 19.5283 13.083 19.291 12.8457L12.4531 6.15723C12.251 5.96387 12.0137 5.8584 11.7236 5.8584C11.1348 5.8584 10.6777 6.31543 10.6777 6.9043C10.6777 7.18555 10.792 7.44922 10.9941 7.65137L17.1465 13.6543L10.9941 19.6572C10.792 19.8594 10.6777 20.1143 10.6777 20.4043C10.6777 20.9932 11.1348 21.4502 11.7236 21.4502C12.0049 21.4502 12.251 21.3447 12.4531 21.1514L19.291 14.4541C19.5371 14.2256 19.6514 13.9619 19.6514 13.6543Z" fill="#777777"/>
    </svg>
)
}

const Home = () => {
    let navigate = useNavigate();
    const [meal, setmeal] = useState("");
    const [mealdate, setmealdate] = useState("");
    const [breakfast, setbreakfast] = useState("");
    const [lunch, setlunch] = useState("");
    const [dinner, setdinner] = useState("");
    const [schedule, setschedule] = useState([]);
    const [phonenum, setphonenum] = useState("");
    const [Name, setName] = useState("");
    const [email, setemail] = useState("");
    const [studentID, setstudentID] = useState("");
    const [ID, setID] = useState(sessionStorage.getItem('userId'));
    const [job, setjob] = useState(sessionStorage.getItem('job'));

    interface TimetableData {
        day: string;
        data: {
        time: string;
        subject: string;
        instructor: string;
        }[];
    }

    const timetableData: TimetableData[] = [
        {
        day: '월요일',
        data: [
            { time: '1교시', subject: '자율', instructor: '장두' },
            { time: '2교시', subject: '겜프32', instructor: '김준' },
            { time: '3교시', subject: '겜프32', instructor: '김준' },
            { time: '4교시', subject: '겜프32', instructor: '김준' },
            { time: '5교시', subject: '겜프32', instructor: '김준' },
            { time: '6교시', subject: '겜프32', instructor: '김준' },
            { time: '7교시', subject: '겜프32', instructor: '김준' },
        ],
        },
        {
        day: '화요일',
        data: [
            { time: '1교시', subject: '드콘3', instructor: '임재' },
            { time: '2교시', subject: '드콘3', instructor: '임재' },
            { time: '3교시', subject: '드콘3', instructor: '임재' },
            { time: '4교시', subject: '드콘3', instructor: '임재' },
            { time: '5교시', subject: '스앱', instructor: '장두' },
            { time: '6교시', subject: '스앱', instructor: '장두' },
            { time: '7교시', subject: '스앱', instructor: '장두' },
        ],
        },
        {
            day: '수요일',
            data: [
                { time: '1교시', subject: '드콘3', instructor: '임재' },
                { time: '2교시', subject: '드콘3', instructor: '임재' },
                { time: '3교시', subject: '드콘3', instructor: '임재' },
                { time: '4교시', subject: '드콘3', instructor: '임재' },
                { time: '5교시', subject: '스앱', instructor: '장두' },
                { time: '6교시', subject: '스앱', instructor: '장두' },
                { time: '7교시', subject: '스앱', instructor: '장두' },
            ],
        },
        {
            day: '목요일',
            data: [
                { time: '1교시', subject: '드콘3', instructor: '임재' },
                { time: '2교시', subject: '드콘3', instructor: '임재' },
                { time: '3교시', subject: '드콘3', instructor: '임재' },
                { time: '4교시', subject: '드콘3', instructor: '임재' },
                { time: '5교시', subject: '스앱', instructor: '장두' },
                { time: '6교시', subject: '스앱', instructor: '장두' },
                { time: '7교시', subject: '스앱', instructor: '장두' },
            ],
        },
        {
            day: '금요일',
            data: [
                { time: '1교시', subject: '드콘3', instructor: '임재' },
                { time: '2교시', subject: '드콘3', instructor: '임재' },
                { time: '3교시', subject: '드콘3', instructor: '임재' },
                { time: '4교시', subject: '드콘3', instructor: '임재' },
                { time: '5교시', subject: '스앱', instructor: '장두' },
                { time: '6교시', subject: '스앱', instructor: '장두' },
                { time: '7교시', subject: '스앱', instructor: '장두' },
            ],
        },
        // Add data for other days here
    ];

    useEffect(() => { //프로필 불러오기
        if (ID) {
            axiosInstance
            .post("/profile", { id: ID, job: job })
            .then((response) => {
                console.log(response.data);
                setName(response.data.firstName+response.data.lastName)
                setphonenum(response.data.phoneNumber)
                setstudentID(response.data.studentID)
                setemail(response.data.email)
            })
            .catch((error) => console.log(error));
        }
        }, [ID, job]);

        //날짜 데이터
        const handleDate = (e: { target: { value: React.SetStateAction<string>; }; }) => {
            const selectedDate = e.target.value;
            setmealdate(selectedDate);
        }

        useEffect(() => { // 날짜에 맞춰 급식 불러오기
            const fetchData = async () => {
            try {
                const res = await axiosInstance.post("/meal", { DAY: mealdate.substring(2, 10).replace(/-/g, '') });
                setbreakfast(res.data.breakfast);
                setlunch(res.data.lunch);
                setdinner(res.data.dinner);
            } catch (error) {
                alert("Request Failed");
            }
            };
        
            fetchData();
        }, [mealdate]);

    Channeltalk.boot({ //채널톡
        "pluginKey": "aac0f50c-39b0-4629-939e-a5bc11441405", // fill your plugin key
        "memberId": ID, // fill user's member id
        "profile": { // fill user's profile
          "name": Name, // fill user's name
          "mobileNumber": phonenum, // fill user's mobile number
          "studentID": studentID, // fill user's landline number
          "email": email, // fill user's landline number
    }});

    useEffect(() => { //급식 불러오기
        axiosInstance.post("/meal")
            .then(res => {
                setmeal(res.data.lunch);
                setbreakfast(res.data.breakfast);
                setlunch(res.data.lunch);
                setdinner(res.data.dinner);
                console.log(meal);
            })
            .catch(() => {
                alert("Request Failed")
            });

            //시간표 불러오기
        axiosInstance.post("/timeTable", {GRADE:"3", CLASS_NM:"2"})
            .then(res => {
                setschedule(res.data.data)
                console.log(schedule)
            })
            .catch(() => {
                alert("Request Failed")
            });
    }, []);

    return (
    <>
    <Menubar/>
    {/* <_Notice>공지사항</_Notice> */}
    <Wrap>
    <_Itfwrap>
    <_Interface>
        <Headerwrap>
        <Title1>📝 게시판</Title1>
        <Detail onClick={()=>navigate('/community')}>더보기 <Detailsvg/></Detail>
        </Headerwrap>
        <Msgwrap>
        <Nodatamsg>데이터없음</Nodatamsg>
        </Msgwrap>
    </_Interface>
    <_Interface>
        <Headerwrap>
        <Title1>📷 대여/반납</Title1>
        <Detail onClick={()=>navigate('/rental')}>더보기 <Detailsvg/></Detail>
        </Headerwrap>
        <Msgwrap>
        <Nodatamsg>데이터없음</Nodatamsg>
        </Msgwrap>
    </_Interface>
    </_Itfwrap>
    <_Itfwrap>
    <_Interface>
        <Headerwrap>
        <Title1>🍚 급식표</Title1>
        </Headerwrap>
        <Msgwrap>
            {/* {meal !== undefined ?  */}
            <>
            <Mealwrap>
                <MealDate value={mealdate} type='date' onChange={handleDate}></MealDate>
                <Mealtext>{meal}</Mealtext>
            <MealbtnWrap>
            <Mealbtn onClick={() => setmeal(breakfast)}>아침</Mealbtn>
            <Mealbtn onClick={() => setmeal(lunch)}>점심</Mealbtn>
            <Mealbtn onClick={() => setmeal(dinner)}>저녁</Mealbtn>
            </MealbtnWrap>
            </Mealwrap>
            </>
            {/* : "데이터를 불러올수없음"} */}
        </Msgwrap>
    </_Interface>
    <_Interface style={{overflow: 'hidden'}}>
        <Headerwrap>
        <Title1>⏰ 시간표</Title1>
        <Detail>더보기 <Detailsvg/></Detail>
        </Headerwrap>
        <Msgwrap>

            <Table>
        <thead>
            <tr>
            <Th>시간</Th>
            {timetableData.map((day) => (
                <Th key={day.day}>{day.day}</Th>
            ))}
            </tr>
        </thead>
        <tbody>
            {Array.from({ length: 7 }).map((_, index) => (
            <tr key={index + 1}>
                <Td>{index + 1}교시</Td>
                {timetableData.map((day) => {
                const data = day.data.find((item) => item.time === `${index + 1}교시`);
                return <Td key={day.day + data?.time}>
                    {data ? (
                    <>
                        {data.subject}
                        <br />
                        {data.instructor}
                    </>
                    ) : ''}
                </Td>
                
                })}
            </tr>
            ))}
        </tbody>
        </Table>

        </Msgwrap>
    </_Interface>
    </_Itfwrap>
    </Wrap>
    </>
    );
};

export default Home;

const Wrap = styled.div`
    margin-bottom: 50px;
`

const _Notice = styled.div`
width: 90vw;
height: 20vh;
margin-top: 80px;
margin-left:5%;

background: #D9D9D9;
border-radius: 20px;
text-align: center;
`

const _Itfwrap = styled.div`
width: 90vw;
height: 400px;
margin-left:5%;
margin-top: 6vw;
display: flex;
justify-content: space-between;

:last-child{
    margin-top: 20px;
}

@media (max-width: 600px) {
        flex-direction: column;
        height: auto;
    }
`

const _Interface = styled.div`
width: 44vw;
height: 415px;
margin-top: 13px;
border: 1px solid #999999;
border-radius: 15px;

@media (max-width: 600px) {
        width: 90vw;
    }
`

const Headerwrap = styled.div`
display: flex;
justify-content: space-between;
flex-direction: row;
align-items: center;
margin: 10px;
padding-bottom: 10px;
border-bottom: 1px dashed #999999;
`
//게시판홈
const Title1 = styled.div`
font-size: 1.3rem;
font-weight: 500;
`

const Detail = styled.div`
font-size: 1rem;
border: none;
background:none;
cursor: pointer;
color: #777777;
display: flex;
flex-direction: row;
`

const Msgwrap = styled.div`
display: flex;
justify-content: center;
align-items: center;
width: 100%;
height: 85%;
`

const Nodatamsg = styled.div`
font-size: 16px;
`

const MealDate = styled.input`
    width: 98%;
`

const Mealwrap = styled.div`
    /* border: 1px solid #000000; */
`

const Mealtext = styled.pre`
    padding: 20px;
    border: 1px solid #000000;
`

const MealbtnWrap = styled.div`
    display: flex;
    justify-content: space-around;
`

const Mealbtn = styled.button`
    border: 1px solid #000000;
    background: none;
    cursor: pointer;
    padding: 5px 10px 5px 10px;
`


const Table = styled.table`
width: 100%;
border-collapse: collapse;
`;

const Th = styled.th`
border: 1px solid #ccc;
padding: 8px;
font-size: 13px;
`;

const Td = styled.td`
border: 1px solid #ccc;
padding: 5px;
font-size: 12px;
text-align: center;
`;