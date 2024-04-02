import { Input } from "@chakra-ui/react";

function ArabicField(props) {
    return (
        <div className="flex flex-row border rounded-xl w-[630px] border-light px-4">
            <Input
                value={props.englishValue}
                placeholder={props.englishPlaceHolder}
                className="py-6 text-dark text-[24px] leading-none flex-1"
                onChange={event => props.onChangeEnglish(event.target.value)}
                variant="unstyled"
            />
            <div className="border-l border-gray-300"></div> {/* Vertical Line */}
            <Input
                value={props.arabicValue}
                placeholder={props.arabicPlaceholder}
                className="py-6 text-dark text-[24px] leading-none flex-1 text-right"
                onChange={event => props.onChangeArabic(event.target.value)}
                variant="unstyled"
                dir="rtl" // Right-to-left text direction
            />
        </div>
    );
}

export default ArabicField;
