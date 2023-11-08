import { ReactComponent as ChevronRight } from "../assets/ChevronRight.svg";

import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";

import { Link, Route, BrowserRouter as Router, Routes, useLocation } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";

function Breadcrumbs(props) {
    let location = useLocation();

    const [breadcrumbItems, setbreadcrumbItems] = useState([]);

    useEffect(() => {
        let nav = location.pathname.split("/");

        let items = nav.map((item) => {
            if (item && item !== props.id) {
                item = item.replace("-", " ");
                return item;
            }
        });

        setbreadcrumbItems(items);
    }, []);

    return (
        <Breadcrumb className="mb-12" separator={<ChevronRight className="text-dark" />}>
            {breadcrumbItems.map((item, index) =>
                item ? (
                    <BreadcrumbItem key={index}>
                        <BreadcrumbLink href={`/${item.replace(" ", "-")}`}>
                            <span className=" capitalize text-4xl leading-normal text-dark">{item}</span>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                ) : (
                    ""
                )
            )}

            {props.locationName ? (
                <BreadcrumbItem>
                    <BreadcrumbLink href="/">
                        <span className=" capitalize text-4xl leading-normal text-dark">
                            {props.locationName}
                        </span>
                    </BreadcrumbLink>
                </BreadcrumbItem>
            ) : (
                ""
            )}
        </Breadcrumb>
    );
}

export default Breadcrumbs;
