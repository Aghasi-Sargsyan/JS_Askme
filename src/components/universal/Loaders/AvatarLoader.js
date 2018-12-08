import React from "react";
import ContentLoader from "react-content-loader";
import "./AvatarLoader.scss";

const AvatarLoader = props => (
    <div>
        <ContentLoader
            className="avatar__loader__img"
            height={220}
            width={220}
            speed={2}
            primaryColor="#fff"
            secondaryColor="#999"
            {...props}
        >
            <circle cx="110" cy="110" r="69.3"/>
        </ContentLoader>
    </div>
);


export default AvatarLoader;