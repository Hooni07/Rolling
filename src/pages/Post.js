import styled from 'styled-components';
import { useEffect, useState } from 'react';
import SelectSection from '../components/post/SelectSection';
import Header from '../components/common/Header';
import PostButton from '../components/post/PostButton';

async function getAPI(query) {
  const response = await fetch(`https://rolling-api.vercel.app${query}`);
  const body = await response.json();

  return body;
}

function Post() {
  const [isColor, setIsColor] = useState(true);
  const [selectColor, setSelectColor] = useState(null);
  const [background, setBackground] = useState([]);
  const [selectImage, setSelectImage] = useState(null);
  const [inputUser, setInputUser] = useState('');
  const [inputError, setInputError] = useState(null);
  const [btnDisable, setBtnDisable] = useState(true);

  const handleImageLoad = async () => {
    try {
      const response = await getAPI('/background-images/');
      const result = response.imageUrls;
      setBackground(result);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleImageLoad();
  }, []);

  const handleInput = (e) => {
    const { value } = e.target;
    setInputUser(value);
    setBtnDisable(value.trim() === '');
    setInputError(value.trim() === '');
  };

  const handleBlur = () => {
    setInputError(inputUser.trim() === '');
  };

  const toggleHandler = () => {
    setIsColor(!isColor);
    if (isColor) {
      setSelectImage(background[0]);
      setSelectColor(null);
    } else {
      setSelectColor('beige');
      setSelectImage(null);
    }
  };

  const handleColorChange = (color) => {
    setSelectColor(color);
    setSelectImage(null);
  };

  const handleImageChange = (image) => {
    setSelectImage(image);
    setSelectColor(null);
  };

  return (
    <PostPage>
      <Header />
      <PostSection>
        <PostInput>
          <InputTitle>To.</InputTitle>
          <Input
            placeholder="받는 사람 이름을 입력해 주세요"
            value={inputUser}
            onChange={handleInput}
            onBlur={handleBlur}
            error={inputError}
          />
          {inputError && <ErrorMessage>값을 입력해 주세요.</ErrorMessage>}
        </PostInput>
        <SelectSection />
        <SelectToggle onClick={toggleHandler}>
          {isColor ? (
            <>
              <OnButton>컬러</OnButton>
              <OffButton>이미지</OffButton>
            </>
          ) : (
            <>
              <OffButton>컬러</OffButton>
              <OnButton>이미지</OnButton>
            </>
          )}
        </SelectToggle>
        {isColor ? (
          <Select>
            <ColorOption
              color="orange"
              onClick={() => handleColorChange('beige')}
              selected={selectColor === 'beige'}
            >
              {selectColor === 'beige' && (
                <CheckIcon>
                  <img src="img/check.svg" alt="선택" />
                </CheckIcon>
              )}
            </ColorOption>
            <ColorOption
              color="purple"
              onClick={() => handleColorChange('purple')}
              selected={selectColor === 'purple'}
            >
              {selectColor === 'purple' && (
                <CheckIcon>
                  <img src="img/check.svg" alt="선택" />
                </CheckIcon>
              )}
            </ColorOption>
            <ColorOption
              color="blue"
              onClick={() => handleColorChange('blue')}
              selected={selectColor === 'blue'}
            >
              {selectColor === 'blue' && (
                <CheckIcon>
                  <img src="img/check.svg" alt="선택" />
                </CheckIcon>
              )}
            </ColorOption>
            <ColorOption
              color="green"
              onClick={() => handleColorChange('green')}
              selected={selectColor === 'green'}
            >
              {selectColor === 'green' && (
                <CheckIcon>
                  <img src="img/check.svg" alt="선택" />
                </CheckIcon>
              )}
            </ColorOption>
          </Select>
        ) : (
          <Select>
            <ImageOption
              image={background[0]}
              onClick={() => handleImageChange(background[0])}
              selected={selectImage === background[0]}
            >
              {selectImage === background[0] && (
                <CheckIcon>
                  <img src="img/check.svg" alt="선택" />
                </CheckIcon>
              )}
            </ImageOption>
            <ImageOption
              image={background[1]}
              onClick={() => handleImageChange(background[1])}
              selected={selectImage === background[1]}
            >
              {selectImage === background[1] && (
                <CheckIcon>
                  <img src="img/check.svg" alt="선택" />
                </CheckIcon>
              )}
            </ImageOption>
            <ImageOption
              image={background[2]}
              onClick={() => handleImageChange(background[2])}
              selected={selectImage === background[2]}
            >
              {selectImage === background[2] && (
                <CheckIcon>
                  <img src="img/check.svg" alt="선택" />
                </CheckIcon>
              )}
            </ImageOption>
            <ImageOption
              image={background[3]}
              onClick={() => handleImageChange(background[3])}
              selected={selectImage === background[3]}
            >
              {selectImage === background[3] && (
                <CheckIcon>
                  <img src="img/check.svg" alt="선택" />
                </CheckIcon>
              )}
            </ImageOption>
          </Select>
        )}
        <PostButton btnDisable={btnDisable} />
      </PostSection>
    </PostPage>
  );
}

