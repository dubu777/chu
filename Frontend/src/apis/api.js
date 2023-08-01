import axios from "axios";

export const getByRating = async () => {
  try{
    const response = await axios.get("https://ssafy-chu-default-rtdb.firebaseio.com/");
    console.log(response.data);
    return response.data   
  }
  catch(error){
    console.log(error);
  }
}