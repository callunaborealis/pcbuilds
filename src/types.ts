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

interface PowerSupply extends PCPart {
  specs: PCPart["specs"] & {
    dimensions: ThreeDimensions;
    formFactor: CPUFormFactor;
    wattage: number;
  };
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

interface StoragePCPart extends PCPart {
  specs: PCPart["specs"] & {
    /**
     * in mm
     */
    dimensions: ThreeDimensions;
  };
}

interface ThermalCompound extends PCPart {
  specs: PCPart["specs"] & {
    /**
     * in mm
     */
    thermalSolutionSpec: "PCG 2019A";
  };
}

/**
 * The socket is the component that provides the mechanical
 * and electrical connections between the processor and motherboard.
 */
type CPUSocket = "LGA 1200";

interface CPU<State> extends PCPart {
  compatibility: {
    [PCPartType.ThermalCompound]: (
      thermalComp: ThermalCompound,
      state: State
    ) => boolean;
  };
  specs: PCPart["specs"] & {
    manufacturer: "AMD" | "Intel";
    series: CPU<State>["specs"]["manufacturer"] extends "AMD"
      ? "AMD Ryzen 9"
      : "Intel Core i9";
    src: string;
    socket: CPUSocket;
  };
}

interface Memory extends PCPart {
  specs: PCPart["specs"] & {};
}

type CPUFormFactor = "ATX" | "E-ATX" | "mATX" | "mITX";

interface Motherboard<State> extends PCPart {
  compatibility: {
    [PCPartType.CPU]: (cpu: CPU<any>, state: State) => boolean;
    [PCPartType.Memory]: (m: Memory, state: State) => boolean;
  };
  specs: PCPart["specs"] & {
    /**
     * in mm
     */
    dimensions: {
      length: number;
      width: number;
    };
    formFactor: CPUFormFactor;
  };
}

interface Case<State> extends PCPart {
  compatibility: {
    [PCPartType.CPUCooler]: (cpuCooler: CPUCooler, state: State) => boolean;
    [PCPartType.VideoCard]: (gpu: VideoCard, state: State) => boolean;
    [PCPartType.Motherboard]: (m: Motherboard<any>, state: State) => boolean;
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
  CPUFormFactor,
  Memory,
  Motherboard,
  PCPart,
  PowerSupply,
  StoragePCPart,
  VideoCard,
};
