import { LoaderPinwheelIcon } from "lucide-react";

function Loading() {
  return (
    <div>
      <div className="flex flex-col justify-center items-center h-full">
        <LoaderPinwheelIcon size={30} className="animate-spin text-gray-400" />
        <span className="text-gray-400 mt-2">Loading...</span>
      </div>
    </div>
  );
}

export default Loading;
