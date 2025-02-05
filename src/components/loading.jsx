import { Spinner } from "@material-tailwind/react";

function Loading() {
    return (
        <div className="flex items-center justify-center w-full h-[100vh] fixed top-0 left-0 z-[5] bg-white">
            <Spinner className="w-[50px] h-[50px]" color="indigo" />
        </div>
    );
}

export default Loading;