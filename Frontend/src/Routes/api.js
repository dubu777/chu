const dataObject = {
  "customerSeq" : 2
};
export function getMovies() {

  return axios.get(`${BASE_PATH}/movie/now_playing?`, { params: dataObject })
    .then(response => response.data);
}

