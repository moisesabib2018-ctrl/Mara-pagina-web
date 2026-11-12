import type { Channel } from "@/lib/contact";
import { Instagram, Mail, Message, Phone } from "./Icons";

export const channelIcon: Record<Channel["key"], React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
  whatsapp: Message,
  instagram: Instagram,
  email: Mail,
  phone: Phone,
};
