import axios from 'axios';
import { OpenVidu } from 'openvidu-browser';
import React, { Component } from 'react';
// import './App.css';
import UserVideoComponent from './UserVideoComponent';
import { styled } from 'styled-components';
import VideocamOutlinedIcon from "@mui/icons-material/VideocamOutlined";
import MicOutlinedIcon from "@mui/icons-material/MicOutlined";
import HeadsetIcon from "@mui/icons-material/Headset";
import VideocamOffOutlinedIcon from "@mui/icons-material/VideocamOffOutlined";
import MicOffIcon from "@mui/icons-material/MicOff";
import HeadsetOffIcon from "@mui/icons-material/HeadsetOff";
import CallEndIcon from "@mui/icons-material/CallEnd";
import ChatIcon from "@mui/icons-material/Chat";
import { Link } from 'react-router-dom';

// 전체 화면
const Container = styled.div`
  /* height: 100vh; */
  width: 100%;
  background-color: #ffffff;
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
  flex-direction: column;
  /* overflow: hidden; */
  justify-content: center;
  text-align: center;
  /* border: 2px solid lightgray; */
`;
const LeftBox = styled.div`
  display: flex;
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
  /* align-items: center; */
  padding: 10px;
  margin-top: 30px;
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
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;
const Show = styled.div`
  background-color: white;
  width: 100px;
  height: 100px;
`;
const StageText = styled.div`
  font-size  : 25px;
  width: 150px;
  height: 40px;
  border: 0;
  padding-top: 5px;
  background-color: #ffc549;
  border-radius: 1rem;
  text-align: center;
  align-items: center;
`;
const RoundText = styled.div`
      font-size  : 18px;
`;
const HeartBox = styled.div`
    margin: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
`;
const Heart = styled.img`
    width: 25px;
    height: 25px;
    margin-right: 10px;
`;
const ClickNumText = styled.div`
      font-size  : 20px;
`;
const EndImageBox = styled.div`
    display: flex;
    justify-content: space-between;
    /* margin-left: 100px; */
`;
const ImgWrapper = styled.div`
  display  : flex;
  justify-content: center;
  /* justify-content: space-around; */
`;
const LeftImageBox = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 60px 100px 40px 100px;
    flex-direction: column;
    background-color: aliceblue;
    /* padding-left: 100px; */
`;
const RightImageBox = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    padding: 60px 100px 40px 100px;
    /* background-color: #c4e4d8; */
    /* margin-left: 100px; */
`;
const Img = styled.img`
    width: 100px;
    height: 130px;
    margin: 0px 5px;
`;
const EndImg = styled.img`
    width: 100%;
    height: 400px;
    margin: 0px 5px;
    animation: rotate_image 6s linear infinite;
    border-radius: 0.4rem;
    cursor: pointer;
    transition: transform 0.3s ease; /* 추가: 확대/축소에 적용할 전환 효과 */

  &:hover {
    transform: scale(1.05); /* 이미지를 조금 확대함 */
  }
`;
const WinIcon = styled.img`
    height: 50px;
    width: 50px;
`;
const ResultImg = styled.img`
    width: 100%;
  height: 350px;
  border-radius: 0.4rem;
  animation: rotate_image 6s linear infinite;
  transform-origin: 50% 50%;
  cursor: pointer;
  transition: transform 0.3s ease; /* 추가: 확대/축소에 적용할 전환 효과 */

  &:hover {
    transform: scale(1.05); /* 이미지를 조금 확대함 */
  }
`;

const StreamContainerWrapper = styled.div`
  display: grid;
  /* place-items: center; */
  /* display: flex; */
  /* flex-direction: column; */
  margin-left: 20px;
  /* margin-top: 10px; */
  padding-top: 10px;
  ${(props) =>
        props.primary
            ? `
    grid-template-columns: repeat(3, 1fr);
    `
            : `
    grid-template-columns: repeat(4, 1fr);
    `}
  /* grid-gap: 20px; */
  /* height: 100px;
  padding: 10px;
  @media screen and (max-width: 800px) {
    /* 카메라 뒤 흰 배경 */
    /* background-color: #ffffff; */
  /* } */
`;

const StreamContainer = styled.div`
  /* width: 100%; */
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
const MarginBox = styled.div`
  height: 10px;
`;

// 로컬 미디어 서버 주소
const OPENVIDU_SERVER_URL = 'https://' + 'i9b111.q.ssafy.io' + ':8443';
const OPENVIDU_SERVER_SECRET = "sunjin";

