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

const BackButton = styled(Link)`
  
  color: #007bff;
  text-decoration: none;
  font-weight: bold;
  font-size: 18px;
  

  &:hover {
    text-decoration: underline;
  }
`;

const ApplicationForm = () => {
  const [name, setName] = useState('');
  const [studentId, setStudentId] = useState('');
  const [numOfPeople, setNumOfPeople] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [purpose, setPurpose] = useState('');
  const [contact, setContact] = useState('');

  const handleSubmit = (e:any) => {
    e.preventDefault();
    // Handle form submission here (e.g., sending data to the server)
    console.log('Form submitted!');
  };

  return (
    <FormContainer>
      <Title>기자재 대여 신청</Title>
      <BackButtonWrap><BackButton to="/기자재목록">기자재 목록으로 이동</BackButton></BackButtonWrap>
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
    </FormContainer>
  );
};

export default ApplicationForm;
