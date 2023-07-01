import React, {useState} from 'react';

const Findpw = () => {
  const [value, setValue] = useState('처음 값');
  const [editMode, setEditMode] = useState(false);
  const [newValue, setNewValue] = useState('');

  const handleEdit = () => {
    setNewValue(value);
    setEditMode(true);
  };

  const handleSave = () => {
    setValue(newValue);
    setEditMode(false);
  };

  const handleCancel = () => {
    setEditMode(false);
  };

  const handleChange = (e:any) => {
    setNewValue(e.target.value);
  };
    return (
      <div>
        {editMode ? (
        <div>
          <input type="text" value={newValue} onChange={handleChange} />
          <button onClick={handleSave}>저장</button>
          <button onClick={handleCancel}>취소</button>
        </div>
      ) : (
        <div>
          <input type="text" value={value} readOnly />
          <button onClick={handleEdit}>수정</button>
        </div>
      )}

      </div>
    );
  };
  
  export default Findpw;
