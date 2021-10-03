import { CPUFormFactor, PCPartType, PowerSupply, StoragePCPart } from "./types";
import type {
  Case,
  CPU,
  CPUCooler,
  Memory,
  Motherboard,
  PCPart,
  VideoCard,
} from "./types";

const CPUs: CPU<any>[] = [
  {
    compatibility: {
      [PCPartType.ThermalCompound]: (thermalCompound) => {
        if (thermalCompound.specs.thermalSolutionSpec === "PCG 2019A") {
          return true;
        }
        return false;
      },
    },
    name: "Intel Core i9-11900K 3.7 GHz 10-Core Processor",
    specs: {
      manufacturer: "Intel",
      series: "Intel Core i9",
      socket: "LGA 1200",
      src: "https://www.intel.sg/content/www/xa/en/products/sku/212325/intel-core-i911900k-processor-16m-cache-up-to-5-30-ghz/specifications.html?countrylabel=Asia%20Pacific",
    },
    prices: [],
  },
];

const CPUCoolers: CPUCooler[] = [
  {
    name: "ARCTIC Liquid Freezer II 240 56.3 CFM Liquid CPU Cooler",
    specs: {
      dimensions: {
        // Considered for 2 fans
        fans: { length: 120, width: 120, height: 25 },
        // Without tubes
        pump: { length: 98, width: 78, height: 53 },
        radiator: { length: 277, width: 120, height: 38 },
      },
      src: "https://www2.arctic.ac/liquidfreezer2/liquid-freezer-240-en/",
    },
    prices: [],
  },
];

const Motherboards: Motherboard<any>[] = [
  {
    name: "MSI Z490-A PRO ATX LGA1200 Motherboard",
    compatibility: {
      [PCPartType.CPU]: (cpu) => {
        const supportedCPU =
          cpu.specs.manufacturer === "Intel" &&
          ["Intel Core i9"].includes(cpu.specs.series) &&
          cpu.specs.socket === "LGA 1200";
        if (supportedCPU) {
          return true;
        }
        return false;
      },
      [PCPartType.Memory]: (memory) => true,
    },
    specs: {
      /** 12 in. x 9.6 in. (30.5 cm x 24.4 cm) */
      dimensions: {
        length: 305,
        width: 244,
      },
      formFactor: "ATX",
      src: "https://www.msi.com/Motherboard/Z490-A-PRO/Specification",
    },
    prices: [
      {
        name: "Newegg",
        currency: "SGD",
        src: "https://www.newegg.com/global/sg-en/msi-z490-a-pro/p/N82E16813144306?Item=N82E16813144306&nm_mc=AFC-RAN-COM&cm_mmc=AFC-RAN-COM&utm_medium=affiliates&utm_source=afc-PCPartPicker&AFFID=2558510&AFFNAME=PCPartPicker&ACRID=1&ASID=https%3a%2f%2fsg.pcpartpicker.com%2f&ranMID=44583&ranEAID=2558510&ranSiteID=8BacdVP0GFs-kvE5iFaocm5I1lJcHaojNg",
        value: {
          base: 288.89,
          shipping: 47.05,
        },
      },
    ],
  } as Motherboard<{
    ddrSlots: [undefined, undefined, undefined, undefined];
  }>,
];

const Memories: Memory[] = [
  {
    name: "Crucial Ballistix 32 GB (2 x 16 GB) DDR4-3600 CL16 Memory",
    specs: {
      src: "#",
    },
    prices: [],
  },
];

const Storages: StoragePCPart[] = [
  {
    name: 'Western Digital Red Pro 10 TB 3.5" 7200RPM Internal Hard Drive',
    specs: {
      dimensions: {
        length: 147,
        width: 101.6,
        height: 26.1,
      },
      src: "https://shop.westerndigital.com/en-sg/products/internal-drives/wd-red-pro-sata-hdd#WD2002FFSX",
    },
    prices: [],
  },
];

const VideoCards: VideoCard[] = [
  {
    name: "Gigabyte GeForce RTX 3080 Ti 12 GB AORUS MASTER Video Card",
    specs: {
      dimensions: {
        length: 267,
        width: 120,
        height: 40,
      },
      src: "https://www.alibaba.com/product-detail/Gigabyte-Radeon-RX-6800-XT-GAMING_1600306731223.html?spm=a2700.galleryofferlist.normal_offer.d_title.3de53bb2vCkmS9",
    },
    prices: [
      {
        name: "Alibaba via Shenzhen Jingang Zhuoyue Tech Co. Ltd",
        currency: "SGD",
        src: "https://www.alibaba.com/product-detail/Gigabyte-Radeon-RX-6800-XT-GAMING_1600306731223.html?spm=a2700.galleryofferlist.normal_offer.d_title.3de53bb2vCkmS9",
        value: {
          base: 1263.63,
          shipping: 0,
        },
      },
    ],
  },
];

