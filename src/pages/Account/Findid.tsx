// import React from 'react';
// import styled from 'styled-components';

// const Findid = () => {
//     return (
//       <>
//       <div>
//         <h1>아이디 찾기</h1>
//         <p>아이디 찾기 페이지입니다!!!.</p>
//       </div>
//       </>
//     );
//   };
  
//   export default Findid;

import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom'; // 리액트 라우터가 설치되어 있다고 가정
import Productlist from '../../Productlist.json'

const ApplicationForm = () => {
  const [name, setName] = useState('');
  const [studentId, setStudentId] = useState('');
  const [numOfPeople, setNumOfPeople] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [purpose, setPurpose] = useState('');
  const [contact, setContact] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false); // 모달 가시성을 관리하는 상태
  const [popupcart, setPopupCart]: any[] = useState([]); // 모달 내 장바구니 아이템을 관리하는 상태
  const [Product, setProduct] = useState(Productlist);
  const [itemBorderColors, setItemBorderColors]: any[] = useState([]);
  const [selectedSort, setSelectedSort] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  //팝업 장비 검색관련 함수////////////////////////////

  const filteredProducts = Productlist.filter(product => {
    const nameMatch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const sortMatch = selectedSort === 'all' || product.sort.toLowerCase() === selectedSort.toLowerCase();
    return nameMatch && sortMatch;
  });
  
  const handleSortClick = (sort:any) => {
      setSelectedSort(sort);
  };

  const handleSearchChange = (event:any) => { //검색인풋
    setSearchQuery(event.target.value);
  };

  //////////////////////////////////////////////

    // 모달 관련 상태와 함수////////////////////////////////

    const handleRemovePopupItem = (index:any) => {
      // 모달 내 장바구니에서 아이템 삭제
      const updatedCart = [...popupcart];
      updatedCart.splice(index, 1);
      setPopupCart(updatedCart);
    };
  
    const itemExistsInCart = (itemId: string) => {
      // 모달 내 장바구니에 아이템이 이미 있는지 확인
      return popupcart.some((item:any) => item.id === itemId);
    };
  
    const clickpopupokbtn = () => {
      // 모달 내 OK 버튼 클릭 처리
      // 이곳에서 모달 내 장바구니에서 선택된 아이템을 처리할 수 있습니다.
      console.log('선택된 아이템:', popupcart);
      setIsModalVisible(false); // 처리 후 모달 닫기
    };

    ////////////////////////////////////////////////////

    const handleProductClick = (i: number) => { //장비 클릭했을때 이벤트/////
      const itemId:any = Product[i].id;

        if (itemExistsInCart(itemId)) {
          const updatedCart = popupcart.map((item:any) =>
            item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
          );
          setPopupCart(updatedCart);
        } else {
          const cartItem = {
            id: Product[i].id,
            name: Product[i].name,
            url: Product[i].url,
            sort: Product[i].sort,
            quantity: 1,
          };
          setPopupCart([...popupcart, cartItem]);
        }
    };

    const handleSubmit = (e:any) => { ///전송 함수
      e.preventDefault();
      console.log('Form submitted!');
    };

  return (
    <FormContainer>
      <Title>기자재 대여 신청</Title>
      <BackButtonWrap><BackButton onClick={() => setIsModalVisible(!isModalVisible)}>기자재 목록으로 이동</BackButton></BackButtonWrap>
      <form onSubmit={handleSubmit}>
        <FormField>
          <label htmlFor="name">이름:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </FormField>

        {/* 학번 입력 필드 */}
        <FormField>
          <label htmlFor="studentId">학번:</label>
          <input
            type="text"
            id="studentId"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            required
          />
        </FormField>

        <FormField>
          <label htmlFor="numOfPeople">이용인원:</label>
          <input
            type="number"
            id="numOfPeople"
            value={numOfPeople}
            onChange={(e) => setNumOfPeople(e.target.value)}
            required
          />
        </FormField>

        <FormField>
          <label htmlFor="startDate">대여 시작일:</label>
          <input
            type="date"
            id="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </FormField>

        <FormField>
          <label htmlFor="endDate">대여 종료일:</label>
          <input
            type="date"
            id="endDate"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
        </FormField>

        {/* 연락처 입력 필드 */}
        <FormField>
          <label htmlFor="contact">연락처:</label>
          <input
            type="text"
            id="contact"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            required
          />
        </FormField>

        <FormField>
          <label htmlFor="purpose">이용목적:</label>
          <textarea
            id="purpose"
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
            required
          />
        </FormField>

        <SubmitButton type="submit">신청하기</SubmitButton>
      </form>
    
    {isModalVisible && (
      <ModalWrapper>
          <ModalContent>
              <_Headmodal>
                  기자재 추가하기
              </_Headmodal>
              {/* <Cartwrap>
              {
              popupcart.map((item:any, i:any) => (
                  <Cartproductwrap key={i}>
                  <CartBorder style={{ border: '1px solid #B7B7B7' }}>
                      <CartImg src={`product/${item.url}`} />
                  </CartBorder>
                  <CartName>{item.name}</CartName>
                  <CartQuantity>{item.quantity}</CartQuantity>
                  <CartDelete onClick={() => handleRemovePopupItem(i)}>삭제</CartDelete>
                  </Cartproductwrap>
              ))
              }
              </Cartwrap> */}
              <RentalListWrap>
                  <Sortmenu>
                    <_SortWrap>
                      <_Sort isSelected={selectedSort === 'all'} onClick={() => handleSortClick('all')}>전체</_Sort>
                      <_Sort isSelected={selectedSort === 'camera'} onClick={() => handleSortClick('camera')}>카메라</_Sort>
                      <_Sort isSelected={selectedSort === 'light'} onClick={() => handleSortClick('light')}>조명</_Sort>
                      <_Sort isSelected={selectedSort === 'mic'} onClick={() => handleSortClick('mic')}>녹음</_Sort>
                    </_SortWrap>
                      <Search type="text" value={searchQuery} onChange={handleSearchChange} placeholder="장비를 검색하세요."/>
                      <button onClick={() => handleSortClick('all')}>초기화</button>
                  </Sortmenu>
                  {
                  filteredProducts.map(product =>{
                          return (
                              <Productwrap
                                  onClick={() => handleProductClick(product.id)}
                                  key={product.id}
                                  >
                              <ImgBorder style={{ border: '#B7B7B7' }}>
                              <ProductImg src={`product/${product.url}`} />
                              </ImgBorder>
                              <ProductName>{product.name}</ProductName>
                              </Productwrap>
                          )
                          })
                  }
              </RentalListWrap>
              {/* 확인버튼은 저장되게 닫기버튼은 취소로 */}
              <_BtnWrap><Closebtn onClick={() => {setIsModalVisible(!isModalVisible); setPopupCart([]);}}>취소</Closebtn><OKbtn onClick={clickpopupokbtn}>확인</OKbtn></_BtnWrap>
          </ModalContent>
      </ModalWrapper>
  )}
{/* -------------------------------------------------------------------- */}
    </FormContainer>


  );
};

