import getConfig from "next/config";
import { format } from "date-fns";

import { useDev } from "@/store/useDev";

const { publicRuntimeConfig } = getConfig();

export const Footer = () => {
  const buildDateTime = format(
    new Date(publicRuntimeConfig.buildTimestamp),
    "dd.MMMMM.yy-HH.mm"
  );
  const { isDev, setIsDev } = useDev();

  return (
    <div className="space mt-base">
      {/* On triple click, enable/disable dev mode */}
      <div
        className="font-mono text-gray-500 text-sm font-medium"
        onClick={(e) => e.detail === 3 && setIsDev(!isDev)}
      >
        {buildDateTime}
      </div>
    </div>
  );
};
