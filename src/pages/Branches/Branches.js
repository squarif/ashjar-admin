import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";
import BranchListing from "./BranchListing";
import { useLocation } from "react-router-dom";

// import firebase from "../../auth/firebase/config";

function Branches() {
    // const listItems = data.map((branch) => (
    //     <button className="h-[148px] w-[148px] bg-primaryLight border border-borderColor flex justify-center items-center gap-4 flex-col rounded-xl">
    //         <span className="text-primaryDark text-xl">{branch.title}</span>
    //     </button>
    // ));

    // let view = useState("list");

    const location = useLocation();
    console.log("location", location);

    return (
        <div className="Branches">
            <BranchListing />
        </div>
    );
}

export default Branches;
