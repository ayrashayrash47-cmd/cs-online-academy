import {
  Calculator,
  Atom,
  FlaskConical,
  Dna,
  Cpu,
  BookOpen,
  Languages,
  Landmark,
  type LucideProps,
} from "lucide-react";

const iconMap = {
  calculator: Calculator,
  atom: Atom,
  flask: FlaskConical,
  dna: Dna,
  cpu: Cpu,
  bookOpen: BookOpen,
  languages: Languages,
  landmark: Landmark,
} as const;

export type SubjectIconName = keyof typeof iconMap;

export function SubjectIcon({
  name,
  ...props
}: { name: SubjectIconName } & LucideProps) {
  const Icon = iconMap[name];
  return <Icon {...props} />;
}
