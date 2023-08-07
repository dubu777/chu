import React, { Component } from "react";
import { OpenVidu } from "openvidu-browser";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
// import { styled } from '@emotion/styled';
import styled from "styled-components";
import UserVideoComponent from "./UserVideoComponent";
import VideocamOutlinedIcon from "@mui/icons-material/VideocamOutlined";
import MicOutlinedIcon from "@mui/icons-material/MicOutlined";
import HeadsetIcon from "@mui/icons-material/Headset";
import VideocamOffOutlinedIcon from "@mui/icons-material/VideocamOffOutlined";
import MicOffIcon from "@mui/icons-material/MicOff";
import HeadsetOffIcon from "@mui/icons-material/HeadsetOff"; 
import CallEndIcon from "@mui/icons-material/CallEnd";
import ChatIcon from "@mui/icons-material/Chat";
// import ChatBox from "../Chat/ChatBox";

// 로컬 미디어 서버 주소
const OPENVIDU_SERVER_URL = 'https://' + 'i9b111.q.ssafy.io' + ':8443';
const OPENVIDU_SERVER_SECRET = "sunjin";

// 전체 화면
const Container = styled.div`
  /* height: 100vh; */
  width: 100%;
  background-color: #373631;
`;

const Header = styled.div`
  height: 8vh;
  display: flex;
  align-items: center;
  padding: 0 50px;
  justify-content: center;
`;

const StudyTitle = styled.p`
  color: white;
  font-size: 20px;
  font-weight: 600;
`;

const Middle = styled.div`
  width: 100%;
  /* display: flex; */
  overflow: hidden;
`;

const Left = styled.div`
  /* flex: 3;
  width: 100%;
  display: flex; */
  /* justify-content: right; */
`;

const Right = styled.div`
  position: relative;
  padding: 0 20px;
  display: flex;
  align-items: center;
  transition: 0.5s;
  ${(props) =>
    props.primary ? `right:0; flex:1;` : `right:calc(-100vw/3); flex:0;`}
`;

const Chat = styled.div`
  width: 100%;
  height: 93%;
  border-radius: 5px;
  background-color: white;
  display: flex;
`;

const VideoContainer = styled.div`
  /* margin-top: 30px; */
  /* width: 50%; */
  height: 77vh;
  /* overflow: hidden; */
  /* display: flex; */
  justify-content: center;
`;

const StreamContainerWrapper = styled.div`
  display: grid;
  place-items: center;
  ${(props) =>
    props.primary
      ? `
    grid-template-columns: repeat(3, 1fr);
    `
      : `
    grid-template-columns: repeat(4, 1fr);
    `}
  grid-gap: 20px;
  height: 100px;
  padding: 10px;
  @media screen and (max-width: 800px) {
    /* 카메라 뒤 흰 배경 */
    background-color: #ffffff;
  }
`;

const StreamContainer = styled.div`
  width: 100%;
  position: relative;
  border-radius: 5px;
  /* min-height: 34vh;
  overflow: hidden; */
  box-sizing: border-box;
`;

const Bottom = styled.div`
  height: 13vh;
  display: flex;
  justify-content: center;
  position: relative;
  align-items: center;
`;

const BottomBox = styled.div`
  display: flex;
  height: 100%;
  width: 20%;
  align-items: center;
  justify-content: space-around;
`;

const Icon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #333;
  color: white;
  cursor: pointer;
  transition: 0.1s;
  &:hover {
    background-color: #3c4043;
  }

  ${(props) =>
    props.primary &&
    `
      background-color: red;
      color: white;
      &:hover{
          background-color: red;
      }
    `}
`;

const ChatIconBox = styled.div`
  position: absolute;
  color: white;
  right: 60px;
  top: 50%;
  bottom: 50%;
  cursor: pointer;
`;

const JoinInput = styled.input`
    width: 100px ;
    height: 30px;
    border-radius: 0.4rem;
    border: 0;
    background-color: #555142;
    color: white;
`;
const Hr = styled.hr`
  color  : beige;
  opacity: 50%;
  width: 80%;
