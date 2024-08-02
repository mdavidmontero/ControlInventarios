import { ContentHeader } from "../atoms/ContentHeader";
import { DataUser } from "./DataUser";
export function Header({ stateConfig }) {
  return (
    <ContentHeader>
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <DataUser stateConfig={stateConfig} />
      </div>
    </ContentHeader>
  );
}
