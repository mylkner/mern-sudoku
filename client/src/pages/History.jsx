import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import FullScreenSpinner from "../components/FullScreenSpinner";
import GameData from "../components/GameData";

const History = () => {
    const { currentUser } = useSelector((state) => state.user);
    const [userGameData, setUserGameData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchGameData = async () => {
            try {
                const { data } = await axios.get(
                    "/api/user/" + currentUser._id
                );
                setUserGameData(data.gameData);
                setLoading(false);
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        };

        fetchGameData();
    }, []);

    return loading ? (
        <FullScreenSpinner />
    ) : (
        <div className="flex flex-col items-center justify-center gap-3 w-full p-3 mx-auto">
            <h1 className="text-white text-4xl mb-3">{`${currentUser.username}'s Game History`}</h1>
            <div className="flex flex-col-reverse w-full items-center justify-center gap-3 p-3">
                {userGameData.map((data, i) => (
                    <GameData key={data._id} index={i} gameData={data} />
                ))}
            </div>
        </div>
    );
};

export default History;
