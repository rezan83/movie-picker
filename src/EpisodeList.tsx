import React from "react";
import { IEpisode } from "./interfaces";
import star from "./star-48.png";

export default function EpisodeList(props: any) {
    const { episodes, favorites, addToggle } = props;
    return episodes.map((ep: IEpisode) => {
        let summary = "No summary avilable";
        if (ep.summary) {
            summary = ep.summary.slice(3, -4);
        }
        return (
            <li key={ep.id}>
                <img className="episode" src={ep.image.medium} alt={ep.name} />

                <h4>{ep.name}</h4>
                <p>
                    _S{ep.season}E{ep.number}_
                </p>
                <p className="summary">{summary}</p>
                <img
                    onClick={() => addToggle(ep)}
                    className={
                        favorites.includes(ep) ? "star" : "star not-favorit"
                    }
                    src={star}
                    alt="star"
                />
            </li>
        );
    });
}
