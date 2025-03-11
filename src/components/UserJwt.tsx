import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function UserJwt({
  jsonData,
  altTheme: theme,
}: {
  jsonData: any;
  altTheme: boolean;
}) {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded((prev) => !prev);
  };

  const copyToClipboard = (value: string) => {
    navigator.clipboard.writeText(value);
    toast.success(`Copied: ${value}`);
  };

  const renderJson = (data: any, visited = new WeakSet()) => {
    if (typeof data !== "object" || data === null) {
      return <span className="text-blue-500">{JSON.stringify(data)}</span>;
    }

    // Prevent circular references
    if (visited.has(data)) {
      return <span className="text-red-500">[Circular]</span>;
    }
    visited.add(data);

    return Object.entries(data).map(([key, value], index) => (
      <div key={index} className="pl-4">
        <span className="text-gray-600">{key}: </span>
        {typeof value === "object" && value !== null ? (
          <div className="pl-4">{renderJson(value, visited)}</div>
        ) : (
          <span
            className={` cursor-pointer hover:underline rounded-sm px-1 hover:text-white hover:bg-indigo-400  bg-opacity-0 bg-blend-screen
                ${
                  theme
                    ? `text-yellow-300 hover:bg-orange-400`
                    : "text-blue-500"
                }
                `}
            onClick={() => copyToClipboard(String(value))}
          >
            {JSON.stringify(value)}
          </span>
        )}
      </div>
    ));
  };

  return (
    <div className="flex flex-col mx-4 items-center h-auto w-[450px] relative">
      <Toaster />
      <div
        className={` border border-gray-300 p-4 overflow-y-auto relative transition-all duration-300 ${
          expanded ? `h-[600px]` : "h-[200px]"
        }`}
      >
        <pre className="text-sm break-all whitespace-pre-wrap">
          {renderJson(jsonData)}
        </pre>
      </div>
      <button
        onClick={toggleExpand}
        className={`absolute bottom-2 right-0 -translate-x-1/2  text-white px-4 py-2 rounded-md hover:bg-blue-600 transition
            ${theme ? `hover:bg-${theme}-600` : " hover:bg-blue-600"}
            `}
      >
        {expanded ? "Collapse" : "Expand"}
      </button>
    </div>
  );
}