`;
const StartText = styled.h1`
    margin-bottom: 40px;
    font-size: 20px;
    /* color: black; */
`;
const JoinBox = styled.div`
  display  : flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  /* width: 50%; */
  border: 2px solid;
  padding: 50px;
  border-radius: 0.5rem;
  background-color: beige;
  color: black;
  
`;
const ConsultBox = styled.div`
  width : 600px;
  height: 350px;
  background-color: black;
  margin-left: 400px;
  margin-bottom: 20px;
`;
const ImageBox = styled.div`
    display: flex;
    justify-content: space-around;
    margin-left: 400px;
`;
const Img = styled.img`
    /* width: 200px;
    height: 300px; */
    margin-right: 10px;
`;

// 버튼 클릭 핸들러
// const getSessionId = () => {
//   // API URL
//   // const apiUrl = 'https://i9b111.q.io.ssafy.io/api/consulting/{상담 번호}';

//   // API 호출
//   axios.get(apiUrl)
//     .then(response => {
//       // API로부터 받아온 데이터를 상태에 저장
      
//     })
//     .catch(error => {
//       console.error('Error fetching data:', error);
//     });
// };

class ViduRoom extends Component {
    
  render() {
    return (
      <Container>
        <Header>
          <StudyTitle>Hair Consulting</StudyTitle>
        </Header>

        {/* <button onClick={getSessionId}>상담 번호에 따른 세션 아이디</button> */}

        <Hr />
        <Middle>
          {this.state.session === undefined ? (
            <div
              style={{
                position: "absolute",
                right: "0",
                left: "0",
                top: "40%",
                width: "400px",
                margin: "auto",
                height: "300px",
              }}
              id="join"
            >
              <JoinBox>
                <StartText style={{ color: "black" }}> 상담이 곧 시작됩니다 🙂 </StartText>
                <form
                  style={{ display: "flex", justifyContent: "center" }}
                  className="form-group"
                  onSubmit={this.joinSession}
                >
                  <p className="text-center">
                    <JoinInput
                      className="btn btn-lg btn-success"
                      name="commit"
                      type="submit"
                      value="Start"
                    />
                  </p>
                </form>
              </JoinBox>
            </div>
          ) : null}
          <Left>
            <VideoContainer>
              {this.state.session !== undefined ? (
                <StreamContainerWrapper
                  primary={this.state.isChat}
                  ref={this.userRef}
                >
                  {this.state.publisher !== undefined ? (
                    <StreamContainer key={this.state.publisher.stream.streamId}>
                      {/* 비디오 */}
                      <UserVideoComponent
                        streamManager={this.state.publisher}
                      />
                      <UserVideoComponent
                        streamManager={this.state.publisher}
                      />
                    </StreamContainer>
                  ) : null}
                  {this.state.subscribers.map((sub, i) => (
                    <StreamContainer key={sub.stream.streamId}>
                      <UserVideoComponent streamManager={sub} />
                    </StreamContainer>
                  ))}
                </StreamContainerWrapper>
              ) : null}
              <div>
                        <ConsultBox></ConsultBox>
                        <ImageBox>
                          <Img src="icon/designerimg.png" alt="여기에 헤어 사진" />
                          <Img src="icon/designerimg.png" alt="여기에 헤어 사진" />
                          <Img src="icon/designerimg.png" alt="여기에 헤어 사진" />
                          <Img src="icon/designerimg.png" alt="여기에 헤어 사진" />
                          <Img src="icon/designerimg.png" alt="여기에 헤어 사진" />
                        </ImageBox>
                  </div>
            </VideoContainer>
          </Left>
          {/* <Right primary={this.state.isChat}>
            <Chat>
              <ChatBox />
            </Chat>
          </Right> */}
        </Middle>
        <Bottom>
          <BottomBox>
            <Icon
              primary={!this.state.isCamera}
              onClick={() => this.handleToggle("camera")}
            >
              {this.state.isCamera ? (
                <VideocamOutlinedIcon />
              ) : (
                <VideocamOffOutlinedIcon />
              )}
            </Icon>

            <Icon
              primary={!this.state.isMike}
              onClick={() => this.handleToggle("mike")}
            >
              {this.state.isMike ? <MicOutlinedIcon /> : <MicOffIcon />}
            </Icon>

            <Icon
              primary={!this.state.isSpeaker}
              onClick={() => this.handleToggle("speaker")}
            >
              {this.state.isSpeaker ? <HeadsetIcon /> : <HeadsetOffIcon />}
            </Icon>

            <Icon primary onClick={this.leaveSession}>
                {/* 상담 종료 버튼 */}
                <Link to="/"><CallEndIcon /></Link>
            </Icon>
          </BottomBox>
          <ChatIconBox
            onClick={() => this.setState({ isChat: !this.state.isChat })}
          >
            <ChatIcon />
          </ChatIconBox>
        </Bottom>
      </Container>
    );
  }

  constructor(props) {
    super(props);
    this.userRef = React.createRef();

    this.state = {
      mySessionId: "1",
      myUserName: "Participant" + Math.floor(Math.random() * 100),
      session: undefined,
      mainStreamManager: undefined,
      publisher: undefined, // 로컬 웹캠 스트림
      subscribers: [], // 다른 사용자의 활성 스트림
      isMike: true,
      isCamera: true,
      isSpeaker: true,
      isChat: false,
    };

    this.joinSession = this.joinSession.bind(this);
    this.leaveSession = this.leaveSession.bind(this);
    this.handleMainVideoStream = this.handleMainVideoStream.bind(this);
    this.onbeforeunload = this.onbeforeunload.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.createSessionAndGenerateURL = this.createSessionAndGenerateURL.bind(this);
  }

//   componentDidMount() {
//     // this.leaveSession();
//     window.addEventListener("beforeunload", this.onbeforeunload);
//     // 스터디방에서 화상회의 입장 -> props로 roomId로 받으면 세션id 업뎃 user 정보 전역변수 가져옴 -> 상태값 업뎃
//   }
async componentDidMount() {
    // createAndJoinNewRoom() 함수 호출
    const sessionURL = await this.createSessionAndGenerateURL();
    console.log('새로운 방의 URL:', sessionURL);
    // 이후에 sessionURL을 원하는 곳으로 전달하거나 사용할 수 있습니다.
  }

  componentWillUnmount() {
    window.removeEventListener("beforeunload", this.onbeforeunload);
  }

  onbeforeunload(e) {
    this.leaveSession();
  }

  // 화상회의 나갈때
  leaveSession() {
    const mySession = this.state.session;

    if (mySession) {
      mySession.disconnect();
    }

    this.OV = null;
    this.setState({
      session: undefined,
      subscribers: [],
      mySessionId: undefined,
      myUserName: undefined,
      mainStreamManager: undefined,
      publisher: undefined,
    });
  }

  deleteSubscriber(streamManager) {
    let subscribers = this.state.subscribers;
    let index = subscribers.indexOf(streamManager, 0);
    if (index > -1) {
      subscribers.splice(index, 1);
      this.setState({ subscribers: subscribers });
    }
  }

  handleMainVideoStream(stream) {
    if (this.state.mainStreamManager !== stream) {
      this.setState({ mainStreamManager: stream });
    }
  }

  handleToggle(kind) {
    if (this.state.publisher) {
      switch (kind) {
        case "camera":
          this.setState({ isCamera: !this.state.isCamera }, () => {
            console.log(this.state.publisher);
            this.state.publisher.publishVideo(this.state.isCamera);
          });
          break;

        case "speaker":
          this.setState({ isSpeaker: !this.state.isSpeaker }, () => {
            this.state.subscribers.forEach((s) =>
              s.subscribeToAudio(this.state.isSpeaker)
            );
          });
          break;

        case "mike":
          this.setState({ isMike: !this.state.isMike }, () => {
            this.state.publisher.publishAudio(this.state.isMike);
          });
          break;
      }
    }
  }

  async joinSession() {
    this.OV = new OpenVidu(); // OpenVidu 객체를 얻음

    this.OV.setAdvancedConfiguration({
      publisherSpeakingEventsOptions: {
        interval: 50,
        threshold: -75,
      },
    });

    this.setState(
      {
        session: this.OV.initSession(),
      },
      () => {
        let mySession = this.state.session;

        // Session 객체가 각각 새로운 stream에 대해 구독 후, subscribers 상태값 업뎃
        mySession.on("streamCreated", (e) => {
          // OpenVidu -> Session -> 102번째 줄 확인 UserVideoComponent를 사용하기 때문에 2번째 인자로 HTML
          // 요소 삽입X
          let subscriber = mySession.subscribe(e.stream, undefined);
          var subscribers = this.state.subscribers;
          subscribers.push(subscriber);

          this.setState({ subscribers });

          console.log(subscribers);
        });

        // 사용자가 화상회의를 떠나면 Session 객체에서 소멸된 stream을 받아와 subscribers 상태값 업뎃
        mySession.on("streamDestroyed", (e) => {
          this.deleteSubscriber(e.stream.streamManager);
        });

        // 서버 측에서 비동기식 오류 발생 시 Session 객체에 의해 트리거되는 이벤트
        mySession.on("exception", (exception) => {
          console.warn(exception);
        });

        // 발언자 감지
        mySession.on("publisherStartSpeaking", (event) => {
          for (let i = 0; i < this.userRef.current.children.length; i++) {
            if (
              JSON.parse(event.connection.data).clientData ===
              this.userRef.current.children[i].innerText
            ) {
              this.userRef.current.children[i].style.borderStyle = "solid";
              this.userRef.current.children[i].style.borderColor = "#1773EA";
            }
          }
          console.log(
            "User " + event.connection.connectionId + " start speaking"
          );
        });

        mySession.on("publisherStopSpeaking", (event) => {
          console.log(
            "User " + event.connection.connectionId + " stop speaking"
          );
          for (let i = 0; i < this.userRef.current.children.length; i++) {
            if (
              JSON.parse(event.connection.data).clientData ===
              this.userRef.current.children[i].innerText
            ) {
              this.userRef.current.children[i].style.borderStyle = "none";
            }
          }
        });

        this.getToken().then((token) => {
          mySession
            .connect(token, {
              clientData: this.state.myUserName,
            })
            .then(() => {
              let publisher = this.OV.initPublisher(undefined, {
                audioSource: undefined,
                videoSource: undefined, // 웹캠 기본 값으로
                publishAudio: true,
                publishVideo: true,
                resolution: "640x480",
                frameRate: 30,
                insertMode: "APPEND",
                mirror: "false",
              });

              mySession.publish(publisher);

              this.setState({ mainStreamManager: publisher, publisher });
            })
            .catch((error) => {
              console.log("세션 연결 오류", error.code, error.message);
            });
        });
      }
    );
  }

  getToken() {
    return this.createSession(this.state.mySessionId).then((sessionId) =>
      this.createToken(sessionId)
    );
  }

  
//   createSession(sessionId) {
//     return new Promise((resolve, reject) => {
//       let data = JSON.stringify({ customSessionId: sessionId });

//       axios
//         .post(OPENVIDU_SERVER_URL + "/openvidu/api/sessions", data, {
//           headers: {
//             Authorization: `Basic ${btoa(
//               `OPENVIDUAPP:${OPENVIDU_SERVER_SECRET}`
//             )}`,
//             "Content-Type": "application/json",
//           },
//         })
//         .then((res) => {
//           resolve(res.data.id);
//         })
//         .catch((res) => {
//           let error = Object.assign({}, res);

//           if (error?.response?.status === 409) {
//             resolve(sessionId);
//           } else if (
//             window.confirm(
//               'No connection to OpenVidu Server. This may be a certificate error at "' +
//                 OPENVIDU_SERVER_URL +
//                 '"\n\nClick OK to navigate and accept it. If no certifica' +
//                 "te warning is shown, then check that your OpenVidu Server is up and running at" +
//                 ' "' +
//                 OPENVIDU_SERVER_URL +
//                 '"'
//             )
//           ) {
//             window.location.assign(OPENVIDU_SERVER_URL + "/accept-certificate");
//           }
//         });
//     });
//   }

// 방 개설자가 방을 생성하고 세션의 고유 ID를 얻는 함수
async createSession() {
    const response = await fetch(`${OPENVIDU_SERVER_URL}/openvidu/api/sessions`, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${btoa(`OPENVIDUAPP:${OPENVIDU_SERVER_SECRET}`)}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}),
    });
  
    const data = await response.json();
    const sessionId = data.id;
    return sessionId;
  }
  
  // 방 개설자가 세션을 생성하고 URL을 얻는 과정
  async createSessionAndGenerateURL() {
    try {
      const sessionId = await this.createSession.bind(this)();
      const sessionURL = this.generateSessionURL(sessionId);
      console.log('생성된 세션 ID:', sessionId);
      console.log('생성된 세션 URL:', sessionURL);
      return sessionURL;
    } catch (error) {
      console.error('세션 생성 및 URL 생성 오류:', error);
      return null;
    }
  }
   // URL 생성 함수
   generateSessionURL(sessionId) {
    return `${window.location.origin}/join?sessionId=${sessionId}`;
  }

  async createAndJoinNewRoom() {
    try {
      const sessionURL = await this.createSessionAndGenerateURL();
      console.log('새로운 방의 URL:', sessionURL);
      // 이후에 sessionURL을 원하는 곳으로 전달하거나 사용할 수 있습니다.
    } catch (error) {
      console.error('방 생성 및 URL 생성 오류:', error);
    }
  }

  // createToken 함수를 async로 수정
