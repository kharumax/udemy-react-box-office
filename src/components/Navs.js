import React from "react";
import {LinkStyled, NavList} from "./Navs.styled";
import {useLocation} from "react-router-dom";

const Links = [
    {to: "/", text: "Home"},
    {to: "/starred", text: "Starred"},
];

const Navs = () => {
    const location = useLocation();

    return (
        <div>
            <NavList>
                {Links.map(item =>
                    <li key={item.to}>
                        <LinkStyled to={item.to} className={item.to === location.pathname ? "active" : "" } >{item.text}</LinkStyled>
                    </li>
                )}
            </NavList>
        </div>
    )
};

export default Navs;