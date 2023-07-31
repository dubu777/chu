import React, { Component } from 'react';
import OpenViduVideoComponent from './OvVideo';
import './UserVideo.css';
import styled from 'styled-components';

const Container = styled.div`
    width:100%;
    height:100%;
`;
const Video = styled.div`
  width : 300px;
  border-radius: 0.3rem;
`;

export default class UserVideoComponent extends Component {

    getNicknameTag() {
        return JSON.parse(this.props.streamManager.stream.connection.data).clientData;
    }

    render() {
        return (
            <Container>
                {this.props.streamManager !== undefined ? (
                    <Video className="streamcomponent">
                        <OpenViduVideoComponent streamManager={this.props.streamManager} />
                        <div><p>{this.getNicknameTag()}</p></div>
                    </Video>
                ) : null}
            </Container>
        );
    }
}