import { CreateBriefProvider } from "./CreateBriefContext";

export default function CreateBriefLayout({ children }: { children: React.ReactNode }) {
  return <CreateBriefProvider>{children}</CreateBriefProvider>;
}