class WorldCupRoom extends Component {
    constructor(props) {
        super(props);
        console.log('으악세션', this.props.sessionId);
        console.log('이미지', this.props.resultimgs);

        this.state = {
            mySessionId: this.props.sessionId,
            myUserName: '우리친구들' + Math.floor(Math.random() * 100),
            session: undefined,
            mainStreamManager: undefined,
            publisher: undefined,
            subscribers: [], // 이녀석의 배열 크기가 쫌 중요할 듯
            isMike: true,
            isCamera: true,
            isSpeaker: true,
            isChat: false,
            resultimgs: this.props.resultimgs, // 합성 이미지 전부
            curLeftIndex: 0, // 왼쪽에 있을 사진의 인덱스
            curRightIndex: 1, // 오른쪽에 있을 사진의 인덱스
            stage: 1, // 처음에는 1스테이지겠지
            round: 1, // 처음에는 1라운드겠지 8강 - 4까지, 4강 - 2까지, 결승 - 1까지
            isClick: false, // 클릭했는지 안 했는지? 한번만 클릭할 수 있도록
            clickCount: [0, 0, 0, 0, 0, 0, 0, 0,], // 클릭 몇 번 당했는지? 클릭할때 변화, 스테이지 끝나면 초기화
            stageTwoImages: [], // 두번째 스테이지에서 쓰일 이미지들 인덱스 , 스테이지 끝나면 추가됨
            stageThreeImages: [], // 세번째 스테이지에서 쓰일 이미지들 인덱스, 스테이지 끝나면 추가됨
            LastWinImage: 0, // 최종 우승 머리, 스테이지 끝나면 추가됨
            useImages: [0, 1, 2, 3, 4, 5, 6, 7], // 첫번째 스테이지에서 쓰일 이미지들 인덱스 스테이지 끝날때마다 다른 녀석으로 바뀜
            frontUseImages: [], // 다음에 쓸게 널
            isGameOver: false,
        };

        this.joinSession = this.joinSession.bind(this);
        this.leaveSession = this.leaveSession.bind(this);
        this.switchCamera = this.switchCamera.bind(this);
        this.handleChangeSessionId = this.handleChangeSessionId.bind(this);
        this.handleChangeUserName = this.handleChangeUserName.bind(this);
        this.handleMainVideoStream = this.handleMainVideoStream.bind(this);
        this.onbeforeunload = this.onbeforeunload.bind(this);
        this.handleToggle = this.handleToggle.bind(this);
        // this.handleCustomClickEvent = this.handleCustomClickEvent.bind(this);
        this.handleWinClickEvent = this.handleWinClickEvent.bind(this);
        // this.handleCheckRound = this.handleCheckRound.bind(this);
    }

    componentDidMount() {
        window.addEventListener('beforeunload', this.onbeforeunload);
    }

    componentWillUnmount() {
        window.removeEventListener('beforeunload', this.onbeforeunload);
    }

    onbeforeunload(event) {
        this.leaveSession();
    }

    handleChangeSessionId(e) {
        this.setState({
            mySessionId: e.target.value,
        });
    }

    handleChangeUserName(e) {
        this.setState({
            myUserName: e.target.value,
        });
    }

    handleMainVideoStream(stream) {
        if (this.state.mainStreamManager !== stream) {
            this.setState({
                mainStreamManager: stream
            });
        }
    }


    // 사용자가 한 번 클릭하는 이벤트
    handleWinClickEvent(index) {
        console.log(index);
        const payload = {
            action: "winClick",
            index: index
        };
        this.state.session.signal({
            data: JSON.stringify(payload),
            to: []
        });
    }

