// MiniPlayerContext.js
import React, { createContext, useContext, useState } from 'react';

const MiniPlayerContext = createContext();

export const useMiniPlayer = () => {
    return useContext(MiniPlayerContext);
};

export const MiniPlayerProvider = ({ children }) => {
    const [miniPlayerVisible, setMiniPlayerVisible] = useState(false);
    const [videoUrl, setVideoUrl] = useState('');
    const playVideo = (url) => {
        setVideoUrl(url)
    };

    const pauseVideo = () => {
        setVideoUrl('');
    };
    const toggleMiniPlayer = () => {
        setMiniPlayerVisible(!miniPlayerVisible);
    };

    return (
        <MiniPlayerContext.Provider value={{ miniPlayerVisible, toggleMiniPlayer, videoUrl, playVideo, pauseVideo, setVideoUrl }}>
            {children}
        </MiniPlayerContext.Provider>
    );
};
