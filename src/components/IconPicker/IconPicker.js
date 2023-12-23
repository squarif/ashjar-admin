import { useEffect, useState } from "react";
import { useFontAwesomeIconPack } from "../../hooks/useFontAwesomeIconPack";
import { TextFields } from "@mui/icons-material";
import {
    Input,
    Skeleton,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    PopoverFooter,
    PopoverArrow,
    PopoverCloseButton,
    PopoverAnchor,
    Button,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconLookup, IconName, library } from "@fortawesome/fontawesome-svg-core";
import "./IconPicker.css";

const FontAwesomeIconPicker = ({ value, onChange }) => {
    const [searchText, setSearchText] = useState("");
    const iconPack = useFontAwesomeIconPack();

    if (!iconPack) {
        return "NO UCONS";
    }

    const iconsFiltered = iconPack.filter((icon) => {
        return icon.iconName.includes(searchText.toLowerCase());
    });

    return (
        <Popover>
            <PopoverTrigger>
                <Button className="!bg-white !text-mediumGray !font-normal">Select Icon</Button>
            </PopoverTrigger>
            <PopoverContent>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverHeader className="p-4">
                    <Input
                        placeholder="Search"
                        size="small"
                        variant="outlined"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                </PopoverHeader>
                <PopoverBody className="h-full max-h-[450px] flex flex-col text-dark text-base">
                    <div className="w-full flex-auto overflow-x-hidden overflow-y-auto p-3 flex flex-wrap content-start">
                        {iconsFiltered.map((icon, index) => (
                            <div className="iconPicker__iconWrapper" key={icon.iconName + index}>
                                <button
                                    className={`iconPicker__iconItem ${
                                        icon.iconName === value ? "selected" : ""
                                    }`}
                                    title={icon.iconName}
                                    onClick={() => onChange?.(icon)}>
                                    <FontAwesomeIcon icon={icon} className="text-mediumGray" />
                                </button>
                            </div>
                        ))}
                    </div>
                </PopoverBody>
            </PopoverContent>
        </Popover>
    );
};
export default FontAwesomeIconPicker;
