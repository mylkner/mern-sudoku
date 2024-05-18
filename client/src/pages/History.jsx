import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import FullScreenSpinner from "../components/FullScreenSpinner";
import Spinner from "../components/Spinner";
import GameData from "../components/GameData";

const History = () => {
    const { currentUser } = useSelector((state) => state.user);
    const [userGameData, setUserGameData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showMoreLoading, setShowMoreLoading] = useState(false);
    const [showMore, setShowMore] = useState(false);

    useEffect(() => {
        const fetchGameData = async () => {
            try {
                const { data } = await axios.get(
                    "/api/user/" + currentUser._id + "?limit=9"
                );
                setUserGameData(data.gameData);
                setLoading(false);

                if (data.gameData.length > 8) {
                    setShowMore(true);
                } else {
                    setShowMore(false);
                }
            } catch (error) {
                console.log(error.response.data.message);
                setLoading(false);
            }
        };

        fetchGameData();
    }, [currentUser._id]);

    const getMore = async () => {
        setShowMoreLoading(true);

        try {
            const { data } = await axios.get(
                "/api/user/" +
                    currentUser._id +
                    "?limit=9&startIndex=" +
                    userGameData.length
            );

            setUserGameData([...userGameData, ...data.gameData]);
            setShowMoreLoading(false);
            if (data.gameData.length < 9) setShowMore(false);
        } catch (error) {
            console.log(error.respone.data.message);
            setShowMoreLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center gap-3 w-full p-3 mx-auto">
            <h1 className="text-white text-4xl my-3">{`${currentUser.username}'s Game History`}</h1>
            {loading ? (
                <FullScreenSpinner />
            ) : !userGameData || userGameData.length < 1 ? (
                <p className="text-white text-xl">
                    You have no games completed
                </p>
            ) : (
                <div className="flex flex-col w-full items-center justify-center gap-3 p-3">
                    {userGameData.map((data) => (
                        <GameData key={data._id} gameData={data} />
                    ))}
                </div>
            )}

            {showMoreLoading ? (
                <Spinner />
            ) : showMore ? (
                <p
                    className="text-white hover:underline text-xl cursor-pointer mb-3"
                    onClick={getMore}
                >
                    Show more
                </p>
            ) : (
                <p className="text-white text-xl cursor-pointer mb-3">
                    {"You've reached the end!"}
                </p>
            )}
        </div>
    );
};

export default History;
