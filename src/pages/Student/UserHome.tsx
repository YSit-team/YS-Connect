import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Menubar from '../../components/Menubar';
import {useNavigate, Link} from 'react-router-dom';
import axiosInstance from '../../api/API_Server';
import Channeltalk from '../../api/Channeltalk';

const Detailsvg = () => {
return (
    <svg width="20" height="20" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M19.6514 13.6543C19.6426 13.3467 19.5283 13.083 19.291 12.8457L12.4531 6.15723C12.251 5.96387 12.0137 5.8584 11.7236 5.8584C11.1348 5.8584 10.6777 6.31543 10.6777 6.9043C10.6777 7.18555 10.792 7.44922 10.9941 7.65137L17.1465 13.6543L10.9941 19.6572C10.792 19.8594 10.6777 20.1143 10.6777 20.4043C10.6777 20.9932 11.1348 21.4502 11.7236 21.4502C12.0049 21.4502 12.251 21.3447 12.4531 21.1514L19.291 14.4541C19.5371 14.2256 19.6514 13.9619 19.6514 13.6543Z" fill="#777777"/>
    </svg>
)
}

interface RentalDataItem {
    created_at: any;
    id: number;
    index: number;
    type: number;
    }

const Home = () => {
    let navigate = useNavigate();
    const [meal, setmeal] = useState("");
    const [mealdate, setmealdate] = useState("");
    const [breakfast, setbreakfast] = useState("");
    const [lunch, setlunch] = useState("");
    const [dinner, setdinner] = useState("");
    const [schedule, setschedule] = useState([]);
    const [phonenum, setphonenum] = useState(sessionStorage.getItem('phoneNum'));
    const [Name, setName] = useState(sessionStorage.getItem('name'));
    const [email, setemail] = useState(sessionStorage.getItem('email'));
    const [studentID, setstudentID] : any = useState(sessionStorage.getItem('studentID'));
    const [ID, setID] = useState(sessionStorage.getItem('userId'));
    const [job, setjob] = useState(sessionStorage.getItem('job'));
    const [grade, setGrade] = useState("");
    const [classNum, setClassnum] = useState("");
    const [PostData, setPostData] = useState([])
    const [rentalData, setRentalData] = useState<RentalDataItem[]>([]);
    const [type, setType] = useState<number>(0);
    
    Channeltalk.boot({ //채널톡
        "pluginKey": "aac0f50c-39b0-4629-939e-a5bc11441405", // fill your plugin key
        "memberId": ID, // fill user's member id
        "profile": { // fill user's profile
          "name": Name, // fill user's name
          "mobileNumber": phonenum, // fill user's mobile number
          "studentID": studentID, // fill user's landline number
          "email": email, // fill user's landline number
    }});

    
    const params = { //페이지 수 설정
        page: 1,
        limit: 8,
    }
    
    useEffect(() => { //게시판 불러오기
            const handle = async() => {
                await axiosInstance.get('/Community/postInquiry', { params })
                    .then(async (res) => {
                        if (res.status === 200) {
                            console.log(res.data.data)
                            setPostData(res.data.data)
                        } else if (res.status === 400) {
                            alert("코드 400")
                        } else if (res.status === 500) {
                            alert("코드 500")
                        }
                    }).catch((error) => {
                        console.log(error)
                    })
            }
            handle()
            console.log(PostData)
        }, [])

        useEffect(() => { //대여상태 불러오기
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
                alert("급식 불러오기 실패");
            }
            };
            
            fetchData();
        }, [mealdate]);

        useEffect(() => { //오늘 급식 불러오기
            axiosInstance.post("/meal")
                .then(res => {
                    setmeal(res.data.lunch);
                    setbreakfast(res.data.breakfast);
                    setlunch(res.data.lunch);
                    setdinner(res.data.dinner);
                    console.log(meal);
                })
                .catch(() => {
                    alert("오늘 급식 불러오기 실패")
                });
        }, []);

        useEffect(() => { //시간표 불러오기
            const grade = studentID.substring(0, 1);
            const classNum = studentID.substring(2, 3)
        
            const fetchTimetable = async () => {
                if (grade && classNum) { // grade와 classNum 값이 모두 존재할 때만 실행
                    try {
                    const res = await axiosInstance.post("/timeTable", { GRADE:grade, CLASS_NM:classNum});
                        setschedule(res.data.data);
                        console.log(schedule);
                    } catch (error) {
                    alert("시간표 불러오기 실패");
                    }
                }
                };
        
            fetchTimetable();
        }, [grade, classNum]);
        



    return (
    <>
    <Menubar/>
    {/* <_Notice>공지사항</_Notice> */}
    <Wrap>
    <_Itfwrap>
    <_Interface style={{overflow: 'hidden'}}>
        <Headerwrap style={{padding:"0", border:"none"}}>
        <Title1>📝 게시판</Title1>
        <Detail onClick={()=>navigate('/community')}>더보기 <Detailsvg/></Detail>
        </Headerwrap>

        <_ListHead>
            <_Title>제목</_Title>
            <_Name>작성자</_Name>
            <_Time>작성일</_Time>
            <_Views>조회</_Views>
            {/* <_Likes>좋아요</_Likes> */}
        </_ListHead>

        <Conwrap>
        {PostData.map((item: any, i: any) => (
            <_Item className='list-item' key={item.id}>
                <_Title>
                    <Link to={`/communitydetail/${item.id}`} style={{ textDecoration: 'none', color: '#000000'}}>
                        <div>{item.title}</div>
                    </Link>
                </_Title>
                <_Name>{item.author}</_Name>
                <_Time>{item.date.substring(0, 11).replace(/-/g, '.').replace(/T/g, ' ')}</_Time>
                <_Views>{item.views}</_Views>
                {/* <_Likes>{item.likes}</_Likes> */}
            </_Item>
        ))}
        </Conwrap>
    </_Interface>
    <_Interface>
        <Headerwrap style={{padding:"0", border:"none"}}>
        <Title1>📷 대여/반납</Title1>
        <Detail onClick={()=>navigate('/status')}>더보기 <Detailsvg/></Detail>
        </Headerwrap>
        <Conwrap>
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
        </Conwrap>
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
        <Headerwrap style={{border:"none"}}>
        <Title1>⏰ 시간표</Title1>
        </Headerwrap>
        <Msgwrap>

            <Table>
        <thead>
            <tr>
            <Th>시간</Th>
            {schedule.map((day:any) => (
                <Th key={day.day}>{day.day}</Th>
            ))}
            </tr>
        </thead>
        <tbody>
            {Array.from({ length: 7 }).map((_, index) => (
            <tr key={index + 1}>
                <Td>{index + 1}교시</Td>
                {schedule.map((day:any) => {
                const data = day.data.find((item:any) => item.time === `${index + 1}교시`);
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
    width: 100vw;
    height: 111.5vh;
    

    @media (max-width: 600px) {
        margin-top: 60px;
        height: 100vh;
    }
`

const _Itfwrap = styled.div`
width: 90vw;
height: 400px;
margin-left:5%;
margin-top: 6vw;
display: flex;
justify-content: space-between;

:last-child{
    margin-top: 35px;
}

@media (max-width: 600px) {
        flex-direction: column;
        height: auto;
        :last-child{
            margin-top: 0;
        }
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


//게시판 스타일코드
const _ListHead = styled.div`
    > div {
        display: inline-block;
        //background-color: yellow;
        text-align: center;
        font-size: 14px;
        font-weight: 600;
    }
    font-size: 0px;

    padding: 10px 0;
    border-top: 2px solid #000;
    border-bottom: 1px solid #ccc;
    display: flex;
    justify-content: space-between;
    padding-right: 10px;
`

const Conwrap = styled.div`
    
`

const _Item = styled.div`
    > div {
        display: inline-block;
        //background-color: yellow;
        font-size: 14px;
    }

    padding: 9.55px 0;
    border-bottom: 1px solid #ccc;
    display: flex;
    justify-content: space-between;
    padding-right: 10px;
`

const _Title = styled.div`
    :hover {
        text-decoration: underline;
    }
    width: 33%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding-left: 10px;
`
const _Name = styled.div`
    text-align: center;
    width: 10%;
    
    @media (max-width: 600px) {
        width: 13%;
    }
`
const _Time = styled.div`
    text-align: center;
    width: 20%;
    
`
const _Views = styled.div`
    text-align: center;
    width: 10%;
`
const _Likes = styled.div`
    text-align: center;
    width: 10%;
`


//반납상태확인 스타일코드
const _Graybar = styled.div`
    > div {
        display: inline-block;
        //background-color: yellow;
        text-align: center;
        font-size: 14px;
        font-weight: 600;
        width: 130px;
    }
    font-size: 0px;

    padding: 10px 0;
    border-top: 2px solid #000;
    border-bottom: 1px solid #ccc;
    display: flex;
    justify-content: space-between;
    padding-right: 10px;
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