import { useParams } from "react-router";
import ViduRoom from "./ViduRoom";

function ViduRoomWrapper() {
    const { id } = useParams();

    return <ViduRoom sessionId={id} />;
}

export default ViduRoomWrapper;