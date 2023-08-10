import axios from 'axios';

const BASE_URL = 'https://i9b111.q.ssafy.io/api';
// const BASE_URL = 'http://localhost:9090/api';

//고객 로그인 
export const customerlogIn = async (username, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/customer/sign-in`, {
      "id" : username,
      "pwd" : password
    });
    // 서버로부터 받은 토큰을 반환
    console.log("Server Response:", response.data);
    return response.data.result;
  } catch (error) {
    throw new Error('로그인 실패'); 
  }
};

// 디자이너 로그인
export const designerlogIn = async (username, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/designer/sign-in`, {
      "id" : username,
      "pwd" : password, 
    });
    return response.data.result;
  } catch (error) {
    throw new Error('로그인 실패');
  }
};

// 고객 아이디 찾기
export const customerFindId = async (username, useremail) => {
  try {
    const response = await axios.get(`${BASE_URL}/customer/find-id`, { params: {
      name: username,
      email: useremail,
    }});
    console.log(response.data.result)
    return response.data.result;
  } catch (error) {
    throw new Error('아이디 찾기 실패');
  }
};

export const customerFindPw = async (userid, username, useremail) => {
  try {
    const response = await axios.get(`${BASE_URL}/customer/find-pwd`, { params: {
      id: userid,
      name: username,
      email: useremail,
    }});
    console.log(response.data.result)
    return response.data.result;
  } catch (error) {
    throw new Error('통신 에러');
  }
};

export const designerFindId = async (username, useremail) => {
  try {
    const response = await axios.get(`${BASE_URL}/designer/find-id`, { params: {
      name: username,
      email: useremail,
    }});
    console.log(response.data.result)
    return response.data.result;
  } catch (error) {
    throw new Error('아이디 찾기 실패');
  }
};

export const designerFindPw = async (userid, username, useremail) => {
  try {
    const response = await axios.get(`${BASE_URL}/designer/find-pwd`, { params: {
      id: userid,
      name: username,
      email: useremail,
    }});
    console.log(response.data.result)
    return response.data.result;
  } catch (error) {
    throw new Error('통신 에러');
  }
};

export const signUpRequest = async (customerData) => {
  console.log(customerData);
  try {
    const response = await axios.post(`${BASE_URL}/customer/sign-up`, customerData);
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 디자이너 회원가입
export const designerSignUpRequest = async (designerData, formdata) => {
  console.log(designerData);
  console.log(formdata);
  try {
    const response = await axios.post(`${BASE_URL}/designer/sign-up`, designerData, formdata);
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 아이디 중복 체크
export const checkDuplicateId = async (id, userType) => {
  try {
    const response = await axios.get(`${BASE_URL}/user/check-id`, { 
      params : {
        "id" : id,
        "userType" : userType
      },
      headers: {
        'Content-Type': 'text-plain'
      }
    });
    return response.data.result;
  } catch (error) {
    throw error;
  }
};

// 이메일 중복 체크
export const checkDuplicateEmail = async (email, userType) => {
  try {
    console.log(email);
    const response = await axios.get(`${BASE_URL}/user/check-email`, { 
      params : {
        "email" : email,
        "userType" : userType,
      },
    });
    return response.data.result;
  } catch (error) {
    throw error;
  }
};

export const changePwdCustomer = async (seq, newPassword) => {
  try{
    console.log(newPassword);
    const response = await axios.put(`${BASE_URL}/customer/change-pwd`, {
      params: {
        "customerSeq" : seq,
        "pwd": newPassword,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export const changePwdDesigner = async (seq, newPassword) => {
  try{
    console.log(newPassword);
    const response = await axios.put(`${BASE_URL}/designer/change-pwd`, {
      params: {
        "designerSeq" : seq,
        "pwd": newPassword,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
