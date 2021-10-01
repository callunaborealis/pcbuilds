import { Cases, VideoCards } from "./parts";
import { Case, PCPart, PCPartType } from "./types";

const fractalCase: Case<typeof fractalCaseState> = Cases[0];

const checkCompatible = <
  ParentPartType extends PCPart,
  ChildPartType extends PCPart,
  S extends any
>(
  parent: ParentPartType,
  child: ChildPartType,
  childType: PCPartType,
  state: S
) => {
  const parentCompat = (
    parent as ParentPartType & {
      compatibility:
        | Partial<Record<PCPartType, (p: ChildPartType, s: S) => boolean>>
        | undefined;
    }
  ).compatibility?.[childType];
  if (!parentCompat) {
    return true;
  }
  return parentCompat(child, state);
};

const fractalCaseState: {
  hasFrontFan: boolean;
  radiators: Record<"bottom" | "front" | "rear" | "top", string | undefined>;
  hddCageInstalled: boolean;
  layoutType: "storage" | "open";
} = {
  hasFrontFan: false,
  radiators: {
    bottom: undefined,
    front: undefined,
    rear: undefined,
    top: undefined,
  },
  hddCageInstalled: false,
  layoutType: "open",
};
const isCompatible = checkCompatible(
  fractalCase,
  VideoCards[0],
  PCPartType.VideoCard,
  fractalCaseState
);

console.log("isCompatible", isCompatible);