    deleteSubscriber(streamManager) {
        let subscribers = this.state.subscribers;
        let index = subscribers.indexOf(streamManager, 0);
        if (index > -1) {
            subscribers.splice(index, 1);
            this.setState({
                subscribers: subscribers,
            });
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

    joinSession() {
        // --- 1) Get an OpenVidu object ---

        this.OV = new OpenVidu();

        // --- 2) Init a session ---

        this.setState(
            {
                session: this.OV.initSession(),
            },
            () => {
                var mySession = this.state.session;

                // --- 3) Specify the actions when events take place in the session ---

                // On every new Stream received...
                mySession.on('streamCreated', (event) => {
                    // Subscribe to the Stream to receive it. Second parameter is undefined
                    // so OpenVidu doesn't create an HTML video by its own
                    var subscriber = mySession.subscribe(event.stream, undefined);
                    var subscribers = this.state.subscribers;
                    subscribers.push(subscriber);
                    // console.log("subscriber 찾기 함수 안");
                    // console.log(subscribers);

                    // Update the state with the new subscribers
                    this.setState({
                        subscribers: subscribers,
                    });
                });
                // console.log("subscriber 찾기 함수 밖");
                // console.log(this.state.subscribers);
                // On every Stream destroyed...
                mySession.on('streamDestroyed', (event) => {

                    // Remove the stream from 'subscribers' array
                    this.deleteSubscriber(event.stream.streamManager);
                });

                // On every asynchronous exception...
                mySession.on('exception', (exception) => {
                    console.warn(exception);
                });

                // 이게 내가 수정한 코드다
                mySession.on('signal', (event) => {
                    const payload = JSON.parse(event.data);
                    if (payload.action === "winClick") {
                        let newClickCount = { ...this.state.clickCount };
                        newClickCount[payload.index] = newClickCount[payload.index] + 1;
                        this.setState({ clickCount: newClickCount });

                        // 일단 한 라운드 종료
                        if (newClickCount[payload.index] > 2) {
                            let newRound = this.state.round + 1;
                            let newCurLeftIndex = this.state.curLeftIndex + 2;
                            let newCurRightIndex = this.state.curRightIndex + 2;
                            let newStage = this.state.stage;
                            let newIsGameOver = this.state.isGameOver;
                            let newLastWinImage = this.state.LastWinImage;

                            let nextUseImages = [...this.state.useImages];
                            let nextFrontUseImages = [...this.state.frontUseImages];

                            if (newStage === 1) {
                                nextFrontUseImages.push(payload.index);
                                if (newRound === 5) {
                                    newClickCount = [0, 0, 0, 0, 0, 0, 0, 0];
                                    newRound = 1;
                                    newCurLeftIndex = 0;
                                    newCurRightIndex = 1;
                                    nextUseImages = nextFrontUseImages;
                                    nextFrontUseImages = [];
                                    newStage++;
                                }
                            }

                            else if (newStage === 2) {
                                nextFrontUseImages.push(payload.index);
                                if (newRound === 3) {
                                    newClickCount = [0, 0, 0, 0, 0, 0, 0, 0];
                                    newRound = 1;
                                    newCurLeftIndex = 0;
                                    newCurRightIndex = 1;
                                    nextUseImages = nextFrontUseImages;
                                    nextFrontUseImages = [];
                                    newStage++;
                                }
                            }
                            else if (newStage === 3) {
                                newIsGameOver = true;
                                newLastWinImage = payload.index;
                            }


                            this.setState({
                                clickCount: newClickCount,
                                round: newRound,
                                curLeftIndex: newCurLeftIndex,
                                curRightIndex: newCurRightIndex,
                                useImages: nextUseImages,
                                LastWinImage: newLastWinImage,
                                stage: newStage,
                                useImages: nextUseImages,
                                frontUseImages: nextFrontUseImages,
                                isGameOver: newIsGameOver,
                            });
                            console.log("clickCount: " , this.state.clickCount);
                            console.log("round: ", this.state.round);
                            console.log("leftIndex: ", this.state.curLeftIndex);
                            console.log("rigthIndex: ", this.state.curRightIndex);
                            console.log("useImagesIndex: ", this.state.useImages);
                            console.log("frontUseImagesIndex: ", this.state.frontUseImages);
                            console.log("stageTwoImagesIndex: ", this.state.stageTwoImages);
                            console.log("stageThreeImagesIndex: ", this.state.stageThreeImages);
                        }
                    }
                });

                // --- 4) Connect to the session with a valid user token ---

                // 'getToken' method is simulating what your server-side should do.
                // 'token' parameter should be retrieved and returned by your own backend
                this.getToken().then((token) => {
                    // First param is the token got from OpenVidu Server. Second param can be retrieved by every user on event
                    // 'streamCreated' (property Stream.connection.data), and will be appended to DOM as the user's nickname
                    mySession
                        .connect(
                            token,
                            { clientData: this.state.myUserName },
                        )
                        .then(async () => {
                            var devices = await this.OV.getDevices();
                            var videoDevices = devices.filter(device => device.kind === 'videoinput');

                            // --- 5) Get your own camera stream ---

                            // Init a publisher passing undefined as targetElement (we don't want OpenVidu to insert a video
                            // element: we will manage it on our own) and with the desired properties
                            let publisher = this.OV.initPublisher(undefined, {
                                audioSource: undefined, // The source of audio. If undefined default microphone
                                videoSource: videoDevices[0].deviceId, // The source of video. If undefined default webcam
                                publishAudio: true, // Whether you want to start publishing with your audio unmuted or not
                                publishVideo: true, // Whether you want to start publishing with your video enabled or not
                                resolution: '640x480', // The resolution of your video
                                frameRate: 30, // The frame rate of your video
                                insertMode: 'APPEND', // How the video is inserted in the target element 'video-container'
                                mirror: false, // Whether to mirror your local video or not
                            });

                            // --- 6) Publish your stream ---

                            mySession.publish(publisher);

                            // Set the main video in the page to display our webcam and store our Publisher
                            this.setState({
                                currentVideoDevice: videoDevices[0],
                                mainStreamManager: publisher,
                                publisher: publisher,
                            });
                        })
                        .catch((error) => {
                            console.log('There was an error connecting to the session:', error.code, error.message);
                        });
                });
            },
        );
    }

    leaveSession() {

        // --- 7) Leave the session by calling 'disconnect' method over the Session object ---

        const mySession = this.state.session;

        if (mySession) {
            mySession.disconnect();
        }

        // Empty all properties...
        this.OV = null;
        this.setState({
            session: undefined,
            subscribers: [],
            mySessionId: 'SessionA',
            myUserName: 'Participant' + Math.floor(Math.random() * 100),
            mainStreamManager: undefined,
            publisher: undefined,
            userType: undefined,
        });
        {/* 상담 종료 버튼 */ }

        this.props.navigate(`/`);
    }

    async switchCamera() {
        try {
            const devices = await this.OV.getDevices()
            var videoDevices = devices.filter(device => device.kind === 'videoinput');

            if (videoDevices && videoDevices.length > 1) {

                var newVideoDevice = videoDevices.filter(device => device.deviceId !== this.state.currentVideoDevice.deviceId)

                if (newVideoDevice.length > 0) {
                    // Creating a new publisher with specific videoSource
                    // In mobile devices the default and first camera is the front one
                    var newPublisher = this.OV.initPublisher(undefined, {
                        videoSource: newVideoDevice[0].deviceId,
                        publishAudio: true,
                        publishVideo: true,
                        mirror: true
                    });

                    //newPublisher.once("accessAllowed", () => {
                    await this.state.session.unpublish(this.state.mainStreamManager)

                    await this.state.session.publish(newPublisher)
                    this.setState({
                        currentVideoDevice: newVideoDevice,
                        mainStreamManager: newPublisher,
                        publisher: newPublisher,
                    });
                }
            }
        } catch (e) {
            console.error(e);
        }
    }

    render() {
        const mySessionId = this.state.mySessionId;
        const myUserName = this.state.myUserName;
        const { resultimgs } = this.state;

        return (
            <Container>
                <Header>
                    <StudyTitle>Chu WorldCup 🏆</StudyTitle>
                </Header>
                <Hr />
                <div className="container">
                    {this.state.session === undefined ? (
                        <Backdrop show={true}>
                            <JoinBox>
                                <StartText style={{ color: "black" }}> 클릭 시 월드컵에 입장합니다 🙂 </StartText>
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
                                            <StreamContainer className="stream-container col-md-6 col-xs-6" onClick={() => this.handleMainVideoStream(this.state.publisher)}>
                                                {/* 비디오 */}
                                                <UserVideoComponent
                                                    streamManager={this.state.publisher}
                                                />
                                                {/* <div>{this.state.myUserName}</div> */}
                                            </StreamContainer>
                                        ) : null}
                                        {this.state.subscribers.map((sub, i) => (
                                            <StreamContainer key={i} className="stream-container col-md-6 col-xs-6" onClick={() => this.handleMainVideoStream(sub)}>
                                                <UserVideoComponent streamManager={sub} />
                                            </StreamContainer>
                                        ))}
                                    </StreamContainerWrapper>
                                </LeftBox>
                            ) : null}
                            <RightBox>

                                {this.state.isGameOver ? (
                                    <EndImageBox>
                                        <EndImg src={`https://i9b111.q.ssafy.io/api/consulting-images/confusion/${this.state.resultimgs[this.state.LastWinImage]}`}
                                            alt="Current"
                                            // 클릭하면 박수치게
                                        />
                                        <WinIcon src="/icon/win/png"/>
                                    </EndImageBox>
                                ) : (
                                    <>
                                    {/* 월드컵 진행 과정 */}
                                        <StageText>Stage {this.state.stage}</StageText>
                                        <RoundText>Round : {this.state.round}</RoundText>
                                        <ImgWrapper>
                                        <LeftImageBox>
                                            <ResultImg 
                                            src={`https://i9b111.q.ssafy.io/api/consulting-images/confusion/${this.state.resultimgs[this.state.useImages[this.state.curLeftIndex]]}`}
                                                alt="Current"
                                                onClick={() => this.handleWinClickEvent(this.state.useImages[this.state.curLeftIndex])}
                                            />
                                            <HeartBox>
                                                <Heart src="/icon/hearto.png"></Heart>
                                                <ClickNumText>{this.state.clickCount[this.state.useImages[this.state.curLeftIndex]]}</ClickNumText>   
                                            </HeartBox>
                                        </LeftImageBox>
                                            {/* <Hr/> */}
                                        <RightImageBox>
                                            <ResultImg src={`https://i9b111.q.ssafy.io/api/consulting-images/confusion/${this.state.resultimgs[this.state.useImages[this.state.curRightIndex]]}`}
                                                alt="Current"
                                                onClick={() => this.handleWinClickEvent(this.state.useImages[this.state.curRightIndex])}
                                            />
                                            <HeartBox>
                                                <Heart src="/icon/hearto.png"></Heart>
                                                <ClickNumText>{this.state.clickCount[this.state.useImages[this.state.curRightIndex]]}</ClickNumText>
                                            </HeartBox>
                                        </RightImageBox>
                                        </ImgWrapper>
                                    </>
                                )}

                                {/* 이건 상담 코드다 */}
                                {/* <ImageBox>
                                    {this.state.targetimgs.map((imgName, index) => (
                                        <Img
                                            key={index}
                                            // src={`../img/${imgName}`}
                                            // 배열에 하나하나 이미지 이름 꺼내서 넣기
                                            src={`https://i9b111.q.ssafy.io/api/portfolio/${imgName}`}
                                            alt="여기에 헤어 사진"
                                            onClick={() => this.handleCustomClickEvent(index)
                                            } // 여기에 원하는 로직 추가
                                        />
                                    ))}

                                </ImageBox> */}
                            </RightBox>
                        </VideoContainer>
                    </MainBox>
                </div>
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

    /**
     * --------------------------
     * SERVER-SIDE RESPONSIBILITY
     * --------------------------
     * These methods retrieve the mandatory user token from OpenVidu Server.
     * This behavior MUST BE IN YOUR SERVER-SIDE IN PRODUCTION (by using
     * the API REST, openvidu-java-client or openvidu-node-client):
     *   1) Initialize a Session in OpenVidu Server	(POST /openvidu/api/sessions)
     *   2) Create a Connection in OpenVidu Server (POST /openvidu/api/sessions/<SESSION_ID>/connection)
     *   3) The Connection.token must be consumed in Session.connect() method
     */

    getToken() {
        return this.createSession(this.state.mySessionId).then((sessionId) => this.createToken(sessionId));
    }

    createSession(sessionId) {
        return new Promise((resolve, reject) => {
            var data = JSON.stringify({ customSessionId: sessionId });
            axios
                .post(OPENVIDU_SERVER_URL + '/openvidu/api/sessions', data, {
                    headers: {
                        Authorization: 'Basic ' + btoa('OPENVIDUAPP:' + OPENVIDU_SERVER_SECRET),
                        'Content-Type': 'application/json',
                    },
                })
                .then((response) => {
                    console.log('CREATE SESION', response);
                    resolve(response.data.id);
                })
                .catch((response) => {
                    var error = Object.assign({}, response);
                    if (error?.response?.status === 409) {
                        resolve(sessionId);
                    } else {
                        console.log(error);
                        console.warn(
                            'No connection to OpenVidu Server. This may be a certificate error at ' +
                            OPENVIDU_SERVER_URL,
                        );
                        if (
                            window.confirm(
                                'No connection to OpenVidu Server. This may be a certificate error at "' +
                                OPENVIDU_SERVER_URL +
                                '"\n\nClick OK to navigate and accept it. ' +
                                'If no certificate warning is shown, then check that your OpenVidu Server is up and running at "' +
                                OPENVIDU_SERVER_URL +
                                '"',
                            )
                        ) {
                            window.location.assign(OPENVIDU_SERVER_URL + '/accept-certificate');
                        }
                    }
                });
        });
    }

    createToken(sessionId) {
        return new Promise((resolve, reject) => {
            var data = {};
            axios
                .post(OPENVIDU_SERVER_URL + "/openvidu/api/sessions/" + sessionId + "/connection", data, {
                    headers: {
                        Authorization: 'Basic ' + btoa('OPENVIDUAPP:' + OPENVIDU_SERVER_SECRET),
                        'Content-Type': 'application/json',
                    },
                })
                .then((response) => {
                    console.log('TOKEN', response);
                    resolve(response.data.token);
                })
                .catch((error) => reject(error));
        });
    }
}

export default WorldCupRoom;
