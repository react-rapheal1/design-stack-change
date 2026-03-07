import { FlagAu, FlagCa, FlagDe, FlagFr, FlagGb, FlagNg, FlagUs } from "@untitledui/country-flags";
import { Container, HelpCircle, HomeLine, LayersTwo01, LogOut01, MessageSmileCircle, Settings01, User01, UserPlus01, Users01, Zap } from "@untitledui/icons";
import type { SelectItemType } from "@/components/base/select/select";

const navItems = [
  { label: "Overview", href: "#" },
  { label: "Orders", href: "#" },
  { label: "Marketplace", href: "#" },
  { label: "Storage", href: "#" },
  { label: "Catalogs", href: "#" },
  { label: "Employees", href: "#" },
  { label: "All Equipments", href: "#" },
];
const dropdownMenuItems = [
  {
    items: [
      { label: "View profile", icon: User01, shortcut: "⌘K→P" },
      { label: "Settings", icon: Settings01, shortcut: "⌘S" },
      { label: "Keyboard shortcuts", icon: Zap, shortcut: "?" },
    ],
  },
  {
    items: [
      { label: "Company profile", icon: HomeLine, shortcut: "⌘K→C" },
      { label: "Team", icon: Users01, shortcut: "⌘K→T" },
      { label: "Invite colleagues", icon: UserPlus01, shortcut: "⌘I" },
    ],
  },
  {
    items: [
      { label: "Changelog", icon: LayersTwo01, shortcut: "⌘K→C" },
      { label: "Slack Community", icon: MessageSmileCircle, shortcut: "⌘K→S" },
      { label: "Support", icon: HelpCircle, shortcut: "⌘/" },
      { label: "API", icon: Container, shortcut: "⌘A" },
    ],
  },
  { items: [{ label: "Log out", icon: LogOut01, shortcut: "⌥⇧Q" }] },
];
const equipmentItems = [
  { id: "1", name: 'Apple MacBook Air 13" M1 Chip 8GB 256GB 2020 Model - Gray', image: "/devices/laptops/macbook.png" },
  { id: "2", name: "DELL Alienware X14 Core\u2122 I7-12700H 512GB SSD/16GB", image: "/devices/laptops/dell.png" },
  { id: "3", name: "Modern Office Table Desk Computer Table Furniture", image: "/devices/monitors/dell.png" },
  { id: "4", name: "Phone 8 - 256GB, 4G LTE, Green (Refurbished)", image: "/devices/phones/samsung.png" },
];
const countries: SelectItemType[] = [
  { id: "gb", label: "United Kingdom", icon: FlagGb },
  { id: "us", label: "United States", icon: FlagUs },
  { id: "ng", label: "Nigeria", icon: FlagNg },
  { id: "ca", label: "Canada", icon: FlagCa },
  { id: "de", label: "Germany", icon: FlagDe },
  { id: "fr", label: "France", icon: FlagFr },
  { id: "au", label: "Australia", icon: FlagAu },
];
const countryPhoneCodes: Record<string, string> = { gb: "+44", us: "+1", ng: "+234", ca: "+1", de: "+49", fr: "+33", au: "+61" };
const countryStates: Record<string, SelectItemType[]> = {
  gb: [
    { id: "england", label: "England" },
    { id: "scotland", label: "Scotland" },
    { id: "wales", label: "Wales" },
    { id: "northern-ireland", label: "Northern Ireland" },
  ],
  us: [
    { id: "al", label: "Alabama" },
    { id: "ak", label: "Alaska" },
    { id: "az", label: "Arizona" },
    { id: "ca", label: "California" },
    { id: "co", label: "Colorado" },
    { id: "fl", label: "Florida" },
    { id: "ga", label: "Georgia" },
    { id: "il", label: "Illinois" },
    { id: "ny", label: "New York" },
    { id: "nc", label: "North Carolina" },
    { id: "oh", label: "Ohio" },
    { id: "pa", label: "Pennsylvania" },
    { id: "tx", label: "Texas" },
    { id: "va", label: "Virginia" },
    { id: "wa", label: "Washington" },
  ],
  ng: [
    { id: "abuja", label: "Abuja (FCT)" },
    { id: "anambra", label: "Anambra" },
    { id: "delta", label: "Delta" },
    { id: "enugu", label: "Enugu" },
    { id: "kaduna", label: "Kaduna" },
    { id: "kano", label: "Kano" },
    { id: "lagos", label: "Lagos" },
    { id: "ogun", label: "Ogun" },
    { id: "oyo", label: "Oyo" },
    { id: "rivers", label: "Rivers" },
  ],
  ca: [
    { id: "ab", label: "Alberta" },
    { id: "bc", label: "British Columbia" },
    { id: "mb", label: "Manitoba" },
    { id: "nb", label: "New Brunswick" },
    { id: "ns", label: "Nova Scotia" },
    { id: "on", label: "Ontario" },
    { id: "qc", label: "Quebec" },
    { id: "sk", label: "Saskatchewan" },
  ],
  de: [
    { id: "bw", label: "Baden-Württemberg" },
    { id: "by", label: "Bavaria" },
    { id: "be", label: "Berlin" },
    { id: "bb", label: "Brandenburg" },
    { id: "hb", label: "Bremen" },
    { id: "hh", label: "Hamburg" },
    { id: "he", label: "Hessen" },
    { id: "nw", label: "North Rhine-Westphalia" },
    { id: "sn", label: "Saxony" },
  ],
  fr: [
    { id: "ara", label: "Auvergne-Rhône-Alpes" },
    { id: "bfc", label: "Bourgogne-Franche-Comté" },
    { id: "bre", label: "Brittany" },
    { id: "idf", label: "Île-de-France" },
    { id: "naq", label: "Nouvelle-Aquitaine" },
    { id: "occ", label: "Occitanie" },
    { id: "pdl", label: "Pays de la Loire" },
    { id: "paca", label: "Provence-Alpes-Côte d'Azur" },
  ],
  au: [
    { id: "act", label: "Australian Capital Territory" },
    { id: "nsw", label: "New South Wales" },
    { id: "nt", label: "Northern Territory" },
    { id: "qld", label: "Queensland" },
    { id: "sa", label: "South Australia" },
    { id: "tas", label: "Tasmania" },
    { id: "vic", label: "Victoria" },
    { id: "wa", label: "Western Australia" },
  ],
};
interface DeliveryInfo {
  phone: string;
  phoneCountry: string;
  country: string;
  state: string;
  address: string;
  landmark: string;
}
export { navItems, dropdownMenuItems, equipmentItems, countries, countryPhoneCodes, countryStates };
export type { DeliveryInfo };
