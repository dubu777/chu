import React, { Component } from 'react';

export default class OpenViduVideoComponent extends Component {

    constructor(props) {
        // 컴포넌트 마운트 되기 전 this.props 사용하기 위해 호출
        super(props);
        // HTML video 요소를 가져오기
        this.videoRef = React.createRef();
    }
 
    componentDidUpdate(props) {
        if (props && !!this.videoRef) {
            this.props.streamManager.addVideoElement(this.videoRef.current);
        }
    }

    componentDidMount() {
        if (this.props && !!this.videoRef) {
            // 컴포넌트 랜더링 후, HTML video 요소를 한번 수신
            this.props.streamManager.addVideoElement(this.videoRef.current);
        }
    }

    render() {
        return <video autoPlay={true} ref={this.videoRef} />;
    }

}


// import React, { useEffect, useRef } from 'react';

// const OpenViduVideoComponent = (props) => {
//   const videoRef = useRef(null);

//   useEffect(() => {
//     if (props && !!videoRef.current) {
//       props.streamManager.addVideoElement(videoRef.current);
//     }

//     return () => {
//       // 컴포넌트가 unmount될 때 실행될 클린업 함수
//       // 예를 들어, 스트림 매니저에서 비디오 엘리먼트를 제거하는 로직을 추가할 수 있습니다.
//     };
//   }, [props]);

//   return <video autoPlay={true} ref={videoRef} />;
// };

// export default OpenViduVideoComponent;