export default ApplicationForm;

const FormContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Title = styled.h1`
  font-size: 26px;
  text-align: center;
  margin-bottom: 20px;
`;

const FormField = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;

  label {
    margin-bottom: 5px;
    font-weight: bold;
  }

  input,
  select,
  textarea {
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 3px;
    height: 25px;
  }

  @media only screen and (max-width: 375px) {
    input[type="date"] {
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      background-color: #fff;
      color: #000;
      font-size: 16px;
    }
  }
`;

const SubmitButton = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    background-color: #0056b3;
  }
`;

const BackButtonWrap = styled.div`
  display: block;
  text-align: center;
  margin-bottom: 20px;
  font-weight: bold;
  font-size: 18px;
`;

const BackButton = styled.div`
  
  color: #007bff;
  text-decoration: none;
  font-weight: bold;
  font-size: 18px;
  cursor: pointer;
  

  &:hover {
    text-decoration: underline;
  }
`;

//모달창 스타일///////////////////////////////////
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

    background-color: #ffffff;
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
const _Headmodal = styled.h2`
    margin: 25px;
    text-align: center;
`
//////////////////////////////////////////////////
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

const CartDelete = styled.button`
    margin-right: 10px;
    margin-bottom: -5px;
`
/////////////////////////////////////////////////
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
interface SortProps {
  isSelected: boolean;
  onClick: () => void;
}

const _Sort = styled.div<SortProps>`
    font-size: 16px;
    padding: 15px;
    cursor: pointer;
    @media (max-width: 600px) {
        padding: 8px;
        font-size: 15px;
    }

    :hover{
        border-bottom: 1.5px solid #1E00D3;
    }

    ${props => props.isSelected && `
        border-bottom: 1.5px solid #1E00D3;
    `}
`

const Search = styled.input`
    margin: 15px 5px 0 auto;
    border: 1px solid gray;
    border-radius: 5px;
    width: 130px;
    height: 25px;
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
