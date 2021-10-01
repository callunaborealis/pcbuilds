enum PCPartType {
  CPU = "cpu",
  CPUCooler = "cpuCooler",
  Motherboard = "motherboard",
  ThermalCompound = "thermalCompound",
  Memory = "memory",
  Storage = "storage",
  VideoCard = "videocard",
  Case = "case",
  PowerSupply = "powerSupply",
  OperatingSystem = "os",
  SoundCard = "soundCard",
  WiredNetworkAdapter = "wiredNetworkAdapter",
}

interface PCPart {
  name: string;
  specs: {
    src: string;
  };
  prices: {
    name: string;
    currency: "SGD";
    src: string;
    value: {
      base: number;
      shipping: number;
    };
  }[];
}

interface ThreeDimensions {
  length: number;
  width: number;
  height: number;
}

interface CPUCooler extends PCPart {
  specs: PCPart["specs"] & {
    dimensions: Record<"radiator" | "fans" | "pump", ThreeDimensions>;
  };
}
interface VideoCard extends PCPart {
  specs: PCPart["specs"] & {
    /**
     * in mm
     */
    dimensions: ThreeDimensions;
  };
}

interface CPU extends PCPart {
  specs: PCPart["specs"] & {};
}

interface Memory extends PCPart {
  specs: PCPart["specs"] & {};
}

type FormFactor = "ATX" | "E-ATX" | "mATX" | "mITX";

interface Motherboard extends PCPart {
  compatibility: {
    [PCPartType.CPU]: (m: CPU) => boolean;
    [PCPartType.Memory]: (m: Memory) => boolean;
  };
  specs: PCPart["specs"] & {
    /**
     * in mm
     */
    dimensions: {
      length: number;
      width: number;
    };
    formFactor: FormFactor;
  };
}

interface PowerSupply extends PCPart {
  specs: PCPart["specs"] & {
    dimensions: ThreeDimensions;
    formFactor: FormFactor;
  };
}

interface Case<State> extends PCPart {
  compatibility: {
    [PCPartType.CPUCooler]: (cpuCooler: CPUCooler, state: State) => boolean;
    [PCPartType.VideoCard]: (gpu: VideoCard, state: State) => boolean;
    [PCPartType.Motherboard]: (m: Motherboard, state: State) => boolean;
    [PCPartType.PowerSupply]: (m: PowerSupply, state: State) => boolean;
  };
  specs: PCPart["specs"] & {
    /**
     * Case dimensions w/o feet/protrusions/screws
     * in mm
     */
    dimensions: Record<"inner" | "outer", ThreeDimensions>;
  };
}

export { PCPartType };
export type {
  Case,
  CPU,
  CPUCooler,
  FormFactor,
  Memory,
  Motherboard,
  PCPart,
  VideoCard,
};
