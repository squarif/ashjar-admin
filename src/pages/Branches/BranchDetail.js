import { Link, useNavigate, useParams } from "react-router-dom";
import { ReactComponent as PlusIcon } from "../../assets/PlusIcon.svg";
import { ReactComponent as EditIcon } from "../../assets/EditIcon.svg";
import { ReactComponent as MapsIcon } from "../../assets/MapsIcon.svg";
import { ReactComponent as EyeIcon } from "../../assets/EyeIcon.svg";
import { ReactComponent as UserIcon } from "../../assets/UserIcon.svg";
import { GET_BRANCH, REMOVE_BRANCH } from "../../queries/branchesQueries";
import { useMutation, useQuery } from "@apollo/client";

import Breadcrumbs from "../../components/Breadcrumbs";
import Loader from "../../components/Loader";
import { useRecoilState } from "recoil";
import { branchData } from "../../stores/branches";
import React, { useEffect, useState } from "react";
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    AlertDialogCloseButton,
    useDisclosure,
    Button,
    useToast,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";

function BranchDetail() {
    const { id } = useParams();
    const [branch, setBranchData] = useRecoilState(branchData);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = React.useRef();
    const toast = useToast();
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [removeBranch, {}] = useMutation(REMOVE_BRANCH);
    const navigate = useNavigate();

    async function deleteBranch() {
        try {
            setDeleteLoading(true);
            const { data } = await removeBranch({
                mutation: REMOVE_BRANCH,
                variables: {
                    input: { _id: id },
                },
                // client: client,
            });

            setDeleteLoading(false);
            toast({
                title: "Branch Deleted!",
                status: "success",
            });

            navigate("/branches");
        } catch (error) {
            console.log({ error });
            toast({
                title: "Error",
                description: error.message,
                status: "error",
            });
        }
    }

    let { loading, error, data } = useQuery(GET_BRANCH, {
        variables: { id },
    });
    if (data) {
        setBranchData(data.branch);
    }

    useEffect(() => {
        if (data) {
            console.log("data", data);
        }
    }, [data]);

    if (loading)
        return (
            <div className="h-[400px]">
                <Loader />
            </div>
        );

    return (
        <div className="BranchDetail ">
            <div className="flex gap-8">
                <Breadcrumbs locationName={branch.name} id={id} />
                <Link
                    to={`/branches/${branch._id}/edit`}
                    state={branch}
                    className="p-2 active:bg-primaryLight h-fit rounded-lg"
                >
                    <EditIcon className="text-primary" />
                </Link>

                {data?.branch?.meetingRooms?.filter(m => m.isArchived === false)?.length === 0 &&
                    data?.branch?.workspaces?.filter(m => m.isArchived === false)?.length === 0 &&
                    data?.branch?.nurseries?.length === 0 && (
                        <Button
                            className=" text-primaryLight"
                            rightIcon={<DeleteIcon />}
                            colorScheme="red"
                            onClick={onOpen}
                            isLoading={false}
                        >
                            <div className=" text-primaryLight">Delete Branch</div>
                        </Button>
                    )}

                <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
                    <AlertDialogOverlay>
                        <AlertDialogContent>
                            <AlertDialogHeader fontSize="lg" fontWeight="bold">
                                Delete Branch
                            </AlertDialogHeader>

                            <AlertDialogBody>
                                Are you sure? You can't undo this action afterwards.
                            </AlertDialogBody>

                            <AlertDialogFooter>
                                <Button ref={cancelRef} onClick={onClose}>
                                    Cancel
                                </Button>
                                <Button
                                    colorScheme="red"
                                    onClick={deleteBranch}
                                    ml={3}
                                    isLoading={deleteLoading}
                                >
                                    Delete
                                </Button>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialogOverlay>
                </AlertDialog>
            </div>

            <div className="body border  justify-start rounded-xl border-borderColor py-12 px-8 shadow-xl flex flex-col gap-12">
                <div className="flex gap-2.5 items-center">
                    <MapsIcon />
                    <span className="text-dark text-lg leading-none">{branch.address}</span>
                    <EyeIcon />
                </div>

                <div className="border-t w-full h-[1px] border-borderColor"></div>

                <div className="flex flex-col gap-12">
                    <div className="meetingrooms flex flex-col pb-12 gap-8 border-b border-borderColor">
                        <div className="flex justify-between items-center">
                            <span className="font-Adam  text-2xl text-dark ">Meeting Rooms</span>
                            <Link
                                to={`/meeting-rooms/new`}
                                state={{ branch_id: branch._id }}
                                className="flex justify-center items-center gap-2 p-3 rounded-xl bg-primary"
                            >
                                <PlusIcon className="h-6 w-6 text-white" />
                                <span className="font-Adam mt-0.5 text-white font-medium text-xl leading-none">
                                    Add New
                                </span>
                            </Link>
                        </div>
                        {branch.meetingRooms?.length ? (
                            <div className="flex gap-6 overflow-auto ">
                                {branch.meetingRooms?.map((meetingRoom, index) => (
                                    <Link
                                        to={`/meeting-rooms/${meetingRoom._id}`}
                                        key={index}
                                        className="rounded-xl h-fit border border-borderColor  min-w-[302px] overflow-hidden"
                                    >
                                        <div className="relative h-[134px] overflow-hidden ">
                                            <img
                                                className="object-contain"
                                                src={meetingRoom.pictures[0]}
                                                alt="workspace"
                                            />

                                            <div className="bg-white h-[30px] flex items-center w-[164px] absolute bottom-1.5 left-1.5 rounded-xl backdrop-blur-[2px] bg-opacity-75">
                                                <span className="font-Adam text-dark text-xs px-2">
                                                    SAR {meetingRoom.ratesPerHour} / period
                                                </span>
                                            </div>
                                        </div>
                                        <div className="h-fit py-2.5 px-3 gap-1.5 flex flex-col">
                                            <span className="font-Adam w-fit text-lg text-dark">
                                                {meetingRoom.name}
                                            </span>
                                            <div className="w-fit flex gap-1 items-base">
                                                <UserIcon className="text-light h-3 w-3" />
                                                <span className="font-Adam w-fit text-left text-xs text-light">
                                                    {meetingRoom.totalSeats}
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            "No Meeting Rooms"
                        )}
                    </div>

                    <div className="workspaces flex flex-col pb-12 gap-8 border-b border-borderColor">
                        <div className="flex justify-between items-center">
                            <span className="font-Adam  text-2xl text-dark ">Workspaces</span>
                            <Link
                                to={`/workspaces/new`}
                                state={{ branch_id: branch._id }}
                                className="flex justify-center items-center gap-2 p-3 rounded-xl bg-primary"
                            >
                                <PlusIcon className="h-6 w-6 text-white" />
                                <span className="font-Adam mt-0.5 text-white text-xl font-medium leading-none">
                                    Add New
                                </span>
                            </Link>
                        </div>
                        {branch.workspaces?.length ? (
                            <div className="flex gap-6 overflow-auto ">
                                {branch.workspaces?.map((workspace, index) => (
                                    <Link
                                        to={`/workspaces/${workspace._id}`}
                                        key={index}
                                        className="rounded-xl h-fit border border-borderColor  min-w-[302px] max-w-[302px]  overflow-hidden"
                                    >
                                        <div className="relative h-[134px] overflow-hidden ">
                                            <img
                                                className="object-contain"
                                                src={workspace.pictures[0]}
                                                alt="workspace"
                                            />

                                            <div className="bg-white flex items-center h-[30px] w-[164px] absolute bottom-1.5 left-1.5 rounded-xl backdrop-blur-[2px] bg-opacity-75">
                                                <span className="font-Adam text-dark text-xs px-2">
                                                    SAR {workspace.ratesPerHour} / period
                                                </span>
                                            </div>
                                        </div>

                                        <div className="h-fit py-2.5 px-3 gap-1.5 flex flex-col">
                                            <span className="font-Adam w-fit text-lg text-dark">
                                                {workspace.name}
                                            </span>
                                            <UserIcon className="text-light h-3 w-3" />
                                            <span className="font-Adam w-fit text-left text-xs text-light">
                                                {workspace.totalSeats}
                                            </span>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            "No workspaces"
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BranchDetail;
