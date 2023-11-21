import { ReactComponent as PlusIcon } from "../../assets/PlusIcon.svg";
import { useEffect, useState } from "react";

import { useQuery } from "@apollo/client";
import { GET_BRANCHES } from "../../queries/branchesQueries";
import { Link } from "react-router-dom";

import { ReactComponent as ChevronRight } from "../../assets/ChevronRight.svg";
import Breadcrumbs from "../../components/Breadcrumbs";

function BranchListing() {
    let { loading, error, data } = useQuery(GET_BRANCHES);

    console.log("branches res", data);
    if (loading) return "Loading...";
    if (error) return `Error! ${error.message}`;

    const branches = data.branches || [];

    const listItems = branches.map((branch, index) => (
        <Link
            key={index}
            to={`/branches/${branch._id}`}
            className="h-[148px] w-[148px] p-6 bg-primaryLight border border-borderColor flex justify-center items-center gap-4 flex-col rounded-xl">
            <span className="text-primaryDark text-xl capitalize">{branch.name}</span>
        </Link>
    ));

    return (
        <div className="BranchListing">
            <Breadcrumbs />
            <div className="flex gap-9 flex-wrap">
                <Link
                    to="/branches/new"
                    className="h-[148px] w-[148px] bg-primary flex justify-center items-center gap-4 flex-col rounded-xl">
                    <PlusIcon className="text-white" />
                    <span className="text-white text-xl">Add Branch</span>
                </Link>

                {listItems}
            </div>
        </div>
    );
}

export default BranchListing;