const Cases: Case<any>[] = [
  {
    name: "Fractal Design Define 7 Dark ATX Mid Tower Case",
    specs: {
      dimensions: {
        inner: { length: 533, width: 240, height: 475 },
        outer: { length: 547, width: 240, height: 475 },
      },
      src: "https://www.fractal-design.com/products/cases/define/define-7/black/",
    },
    compatibility: {
      [PCPartType.CPUCooler]: (cpuCooler, state) => {
        if (cpuCooler.specs.dimensions.fans.height > 185) {
          return false;
        }
        if (state.radiators.front === cpuCooler.name) {
          if (
            cpuCooler.specs.dimensions.radiator.length <= 280 &&
            cpuCooler.specs.dimensions.radiator.length >= 360
          ) {
            return false;
          }
        }
        // "Up to 360/420 mm"
        // Max 420mm - From Product Build Guide
        if (state.radiators.top === cpuCooler.name) {
          if (
            cpuCooler.specs.dimensions.radiator.length <= 360 &&
            cpuCooler.specs.dimensions.radiator.length >= 420
          ) {
            return false;
          }
        }
        if (state.radiators.rear === cpuCooler.name) {
          if (cpuCooler.specs.dimensions.radiator.length !== 120) {
            return false;
          }
        }
        if (state.radiators.bottom === cpuCooler.name) {
          if (
            cpuCooler.specs.dimensions.radiator.length <= 240 &&
            cpuCooler.specs.dimensions.radiator.length >= 280
          ) {
            return false;
          }
        }
        return true;
      },
      [PCPartType.Motherboard]: (m) => {
        if (
          m.specs.dimensions.length <= 285 &&
          m.specs.formFactor === "E-ATX"
        ) {
          return true;
        }
        if (
          (["ATX", "mATX", "mITX"] as CPUFormFactor[]).includes(
            m.specs.formFactor
          )
        ) {
          return true;
        }
        return false;
      },
      [PCPartType.PowerSupply]: (p, state) => {
        if (p.specs.formFactor === "ATX") {
          if (p.specs.dimensions.length <= 250 && state.hddCageInstalled) {
            return true; // with HDD cage installed
          }
        }
        return false;
      },
      [PCPartType.VideoCard]: (gpu, state) => {
        // Storage layout: 315 mm - Open layout: 491 mm (467 mm w/ front fan)
        const gpuIsWithinMaxLength =
          (gpu.specs.dimensions.length <= 315 &&
            state.layoutType === "storage") ||
          (gpu.specs.dimensions.length <= 467 &&
            state.layoutType === "open" &&
            state.hasFrontFan) ||
          (gpu.specs.dimensions.length <= 491 &&
            state.layoutType === "open" &&
            !state.hasFrontFan);
        return gpuIsWithinMaxLength;
      },
    },
    prices: [],
  } as Case<{
    hasFrontFan: boolean;
    radiators: Record<"bottom" | "front" | "rear" | "top", string | undefined>;
    hddCageInstalled: boolean;
    layoutType: "storage" | "open";
  }>,
];

const PowerSupplies: PowerSupply[] = [
  {
    name: "Phanteks Revolt X 1000 W 80+ Platinum Certified Fully Modular ATX Power Supply",
    specs: {
      dimensions: {
        length: 170,
        width: 150,
        height: 86,
      },
      formFactor: "ATX", // Intel ATX 12V
      wattage: 1000,
      src: "https://www.phanteks.com/Revolt-X.html",
    },
    prices: [],
  },
];

const SoundCards: PCPart[] = [
  {
    name: "Creative Labs Sound Blaster Audigy Rx 24-bit 192 kHz Sound Card",
    specs: {
      src: "#",
    },
    prices: [],
  },
];
const WiredNetworkAdapters: PCPart[] = [
  {
    name: "Asus XG-C100C PCIe x4 10 Gbit/s Network Adapter",
    specs: {
      src: "#",
    },
    prices: [],
  },
];

export {
  CPUs,
  CPUCoolers,
  Motherboards,
  Memories,
  Storages,
  VideoCards,
  Cases,
  PowerSupplies,
  SoundCards,
  WiredNetworkAdapters,
};
