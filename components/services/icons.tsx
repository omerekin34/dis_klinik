import {
  Activity,
  Baby,
  Bone,
  Crown,
  Droplets,
  Layers,
  Microscope,
  Moon,
  Scan,
  Shield,
  Sparkles,
  SunMedium,
} from "lucide-react";
import type { ServiceIcon } from "@/lib/treatments";

export const serviceIcons = {
  bone: Bone,
  crown: Crown,
  sun: SunMedium,
  layers: Layers,
  scan: Scan,
  sparkles: Sparkles,
  baby: Baby,
  activity: Activity,
  droplet: Droplets,
  microscope: Microscope,
  shield: Shield,
  moon: Moon,
} satisfies Record<ServiceIcon, typeof Bone>;
