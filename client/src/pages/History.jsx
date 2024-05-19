import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import FullScreenSpinner from "../components/FullScreenSpinner";
import Spinner from "../components/Spinner";
import GameDataDisplay from "../components/history/GameDataDisplay";
import Filter from "../components/history/Filter";

const History = () => {
    const { currentUser } = useSelector((state) => state.user);
    const filterData = useSelector((state) => state.filter);

    const [userGameData, setUserGameData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showMoreLoading, setShowMoreLoading] = useState(false);
    const [showMore, setShowMore] = useState(false);

    useEffect(() => {
        fetchGameData();
    }, []);

    const fetchGameData = async () => {
        setLoading(true);
        try {
            const { data } = await axios.post(
                "/api/user/history/" + currentUser._id + "?limit=9",
                filterData
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

    const getMore = async () => {
        setShowMoreLoading(true);
        try {
            const { data } = await axios.post(
                "/api/user/history/" +
                    currentUser._id +
                    "?limit=9&startIndex=" +
                    userGameData.length,
                filterData
            );

            setUserGameData([...userGameData, ...data.gameData]);
            setShowMoreLoading(false);
            if (data.gameData.length < 9) setShowMore(false);
        } catch (error) {
            console.log(error.respone.data.message);
            setShowMoreLoading(false);
        }
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        await fetchGameData(filterData);
    };

    return (
        <div className="flex flex-col items-center justify-center w-full p-3 mx-auto">
            <h1 className="text-white text-4xl my-3">{`${currentUser.username}'s Game History`}</h1>
            {loading ? (
                <FullScreenSpinner />
            ) : !userGameData || userGameData.length < 1 ? (
                <p className="text-white text-xl">
                    You have no games completed
                </p>
            ) : (
                <>
                    <Filter onSubmit={onSubmit} disabled={loading} />
                    <div className="flex flex-col w-full items-center justify-center gap-3 p-3">
                        {userGameData.map((data) => (
                            <GameDataDisplay key={data._id} gameData={data} />
                        ))}
                    </div>
                </>
            )}

            {userGameData && showMoreLoading ? (
                <Spinner />
            ) : showMore ? (
                <p
                    className="text-white hover:underline text-xl cursor-pointer mb-3"
                    onClick={getMore}
                >
                    Show more
                </p>
            ) : (
                userGameData.length > 0 && (
                    <p className="text-white text-xl cursor-pointer mb-3">
                        {"You've reached the end!"}
                    </p>
                )
            )}
        </div>
    );
};

export default History;
