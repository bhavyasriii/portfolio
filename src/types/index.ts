export type CaseStudy = {
  id: string;
  title: string;
  category: string;
  summary: string;
  image: string;
  route?: string;
  year: string;
};

export type InteractionStudy = {
  id: string;
  title: string;
  category: string;
  summary: string;
  videoSrc: string;
  format: "desktop" | "mobile";
};

export type MotionSectionProps = {
  interactionStudies: InteractionStudy[];
  activeStudyIndex: number;
  setActiveStudyIndex: React.Dispatch<React.SetStateAction<number>>;
  prevStudy: () => void;
  nextStudy: () => void;
};
