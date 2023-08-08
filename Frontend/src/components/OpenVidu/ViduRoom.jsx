/* eslint-disable */
import React, { Component } from "react";
import { OpenVidu } from "openvidu-browser";
import axios from "axios";
import { Link, useNavigate, useHistory } from "react-router-dom";
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
  background-color: #fffdf5;
`;

const Header = styled.div`
  height: 6vh;
  display: flex;
  align-items: center;
  padding: 0 50px;
  justify-content: center;
`;

const StudyTitle = styled.p`
  color: #4f4d4b;
  font-size: 20px;
  font-weight: 500;
`;

const Middle = styled.div`
  width: 100%;
  /* display: flex; */
  /* overflow: hidden; */
`;

const MainBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;
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

// 중심 
const VideoContainer = styled.div`
  width: 90%;
  display: flex;
  /* flex-direction: column; */
  /* overflow: hidden; */
  justify-content: center;
  text-align: center;
  /* border: 2px solid lightgray; */
`;
const LeftBox = styled.div`
  /* display: flex; */
  /* flex-direction: column; */
  /* justify-content: center;
  align-items: center; */
  border-radius: 0.4rem;
  padding-right: 20px;
  background-color: #3e3d3b;
`;
const RightBox = styled.div`
  /* border: 2px solid red; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  margin-left: 50px;
  border-radius: 0.4rem;
  background-color: #fffdf6;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1),
    2px 4px 30px -4px rgb(0 0 0 / 0.1);
`;
const ConsultBox = styled.div`
  width : 90%;
  height: 350px;
  background-color: black;
  /* margin-left: 100px; */
  margin-bottom: 20px;
  margin-top: 0px;
`;
const ImageBox = styled.div`
    display: flex;
    justify-content: space-between;
    /* margin-left: 100px; */
`;
const Img = styled.img`
    width: 100px;
    height: 130px;
    margin: 0px 5px;
`;
const StreamContainerWrapper = styled.div`
  /* display: grid; */
  /* place-items: center; */
  display: flex;
  flex-direction: column;
  margin-left: 20px;
  margin-top: 10px;
  padding-top: 10px;
  ${(props) =>
    props.primary
      ? `
    grid-template-columns: repeat(3, 1fr);
    `
      : `
    grid-template-columns: repeat(4, 1fr);
    `}
  grid-gap: 20px;
  /* height: 100px;
  padding: 10px;
  @media screen and (max-width: 800px) {
    /* 카메라 뒤 흰 배경 */
    /* background-color: #ffffff; */
  /* } */
`;

const StreamContainer = styled.div`
  width: 100%;
  position: relative;
  border-radius: 5px;
  /* min-height: 34vh;
  overflow: hidden; */
  box-sizing: border-box;
  margin-bottom: 10px;
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
  height: 110%;
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
    width: 120px;
    height: 33px;
    font-size: 20px;
    border-radius: 1.2rem;
    border: 2px solid #4d4b49;
    /* background-color: #555142; */
    color: #4d4b49;
    &:hover {
    background-color: #f0aa48;
    color: #f7f5e1;
    border-color: #574934;;
    }
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
const Backdrop = styled.div`
  display  : flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.9); /* 어둡게 처리할 색상 */
  z-index: 10; /* JoinBox보다 더 위에 올라가도록 설정 */
  display: ${(props) => (props.show ? "block" : "none")}; /* show 값에 따라 표시 여부 조절 */
`;

const JoinBox = styled.div`
  display  : flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  /* width: 50%; */
  border: 2px solid;
  padding: 50px;
  width: 400px;
  border-radius: 0.5rem;
  background-color: beige;
  color: black;
  margin: auto;
  margin-top: 250px;
`;
const MarginBox = styled.div `
  height: 10px;
`;

class ViduRoom extends Component {
  constructor(props) {
    super(props);
    console.log(this.props.sessionId);
    this.userRef = React.createRef();

    this.state = {
      mySessionId: this.props.sessionId,
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
    console.log('내가 찾고싶은거', this.state.mySessionId)

    this.joinSession = this.joinSession.bind(this);
    this.leaveSession = this.leaveSession.bind(this);
    this.handleMainVideoStream = this.handleMainVideoStream.bind(this);
    this.onbeforeunload = this.onbeforeunload.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.createSessionAndGenerateURL = this.createSessionAndGenerateURL.bind(this);
  }

  render() {
    return (
      <Container>
        <Header>
          <StudyTitle>Hair Consulting</StudyTitle>
        </Header>
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
            <Backdrop show={true}>
              <JoinBox>
                <StartText style={{ color: "black" }}> 상담이 곧 시작됩니다 🙂 </StartText>
                <form
                  style={{ display: "flex", justifyContent: "center" }}
                  className="form-group"
                  onSubmit={this.joinSession}
                >
                  <p className="text-center">
                    <JoinInput
                      name="commit"
                      type="submit"
                      value="Start"
                    />
                  </p>
                </form>
              </JoinBox>
            </Backdrop>
            </div>
          ) : null}
          <MainBox>
            <VideoContainer>
              {this.state.session !== undefined ? (
                <LeftBox>
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
                      <MarginBox></MarginBox>
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
                </LeftBox>
              ) : null}
                  <RightBox>
                        <ConsultBox>

                        </ConsultBox>
                          <Hr></Hr>
                        <ImageBox>
                          <Img src="../icon/designerimg.png" alt="여기에 헤어 사진" />
                          <Img src="../icon/designerimg.png" alt="여기에 헤어 사진" />
                          <Img src="../icon/designerimg.png" alt="여기에 헤어 사진" />
                          <Img src="../icon/designerimg.png" alt="여기에 헤어 사진" />
                          <Img src="../icon/designerimg.png" alt="여기에 헤어 사진" />
                          <Img src="../icon/designerimg.png" alt="여기에 헤어 사진" />
                          <Img src="../icon/designerimg.png" alt="여기에 헤어 사진" />
                          <Img src="../icon/designerimg.png" alt="여기에 헤어 사진" />
                        </ImageBox>
                  </RightBox>
            </VideoContainer>
          </MainBox>
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
                <Link to="/designermypage"><CallEndIcon /></Link>
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
//   componentDidMount() {
//     // this.leaveSession();
//     window.addEventListener("beforeunload", this.onbeforeunload);
//     // 스터디방에서 화상회의 입장 -> props로 roomId로 받으면 세션id 업뎃 user 정보 전역변수 가져옴 -> 상태값 업뎃
//   }
async componentDidMount() {
    const sessionURL = await this.createSessionAndGenerateURL();
    // const data = props.location.state?.sessionId || "데이터 없어 세션 없어";
    // const { sessionData } = this.props.location.state;

    // if (sessionData) {
    //   this.setState({ mySessionId: sessionData.sessionId });
    // }
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
      return sessionURL;
    } catch (error) {
      // console.error('세션 생성 및 URL 생성 오류:', error);
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
      // console.log('새로운 방의 URL:', sessionURL);
      // 이후에 sessionURL을 원하는 곳으로 전달하거나 사용할 수 있습니다.
    } catch (error) {
      // console.error('방 생성 및 URL 생성 오류:', error);
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

export default ViduRoom;

