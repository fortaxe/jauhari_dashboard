import { Loader2 } from "lucide-react";

const CustomSpinner = () => {
    return (
        <div className="flex items-center justify-center h-screen">
            <Loader2 className="animate-spin text-orange-500 h-16 w-16" />
        </div>
    );
};

export default CustomSpinner;
