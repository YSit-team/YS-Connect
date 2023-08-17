import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import Menubar from '../../components/Menubar'
import Productlist from '../../Productlist.json'
import { useNavigate } from "react-router-dom";
import axios from "axios";
import axiosInstance from '../../api/API_Server';


const Rental = () => {
    const [studentID, setstudentID] = useState("");
    const [name, setName] = useState("");
    const [form, setform]: any = useState("");
    const [person, setperson] = useState("");
    const [period1, setperiod1] = useState("");
    const [period2, setperiod2] = useState("");
    const [meet1, setmeet1] = useState("");
    const [meet2, setmeet2] = useState("");
    const [phonenum, setphonenum] = useState("");
    const [purpose, setpurpose] = useState("");
    const [cart, setcart]: any[] = useState([]);
    const [popupcart, setpopupcart]: any[] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    let [Product, setProduct] = useState(Productlist);
    const [border1, setborder1] = useState('1px solid #B7B7B7');
    let navigate = useNavigate();
    const [id, setid] = useState(sessionStorage.getItem('userId'));
    const [job, setjob] = useState(sessionStorage.getItem('job'));

    useEffect(() => {
        if (phonenum.length === 10) {
        setphonenum(phonenum.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3'));
        }
        if (phonenum.length === 13) {
        setphonenum(phonenum.replace(/-/g, '').replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3'));
        }
    }, [phonenum]);

    useEffect(() => {
        console.log(id);
        if (id) {
            axiosInstance
            .post("/profile", { id: id, job: job })
            .then((response) => {
                console.log(response.data);
                setName(response.data.firstName+response.data.lastName)
                setphonenum(response.data.phoneNumber)
                setstudentID(response.data.studentID)
            })
            .catch((error) => console.log(error));
        }
        }, [id, job]);

    function itemExistsInCart(itemId: string) {
        return popupcart.some((item:any) => item.id === itemId);
    }

    const handleIncreaseQuantity = (index:any) => {
        const updatedCart = [...cart];
        updatedCart[index].quantity += 1;
        setcart(updatedCart);
    }

    const handleDecreaseQuantity = (index: any) => {
        const updatedCart = [...cart];
        if (updatedCart[index].quantity > 1) {
            updatedCart[index].quantity -= 1;
            setcart(updatedCart);
        }
    }
    
    const handleRemoveItem = (index: any) => {
        const updatedCart = [...cart];
        updatedCart.splice(index, 1);
        setcart(updatedCart);
    }

    const handleRemovePopupItem = (index: any) => {
        const updatedCart = [...popupcart];
        updatedCart.splice(index, 1);
        setpopupcart(updatedCart);
    }

    const clickpopupokbtn = () => {
        setIsModalVisible(!isModalVisible);
        setcart([...popupcart]);
        setpopupcart([]);
    }

    
    return (
        <>
        <Menubar/>
        <_Wrap>
        <_Writewrap 
            onSubmit={(event: any) => {
                event.preventDefault();
                console.log({
                    id: id,
                    studentID: studentID,
                    cart: cart,
                    firstName: name.substring(0, 1),
                    lastName: name.substring(1, 3),
                    person: person,
                    period1: period1,
                    period2: period2,
                    meet1: meet1,
                    meet2: meet2,
                    phonenum: phonenum,
                    purpose: purpose
                }
                )
                axios.post("", {
                    id: id,
                    studentID: studentID,
                    cart: cart,
                    firstName: name.substring(0, 1),
                    lastName: name.substring(1, 3),
                    person: person,
                    period1: period1,
                    period2: period2,
                    meet1: meet1,
                    meet2: meet2,
                    phonenum: phonenum,
                    purpose: purpose
                    })
                    .then((res: {
                    data: any; status: number; 
                    }) => {
                    if (res.status == 200) {
                        alert(res.data.message)
                    } else if (res.status == 202) {
                        //경고 => 메시지 res.data.message
                        alert(res.data.message)
                    } else {
                        //예외
                        alert(res.data.message)
                    }
                })
                .catch(()=>{alert("실패")})
                console.log({
                    id: id,
                    studentID: studentID,
                    cart: cart,
                    firstName: name.substring(0, 1),
                    lastName: name.substring(1, 3),
                    person: person,
                    period1: period1,
                    period2: period2,
                    meet1: meet1,
                    meet2: meet2,
                    phonenum: phonenum,
                    purpose: purpose
                });
                }}
                >
            <_Header>신청하기</_Header>
            <_Listwrap>
                <_Subtext>기자재 목록<_SubmitBtn type="submit" bg="#1E00D3" color="#ffffff">제출하기</_SubmitBtn><_Addbtn onClick={() => setIsModalVisible(!isModalVisible)}>추가하기 +</_Addbtn>
                
                <Cartwrap>
                {
                cart.map((item:any, i:any) => (
                    <Cartproductwrap key={i}>
                    <CartBorder style={{ border: border1 }}>
                        <CartImg src={`product/${item.url}`} />
                    </CartBorder>
                    <CartName>{item.name}</CartName>
                    <QuantityPlusBtn onClick={() => handleDecreaseQuantity(i)}>-</QuantityPlusBtn>
                    <CartQuantity>{item.quantity}</CartQuantity>
                    <QuantityPlusBtn onClick={() => handleIncreaseQuantity(i)}>+</QuantityPlusBtn>
                    <CartDelete onClick={() => handleRemoveItem(i)}>삭제</CartDelete>
                    </Cartproductwrap>
                ))
                }
                </Cartwrap>
            </_Subtext>
            </_Listwrap>


{/* ---------------------------------신청서작성------------------------------------ */}
            
                <_Subtext>신청서 작성</_Subtext>
                <_Inputtitle><Label>이름</Label><_Input value={name} onChange={(event) => {
                    setName(event.target.value);
                    
                    }}
                    // required
                    type="text"
                    placeholder='이름을 입력해주세요.' width={"200px"} disabled/></_Inputtitle>
                <_Inputtitle><Label>학번</Label><_Input value={studentID}
                onChange={(event) => {
                    setstudentID(event.target.value);
                    
                    }}
                    type="text"
                    placeholder='학번을 입력해주세요.' width={"200px"} disabled/></_Inputtitle>
                <_Inputtitle><Label>이용인원</Label><_Input 
                onChange={(event) => {setperson(event.target.value);
                    
                    }}
                    // required
                    type="number"
                placeholder='9' width={"35px"} /></_Inputtitle>
                <Rentaldate>
                <_Inputtitle><Label>대여기간</Label>
                    {/* <_Dropdownwrap> */}
                    <_Dropdownwrap>
                    <_InputRow onChange={(event) => {
                        setperiod1(event.target.value);
                        
                        }}
                        // required
                        type="date"/> 
                        <_Line1/>
                    <_InputRow onChange={(event) => {
                        setperiod2(event.target.value);
                        
                        }}
                        // required
                        type="date"/>
                    </_Dropdownwrap>
                    {/* </_Dropdownwrap> */}
                </_Inputtitle>
                </Rentaldate>
                <Rentaldate>
                <_Inputtitle><Label>불출시점</Label>
                    <_Dropdownwrap>
                        <_InputRow onChange={(event) => {
                            setmeet1(event.target.value);
                            
                            }}
                            // required
                            type="time"/>
                        <_Line1/>
                        <_InputRow onChange={(event) => {
                            setmeet2(event.target.value);
                            
                            }}
                            // required
                            type="time"/>
                    </_Dropdownwrap>
                </_Inputtitle>
                </Rentaldate>
                <_Inputtitle><Label>연락처</Label><_Input
                    value={phonenum}
                    onChange={(event) => {setphonenum(event.target.value);
                        
                        const regex = /^[0-9\b -]{0,13}$/;
                        if (regex.test(event.target.value)) {
                        setphonenum(event.target.value);
                        }
                    }} 
                    type="tel" placeholder="01012345678" maxLength={13} disabled></_Input></_Inputtitle>
                <_Input2title>이용목적 및 이용내역
                    <_Input2wrap>
                        <_Subinputtitle>※사용 용도, 작품 내용 등을 구체적으로 적어주세요.</_Subinputtitle>
                        <_Input2 
                        onChange={(event) => {
                            setpurpose(event.target.value);
                            
                            }}
                            // required
                        placeholder='- 이용목적: (예: 영화콘텐츠 제작, 미디어교육, 행사)&#13;&#10;
                            - 촬영일자:  월  일&#13;&#10;
                            - 사용장소:&#13;&#10;
                            - 제작내용:'>
                        </_Input2>
                    </_Input2wrap>
                </_Input2title>
            </_Writewrap>
    {/* ----------------------------------------------------------------------------- */}

        </_Wrap>

{/* ------------------------모달창-------------------------------------------- */}
        {isModalVisible && (
                    <ModalWrapper>
                        <ModalContent>
                            <_Headmodal>
                                기자재 추가하기
                            </_Headmodal>
                            <Cartwrap>
                            {
                            popupcart.map((item:any, i:any) => (
                                <Cartproductwrap key={i}>
                                <CartBorder style={{ border: border1 }}>
                                    <CartImg src={`product/${item.url}`} />
                                </CartBorder>
                                <CartName>{item.name}</CartName>
                                <CartQuantity>{item.quantity}</CartQuantity>
                                <CartDelete onClick={() => handleRemovePopupItem(i)}>삭제</CartDelete>
                                </Cartproductwrap>
                            ))
                            }
                            </Cartwrap>
                            <RentalListWrap>
                                <Sortmenu><_SortWrap><_Sort>카메라</_Sort><_Sort>삼각대</_Sort><_Sort>조명</_Sort><_Sort>녹음</_Sort><Search/></_SortWrap></Sortmenu>
                                {
                                Product.map((a, i)=>{
                                        return (
                                            <Productwrap
                                                onClick={() => {
                                                    const itemId:any = Product[i].id;
                                                    if (itemExistsInCart(itemId)) {
                                                    //카트에 상품있는경우 수량증가
                                                    const updatedCart = popupcart.map((item:any) =>
                                                        item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
                                                    );
                                                    setpopupcart(updatedCart);
                                                    } else {
                                                    //카트에 없을경우 수량 1 추가
                                                    const cartItem = {
                                                        id: Product[i].id,
                                                        name: Product[i].name,
                                                        url: Product[i].url,
                                                        sort: Product[i].sort,
                                                        quantity: 1,
                                                    };
                                                    setpopupcart([...popupcart, cartItem]);
                                                    }
                                                }}
                                                key={i}
                                                >
                                            <ImgBorder style={{ border: border1 }}>
                                            <ProductImg src={`product/${Product[i].url}`} />
                                            </ImgBorder>
                                            <ProductName>{Product[i].name}</ProductName>
                                            </Productwrap>
                                        )
                                        })
                                }
                            </RentalListWrap>
                            {/* 확인버튼은 저장되게 닫기버튼은 취소로 */}
                            <_BtnWrap><Closebtn onClick={() => {setIsModalVisible(!isModalVisible); setpopupcart([]);}}>취소</Closebtn><OKbtn onClick={clickpopupokbtn}>확인</OKbtn></_BtnWrap>
                        </ModalContent>
                    </ModalWrapper>
                )}
    {/* -------------------------------------------------------------------- */}
        </>
    );
};

export default Rental;

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

//제목
const _Header = styled.header`
    width: 100%;
    margin-top: 30px;
    font-size: 28px;
    font-weight: 750;
    color: #000000;
    text-align: center;
    grid-area: header;
`

//기자재목록
const _Listwrap = styled.div`
    width: 100%;
    grid-area: list;
    margin-top: 20px;
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
`

//기자재목록텍스트
const _Subtext = styled.div`
    width: 100%;
    font-size: 23px;
    font-weight: 700;
    color: #000000;
    box-shadow: inset 0 -2px 0 #1E00D3;
    padding-bottom: 10px;
`


//추가하기
const _Addbtn = styled.button`
    width: 100px;
    height: 35px;
    border: none;
    border-radius: 5px;
    background-color: #1E00D3;
    color: white;
    float: right;
    font-size: 14px;
    font-weight: 900;
    margin-right: 10px;
    cursor: pointer;

    @media (max-width: 600px) {
        width: 80px;
    }
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


const Label = styled.label`
    font-size: 1.2rem;
    width: 200px;
    @media (max-width: 600px) {
        padding-bottom: 5px;
        margin-right: 55%;
    }

`;

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
const _InputRow = styled.input`
    width:${props => props.width};
    height: 30px;
    border: 1px solid #888888;
    border-radius: 3px;
    padding-left: 5px;
    @media (max-width: 600px) {
        width: 120px;
        padding: 0.5rem;
        font-size: 1.2rem;
        padding-left: -10px;
    }
`
const _Dropdownwrap = styled.span`
    display: flex;
    align-items: center;
    @media (max-width: 600px) {
        display: flex;
        align-items: center;
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

//이용목적 및 이용내역 부모
const _Input2wrap = styled.div`
    display: flex;
    flex-direction: column;
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

//모달창 스타일
const ModalWrapper = styled.div`
    position: fixed;
    top: 0;
    left: 0;

    width: 100%;
    height: 100%;

    background-color: rgba(0, 0, 0, 0.4);
`;

const ModalContent = styled.div` 
    position: absolute;
    top: 50%;
    left: 50%;

    padding: 10px;
    width: 55vw;
    height: 90vh;

    background-color: rgb(255, 255, 255);
    border-radius: 10px;
    box-shadow: 0 2px 3px 0 rgba(34, 36, 38, 0.15);

    transform: translateX(-50%) translateY(-50%);
    overflow-y: auto; // enable vertical scrolling
    @media (max-width: 600px) {
        width: 80vw;
        height: 70vh;
    }
`;



//모달창 내용
const _Headmodal = styled.h3`
    margin: 25px;
    padding-bottom: 10px;
    box-shadow: inset 0 -1px 0 #888888;
`

////////////////////////////////////////////////////////////////////작업중/////////////////////
const Cartwrap = styled.div`
    
`

const Cartproductwrap = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
    padding-bottom: 10px;
    border-bottom: 0.8px solid #999999;
    align-items: center;
`

const CartBorder = styled.div`
    height: 50px;
    width: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 5px;
`

const CartImg = styled.img`
    width: 60%;
`

const CartName = styled.div`
    font-size: 16px;
    font-weight: 500;
    text-align: center;
    margin-top: 5px;
    width: 130px;
`

const CartQuantity = styled.div`
    width: 40px;
    text-align: center;
    margin-bottom: -5px;
`

const QuantityPlusBtn = styled.button`
    margin-bottom: -5px;
`

const CartDelete = styled.button`
    margin-right: 10px;
    margin-bottom: -5px;
`

const RentalListWrap = styled.div`
    padding: 0 25px 0 25px;
    /* margin-top: 150px; */
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-column-gap: 10px;
    grid-template-areas: 
        "sort sort sort sort"
        "product product product product"
        "product product product product"
        "btn btn btn btn";
`

const Sortmenu = styled.div`
    grid-area: sort;
    display: flex;
    box-shadow: inset 0 2px 0 #1E00D3;
    margin-top: 10px;
    @media (max-width: 850px) {
        display: flex;
        flex-direction: column;
    }
`

const _SortWrap = styled.span`
    display: flex;  
    @media (max-width: 600px) {
    }
`

const _Sort = styled.div`
    font-size: 16px;
    padding: 15px;
    cursor: pointer;
    @media (max-width: 600px) {
        padding: 8px;
        font-size: 15px;
    }

    :hover{
        box-shadow: inset 0 -1px 0 #1E00D3;
    }
`

const Search = styled.input`
    grid-area: search;
    margin: 15px 5px 0 auto;
    border: 1px solid gray;
    border-radius: 10px;
    width: 130px;
    height: 20px;
    padding-left: 10px;
    @media (max-width: 600px) {
        width: 130px;
        margin-bottom: 10px;
    }
`

const Productwrap = styled.div`
    display: flex;
    flex-direction: column;
    cursor: pointer;
`

const ImgBorder = styled.div`
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
    grid-area: product;
    @media (max-width: 600px) {
        height: 50px;
    }
`

const ProductImg = styled.img`
    width: 60%;
    grid-area: product;
`

const ProductName = styled.div`
    font-size: 16px;
    font-weight: 500;
    text-align: center;
    margin-top: 5px;
    grid-area: product;

    @media (max-width: 600px) {
        font-size: 13px;
    }
`

const _BtnWrap = styled.nav`
    display: flex;
    margin-top: 20px;
    margin-right: 10px;
    justify-content: end;
`

const OKbtn = styled.button`
    bottom : 15px;
    right: 2vw;
    color: #ffffff;
    font-weight: 700;
    font-size: 15px;
    width: 6.5vw;
    height: 35px;
    border-radius: 8px;
    border: none;
    background-color: #1E00D3;
    cursor: pointer;
    @media (max-width: 600px) {
        width: 15vw;
        height: 35px;
    }
`

const Closebtn = styled.button`
    margin-right: 8px;
    bottom : 15px;
    right: 9vw;
    color: #ffffff;
    font-weight: 700;
    font-size: 15px;
    width: 6.5vw;
    height: 35px;
    border-radius: 8px;
    border: none;
    background-color: #999999;
    cursor: pointer;
    @media (max-width: 600px) {
        width: 15vw;
        height: 35px;
    }
`

const Rentaldate = styled.div`
    >div{
        @media (max-width: 600px) {
            display: flex;
            flex-direction: column;
            >div{
                margin-left: 0;
                margin-top: 5px;
            }
        }
    }
`
