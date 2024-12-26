export enum MyRole {
  FURNITURE_DESIGNER = "Furniture Designer",
  THREE_D_MODELER = "3D Modeler",
  CAD_SPECIALIST = "CAD Specialist",
  PRODUCT_DESIGNER = "Product Designer",
  THREE_D_ARTIST = "3D Artist"
}

export type MyRoleType = (typeof MyRole)[keyof typeof MyRole];

export interface SelectOption {
  value: string;
  label: string;
  isNew?: boolean;
}

export interface Image {
  url: string;
  desc: string;
  alt: string;
}

export interface PortfolioItemProps {
  _id?: string;
  slug?: string;
  projectName: string;
  title: string;
  url: string;
  alt: string;
  category: ("Product Design" | "3D Rendering" | "CAD" | "Furniture Design")[];
  client: string;
  clientUrl: string;
  myRole: MyRoleType[];
  description: string;
  tags: string[];
  toolsUsed: string[];
  items: Image[];
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
  index?: number;
  className?: string;
  newlyLoadedStartIndex?: number;
  isModal?: boolean;
}

export interface ImageFile extends File {
  preview?: string;
  alt?: string;
  desc?: string;
}

export enum Tags {
  WOODWORKING = "Woodworking",
  FURNITURE_DESIGN = "Furniture Design",
  CAD_MODELING = "CAD Modeling",
  THREE_D_MODELING = "3D Modeling",
  TECHNICAL_DRAWING = "Technical Drawing",
  THREE_D_RENDERING = "3D Rendering",
  DESIGN_FOR_MANUFACTURING = "Design for Manufacturing",
  MATERIAL_SELECTION = "Material Selection",
  PROTOTYPING = "Prototyping",
  PRODUCT_DESIGN = "Product Design",
  ERGONOMICS = "Ergonomics",
  MANUFACTURING_SPECS = "Manufacturing Specs",
  UPHOLSTERY_DESIGN = "Upholstery Design",
  CUSTOM_FURNITURE = "Custom Furniture"
}

export enum Tools {
  AUTOCAD = "AutoCAD",
  THREE_DS_MAX = "3ds Max",
  VRAY = "Vray",
  AUTODESK_INVENTOR = "Autodesk Inventor",
  SOLIDWORKS = "SolidWorks",
  ADOBE_PHOTOSHOP = "Adobe Photoshop",
  ADOBE_ILLUSTRATOR = "Adobe Illustrator",
  KEYSHOT = "Keyshot"
}
