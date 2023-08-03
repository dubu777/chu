import axios from "axios";

export const listinfo = async(seq)=> {
    try {
        const response = await axios.get('http://localhost:9090/api/designer/search/review-score',{
            "customerSeq" : seq
        })
        return response.data.result
    } catch(error) {
        throw new Error('데이터 못가져옴')
    }

};
   
