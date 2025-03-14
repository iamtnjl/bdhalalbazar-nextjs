import { formatDateTime } from "@/common/helpers/UtilKit";
import {
  CheckCircleIcon,
  ClockIcon,
  PlayCircleIcon,
} from "@heroicons/react/20/solid";

const StatusProgress = ({ item }) => {
  return (
    <div>
      <div className="flex justify-between items-center gap-1">
        <div className="flex items-center gap-2">
          <div>
            {item?.stage === "completed" ? (
              <>
                <CheckCircleIcon className="w-5 text-green-500" />
              </>
            ) : item?.stage === "current" ? (
              <>
                <PlayCircleIcon className="w-5 text-blue-500" />
              </>
            ) : item?.stage === "pending" ? (
              <>
                <ClockIcon className="w-5 text-gray-300" />
              </>
            ) : (
              <>
                <>
                  <ClockIcon className="w-5 text-gray-300" />
                </>
              </>
            )}
          </div>
          <h2
            className={
              item?.stage === "current"
                ? "text-sm font-semibold text-indigo-800  px-2 py-1 rounded-lg"
                : item?.stage === "pending"
                ? "text-sm font-semibold text-gray-300 px-2 py-1 rounded-lg"
                : "text-sm font-semibold text-gray-500 px-2 py-1 rounded-lg"
            }
          >
            {item?.name}
          </h2>
        </div>
        <div>
          <h2 className="text-sm font-normal text-gray-500 text-right">
            {item?.stage === "completed" ? (
              formatDateTime(item?.updatedAt, true)
            ) : (
              <p className="capitalize">{item?.stage}</p>
            )}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default StatusProgress;
