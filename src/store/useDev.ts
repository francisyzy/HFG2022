import { atom, useAtom } from "jotai";

const isDevAtom = atom(
  process.browser &&
    (window.location.href.includes("dev") ||
      window.location.href.includes("localhost"))
);

export const useDev = () => {
  const [isDev, setIsDev] = useAtom(isDevAtom);

  return { isDev, setIsDev };
};
