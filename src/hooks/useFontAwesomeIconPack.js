import { useEffect, useState } from "react";
import { library } from "@fortawesome/fontawesome-svg-core";

export const useFontAwesomeIconPack = () => {
    const [iconPack, setIconPack] = useState();

    useEffect(() => {
        if (!iconPack) {
            import("@fortawesome/free-solid-svg-icons").then((module) => {
                console.log("module", module);
                //Delete problematic icons
                const fas = { ...module.fas };
                delete fas.faCookie;
                delete fas.faFontAwesomeLogoFull;

                let icons = {};
                Object.keys(fas).map((icon) => {
                    icons[fas[icon].iconName] = {
                        prefix: fas[icon].prefix,
                        icon: fas[icon].icon,
                        iconName: fas[icon].iconName,
                    };
                });

                icons = Object.values(icons).map((icon) => {
                    return {
                        prefix: icon.prefix,
                        icon: icon.icon,
                        iconName: icon.iconName,
                    };
                });
                library.add(...icons);
                setIconPack(icons);
            });
        }
    }, [iconPack]);

    return iconPack;
};
