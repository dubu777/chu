import { useParams } from "react-router";
import ViduRoom from "./ViduRoom";

function ViduRoomWrapper() {
    // const { id } = useParams();
    const id = '1';
    const username  = '원재현';
    const usertype  = 'designer';

    return <ViduRoom sessionId={id} userName = {username} userType ={ usertype }/>;
}

export default ViduRoomWrapper;