async createToken(sessionId) {
    try {
      const res = await axios.post(
        `${OPENVIDU_SERVER_URL}/openvidu/api/sessions/${sessionId}/connection`,
        {},
        {
          headers: {
            Authorization: `Basic ${btoa(`OPENVIDUAPP:${OPENVIDU_SERVER_SECRET}`)}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(res.data.token)
      return res.data.token;
    } catch (error) {
      throw error;
    }
  }
}
//   createToken(sessionId) {
//     return new Promise((resolve, reject) => {
//       let data = {};

//       axios
//         .post(
//           `${OPENVIDU_SERVER_URL}/openvidu/api/sessions/${sessionId}/connection`,
//           data,
//           {
//             headers: {
//               Authorization: `Basic ${btoa(
//                 `OPENVIDUAPP:${OPENVIDU_SERVER_SECRET}`
//               )}`,
//               "Content-Type": "application/json",
//             },
//           }
//         )
//         .then((res) => {
//           resolve(res.data.token);
//         })
//         .catch((error) => reject(error));
//     });
//   }
// }

export default ViduRoom;

// import axios from 'axios';
// import { OpenVidu } from 'openvidu-browser';
// import React, { Component } from 'react';
// import './ViduRoom.css';
// import UserVideoComponent from './UserVideoComponent';

// const OPENVIDU_SERVER_URL = 'https://' + window.location.hostname + ':4443';
// const OPENVIDU_SERVER_SECRET = 'MY_SECRET';


// class ViduRoom extends Component {
//     constructor(props) {
//         super(props);

//         this.state = {
//             mySessionId: 'SessionA',
//             myUserName: 'Participant' + Math.floor(Math.random() * 100),
//             session: undefined,
//             mainStreamManager: undefined,
//             publisher: undefined,
//             subscribers: [],
//         };

//         this.joinSession = this.joinSession.bind(this);
//         this.leaveSession = this.leaveSession.bind(this);
//         this.switchCamera = this.switchCamera.bind(this);
//         this.handleChangeSessionId = this.handleChangeSessionId.bind(this);
//         this.handleChangeUserName = this.handleChangeUserName.bind(this);
//         this.handleMainVideoStream = this.handleMainVideoStream.bind(this);
//         this.onbeforeunload = this.onbeforeunload.bind(this);
//     }

//     componentDidMount() {
//         window.addEventListener('beforeunload', this.onbeforeunload);
//     }

//     componentWillUnmount() {
//         window.removeEventListener('beforeunload', this.onbeforeunload);
//     }

//     onbeforeunload(event) {
//         this.leaveSession();
//     }

//     handleChangeSessionId(e) {
//         this.setState({
//             mySessionId: e.target.value,
//         });
//     }

//     handleChangeUserName(e) {
//         this.setState({
//             myUserName: e.target.value,
//         });
//     }

//     handleMainVideoStream(stream) {
//         if (this.state.mainStreamManager !== stream) {
//             this.setState({
//                 mainStreamManager: stream
//             });
//         }
//     }

//     deleteSubscriber(streamManager) {
//         let subscribers = this.state.subscribers;
//         let index = subscribers.indexOf(streamManager, 0);
//         if (index > -1) {
//             subscribers.splice(index, 1);
//             this.setState({
//                 subscribers: subscribers,
//             });
//         }
//     }

//     joinSession() {
//         // --- 1) Get an OpenVidu object ---
//         console.log("조인!!!!")

//         this.OV = new OpenVidu();

//         // --- 2) Init a session ---
//         this.setState(
//             {
//                 session: this.OV.initSession(),
//             },
//             () => {
//                 var mySession = this.state.session;

//                 // --- 3) Specify the actions when events take place in the session ---

//                 // On every new Stream received...
//                 mySession.on('streamCreated', (event) => {
//                     // Subscribe to the Stream to receive it. Second parameter is undefined
//                     // so OpenVidu doesn't create an HTML video by its own
//                     var subscriber = mySession.subscribe(event.stream, undefined);
//                     var subscribers = this.state.subscribers;
//                     subscribers.push(subscriber);

//                     // Update the state with the new subscribers
//                     this.setState({
//                         subscribers: subscribers,
//                     });
//                 });

//                 // On every Stream destroyed...
//                 mySession.on('streamDestroyed', (event) => {

//                     // Remove the stream from 'subscribers' array
//                     this.deleteSubscriber(event.stream.streamManager);
//                 });

//                 // On every asynchronous exception...
//                 mySession.on('exception', (exception) => {
//                     console.warn(exception);
//                 });

//                 // --- 4) Connect to the session with a valid user token ---

//                 // 'getToken' method is simulating what your server-side should do.
//                 // 'token' parameter should be retrieved and returned by your own backend
//                 this.getToken().then((token) => {
//                     // First param is the token got from OpenVidu Server. Second param can be retrieved by every user on event
//                     // 'streamCreated' (property Stream.connection.data), and will be appended to DOM as the user's nickname
//                     mySession
//                         .connect(
//                             token,
//                             { clientData: this.state.myUserName },
//                         )
//                         .then(async () => {
//                             var devices = await this.OV.getDevices();
//                             var videoDevices = devices.filter(device => device.kind === 'videoinput');

//                             // --- 5) Get your own camera stream ---

//                             // Init a publisher passing undefined as targetElement (we don't want OpenVidu to insert a video
//                             // element: we will manage it on our own) and with the desired properties
//                             let publisher = this.OV.initPublisher(undefined, {
//                                 audioSource: undefined, // The source of audio. If undefined default microphone
//                                 videoSource: videoDevices[0].deviceId, // The source of video. If undefined default webcam
//                                 publishAudio: true, // Whether you want to start publishing with your audio unmuted or not
//                                 publishVideo: true, // Whether you want to start publishing with your video enabled or not
//                                 resolution: '640x480', // The resolution of your video
//                                 frameRate: 30, // The frame rate of your video
//                                 insertMode: 'APPEND', // How the video is inserted in the target element 'video-container'
//                                 mirror: false, // Whether to mirror your local video or not
//                             });

//                             // --- 6) Publish your stream ---

//                             mySession.publish(publisher);

//                             // Set the main video in the page to display our webcam and store our Publisher
//                             this.setState({
//                                 currentVideoDevice: videoDevices[0],
//                                 mainStreamManager: publisher,
//                                 publisher: publisher,
//                             });
//                         })
//                         .catch((error) => {
//                             console.log('There was an error connecting to the session:', error.code, error.message);
//                         });
//                 });
//             },
//         );
//     }

//     leaveSession() {

//         // --- 7) Leave the session by calling 'disconnect' method over the Session object ---

//         const mySession = this.state.session;

//         if (mySession) {
//             mySession.disconnect();
//         }

//         // Empty all properties...
//         this.OV = null;
//         this.setState({
//             session: undefined,
//             subscribers: [],
//             mySessionId: 'SessionA',
//             myUserName: 'Participant' + Math.floor(Math.random() * 100),
//             mainStreamManager: undefined,
//             publisher: undefined
//         });
//     }

//     async switchCamera() {
//         try{
//             const devices = await this.OV.getDevices()
//             var videoDevices = devices.filter(device => device.kind === 'videoinput');

//             if(videoDevices && videoDevices.length > 1) {

//                 var newVideoDevice = videoDevices.filter(device => device.deviceId !== this.state.currentVideoDevice.deviceId)

//                 if (newVideoDevice.length > 0){
//                     // Creating a new publisher with specific videoSource
//                     // In mobile devices the default and first camera is the front one
//                     var newPublisher = this.OV.initPublisher(undefined, {
//                         videoSource: newVideoDevice[0].deviceId,
//                         publishAudio: true,
//                         publishVideo: true,
//                         mirror: true
//                     });

//                     //newPublisher.once("accessAllowed", () => {
//                     await this.state.session.unpublish(this.state.mainStreamManager)

//                     await this.state.session.publish(newPublisher)
//                     this.setState({
//                         currentVideoDevice: newVideoDevice,
//                         mainStreamManager: newPublisher,
//                         publisher: newPublisher,
//                     });
//                 }
//             }
//           } catch (e) {
//             console.error(e);
//           }
//     }

//     render() {
//         const mySessionId = this.state.mySessionId;
//         const myUserName = this.state.myUserName;

//         return (
//             <div className="container">
//                 {this.state.session === undefined ? (
//                     <div id="join">
//                         <div id="img-div">
//                             <img src="resources/images/openvidu_grey_bg_transp_cropped.png" alt="OpenVidu logo" />
//                         </div>
//                         <div id="join-dialog" className="jumbotron vertical-center">
//                             <h1> Join a video session </h1>
//                             <form className="form-group" onSubmit={this.joinSession}>
//                                 <p>
//                                     {/* 비두 진입 화면 */}
//                                     <label>Participant: </label>
//                                     <input
//                                         className="form-control"
//                                         type="text"
//                                         id="userName"
//                                         value={myUserName}
//                                         onChange={this.handleChangeUserName}
//                                         required
//                                     />
//                                 </p>
//                                 <p>
//                                     <label> Session: </label>
//                                     <input
//                                         className="form-control"
//                                         type="text"
//                                         id="sessionId"
//                                         value={mySessionId}
//                                         onChange={this.handleChangeSessionId}
//                                         required
//                                     />
//                                 </p>
//                                 <p className="text-center">
//                                     <input className="btn btn-lg btn-success" name="commit" type="submit" value="Click" />
//                                 </p>
//                             </form>
//                         </div>
//                     </div>
//                 ) : null}

//                 {this.state.session !== undefined ? (
//                     <div id="session">
//                         <div id="session-header">
//                             <h1 id="session-title">{mySessionId}</h1>
//                             <input
//                                 className="btn btn-large btn-danger"
//                                 type="button"
//                                 id="buttonLeaveSession"
//                                 onClick={this.leaveSession}
//                                 value="Leave session"
//                             />
//                         </div>

//                         {this.state.mainStreamManager !== undefined ? (
//                             <div id="main-video" className="col-md-6">
//                                 <UserVideoComponent streamManager={this.state.mainStreamManager} />
//                                 <input
//                                     className="btn btn-large btn-success"
//                                     type="button"
//                                     id="buttonSwitchCamera"
//                                     onClick={this.switchCamera}
//                                     value="Switch Camera"
//                                 />
//                             </div>
//                         ) : null}
//                         <div id="video-container" className="col-md-6">
//                             {this.state.publisher !== undefined ? (
//                                 <div className="stream-container col-md-6 col-xs-6" onClick={() => this.handleMainVideoStream(this.state.publisher)}>
//                                     <UserVideoComponent
//                                         streamManager={this.state.publisher} />
//                                 </div>
//                             ) : null}
//                             {this.state.subscribers.map((sub, i) => (
//                                 <div key={i} className="stream-container col-md-6 col-xs-6" onClick={() => this.handleMainVideoStream(sub)}>
//                                     <UserVideoComponent streamManager={sub} />
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                 ) : null}
//             </div>
//         );
//     }

//     /**
//      * --------------------------
//      * SERVER-SIDE RESPONSIBILITY
//      * --------------------------
//      * These methods retrieve the mandatory user token from OpenVidu Server.
//      * This behavior MUST BE IN YOUR SERVER-SIDE IN PRODUCTION (by using
//      * the API REST, openvidu-java-client or openvidu-node-client):
//      *   1) Initialize a Session in OpenVidu Server	(POST /openvidu/api/sessions)
//      *   2) Create a Connection in OpenVidu Server (POST /openvidu/api/sessions/<SESSION_ID>/connection)
//      *   3) The Connection.token must be consumed in Session.connect() method
//      */

//     getToken() {
//         return this.createSession(this.state.mySessionId).then((sessionId) => this.createToken(sessionId));
//     }

//     createSession(sessionId) {
//         return new Promise((resolve, reject) => {
//             var data = JSON.stringify({ customSessionId: sessionId });
//             axios
//                 .post(OPENVIDU_SERVER_URL + '/openvidu/api/sessions', data, {
//                     headers: {
//                         Authorization: 'Basic ' + btoa('OPENVIDUAPP:' + OPENVIDU_SERVER_SECRET),
//                         'Content-Type': 'application/json',
//                     },
//                 })
//                 .then((response) => {
//                     console.log('CREATE SESION', response);
//                     resolve(response.data.id);
//                 })
//                 .catch((response) => {
//                     var error = Object.assign({}, response);
//                     if (error?.response?.status === 409) {
//                         resolve(sessionId);
//                     } else {
//                         console.log(error);
//                         console.warn(
//                             'No connection to OpenVidu Server. This may be a certificate error at ' +
//                             OPENVIDU_SERVER_URL,
//                         );
//                         if (
//                             window.confirm(
//                                 'No connection to OpenVidu Server. This may be a certificate error at "' +
//                                 OPENVIDU_SERVER_URL +
//                                 '"\n\nClick OK to navigate and accept it. ' +
//                                 'If no certificate warning is shown, then check that your OpenVidu Server is up and running at "' +
//                                 OPENVIDU_SERVER_URL +
//                                 '"',
//                             )
//                         ) {
//                             window.location.assign(OPENVIDU_SERVER_URL + '/accept-certificate');
//                         }
//                     }
//                 });
//         });
//     }

//     createToken(sessionId) {
//         return new Promise((resolve, reject) => {
//             var data = {};
//             axios
//                 .post(OPENVIDU_SERVER_URL + "/openvidu/api/sessions/" + sessionId + "/connection", data, {
//                     headers: {
//                         Authorization: 'Basic ' + btoa('OPENVIDUAPP:' + OPENVIDU_SERVER_SECRET),
//                         'Content-Type': 'application/json',
//                     },
//                 })
//                 .then((response) => {
//                     console.log('TOKEN', response);
//                     resolve(response.data.token);
//                 })
//                 .catch((error) => reject(error));
//         });
//     }
// }

// export default ViduRoom;