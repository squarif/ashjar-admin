import { Spinner } from "@chakra-ui/react";

function Loader(props) {
    //  console.log("PROPS", props);
    return (
        <div className="flex items-center justify-center h-full w-full">
            <Spinner color={props.color ? props.color : "#B0C478"} />
        </div>
    );
}

export default Loader;