const PostPage = styled.div`
  display: flex;
  flex-direction: column;
`;

const PostSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: left;
  background: var(--white);
  margin: 57px auto;
  width: 720px;
  text-align: left;

  @media (max-width: 768px) {
    width: 320px;
  }
`;

const PostInput = styled.div`
  display: inline-flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
`;

const InputTitle = styled.p`
  color: var(--gray-900, #181818);
  font-family: Pretendard;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 42px; /* 175% */
  letter-spacing: -0.24px;
`;

const Input = styled.input`
  display: flex;
  width: 720px;
  padding: 12px 16px;
  align-items: center;
  gap: 10px;
  border-radius: 8px;
  border: 1px solid var(--gray300);
  border: ${(props) => props.error && '2px solid var(--error)'};
  background: var(--white);

  &::placeholder {
    color: var(--gray500);
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 26px;
    letter-spacing: -0.16px;
  }

  @media (max-width: 768px) {
    width: 320px;
  }
`;

const ErrorMessage = styled.div`
  color: red;
  font-size: 12px;
`;

const SelectToggle = styled.div`
  display: inline-flex;
  align-items: flex-start;
  margin-top: 24px;
`;

const BtnCommon = styled.button`
  display: flex;
  width: 122px;
  height: 40px;
  padding: 7px 16px;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const OnButton = styled(BtnCommon)`
  border-radius: 6px;
  border: 2px solid var(--purple600);
  background: var(--white, #fff);

  color: var(--purple700);
  text-align: center;
  /* Font/16 Bold */
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 26px; /* 162.5% */
  letter-spacing: -0.16px;
`;

const OffButton = styled(BtnCommon)`
  border-radius: 6px;
  background: var(--gray100);

  color: var(--gray900);
  text-align: center;
  /* Font/16 Regular */
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 26px; /* 162.5% */
  letter-spacing: -0.16px;
`;

const Select = styled.div`
  width: 720px;
  display: flex;
  justify-content: space-between;
  margin-top: 45px;
  margin-bottom: 45px;
  flex-wrap: wrap;
  flex-direction: row;
  flex-shrink: 0;

  @media (max-width: 768px) {
    width: 320px;
  }
`;

const CheckIcon = styled.div`
  position: absolute;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
  width: 44px;
  height: 44px;
  padding: 10px;
  border-radius: 100px;
  background: var(--gray500);
  align-items: center;
  justify-content: center;
`;

const ColorOption = styled.div`
  position: relative;
  width: 168px;
  height: 168px;
  background-color: var(
    --${(props) => (props.color === 'begie' ? 'orange' : props.color)}200
  );
  margin: 5px;
  border-radius: 16px;
  border: 1px solid rgba(0, 0, 0, 0.08);
  cursor: pointer;

  @media (max-width: 768px) {
    width: 154px;
    height: 154px;
    margin: 12px 0;
  }
`;

const ImageOption = styled.div`
  position: relative;
  background: url(${(props) => props.image}) lightgray 50% / cover no-repeat;
  opacity: ${(props) => (props.selected ? '0.5' : '1')};
  width: 168px;
  height: 168px;
  margin: 5px;
  border-radius: 16px;
  border: 1px solid rgba(0, 0, 0, 0.08);
  cursor: pointer;

  @media (max-width: 768px) {
    width: 154px;
    height: 154px;
    margin: 12px 0;
  }
`;

export default Post;
