import React from "react";
import { Store } from "./Store";
import { IEpisode, IAction } from "./interfaces";
import loading from "./windows-loading.gif";
import "./App.css";

const EpisodeList = React.lazy(() => import("./EpisodeList"));
const Fallback = (
    <div
        className="loading-img"
    >
        <img src={loading} alt="loading" />
    </div>
);

function App(): JSX.Element {
    const { state, dispatch } = React.useContext(Store);

    React.useEffect(() => {
        if (!state.episodes.length) {
            getDataAction();
        }
    });

    async function getDataAction() {
        // const url ="https://api.tvmaze.com/singlesearch/shows?q=rick-&-morty&embed=episodes";
        const url = "https://api.tvmaze.com/shows/216/episodes";
        const rowData = await fetch(url);
        const data = await rowData.json();
        return dispatch({
            type: "FETCH_DATA",
            payload: data,
        });
    }
    function addToggle(ep: IEpisode): IAction {
        let alreadyFav = state.favorites.includes(ep)

        if (alreadyFav) {
            return dispatch({
                type: "REMOVE",
                payload: ep,
            });
        } else {
            return dispatch({
                type: "ADD",
                payload: ep,
            });
        }
    }
    const props = { ...state, addToggle };
    return (
        <>
            <h1>Rick and Morty</h1>
            <p>Pick your favorit</p>

            <section>
                <ul className="listing">
                    <React.Suspense fallback={Fallback}>
                        <EpisodeList {...props} />
                    </React.Suspense>
                </ul>
            </section>
        </>
    );
}

export default App;
