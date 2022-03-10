import { FaTimes } from "react-icons/fa";
import { Button } from "@/components/ui";
import { useDev } from "@/store/useDev";

interface FormDebugProps {
  data: object;
  actions?: {
    function: Function;
    text: string;
  }[];
}

export const FormDebug = ({ data, actions = null }: FormDebugProps) => {
  const { isDev, setIsDev } = useDev();
  return isDev ? (
    <div>
      {actions && (
        <div className="flex items-center justify-between mb-xs">
          <div>
            {actions.map((action) => (
              <Button key={action.text} onClick={action.function} small>
                {action.text}
              </Button>
            ))}
          </div>
          <div>
            <Button small danger dilute onClick={() => setIsDev(false)}>
              <FaTimes></FaTimes>
            </Button>
          </div>
        </div>
      )}
      <pre className="p-4 rounded bg-gray-900 text-gray-100 font-mono">
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  ) : (
    <></>
  );
};
