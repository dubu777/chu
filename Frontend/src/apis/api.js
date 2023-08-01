import axios from "axios";

export const getByRating = async () => {
  try{
    const response = await axios.get("");
    console.log(response.data);
    return response.data   
  }
  catch(error){
    console.log(error);
  }
}