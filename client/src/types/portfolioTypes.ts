export interface ImageFile extends File {
  preview?: string;
  alt?: string;
  desc?: string;
}

export interface Image {
  url: string;
  desc: string;
  alt: string;
}

export interface PortfolioItem {
  _id?: string;
  projectName: string;
  title: string;
  url: string;
  alt: string;
  category: Array<
    "Product Design" | "3D Rendering" | "CAD" | "Furniture Design"
  >;
  client: string;
  clientUrl: string;
  myRole: Array<
    | "Furniture Designer"
    | "3D Modeler"
    | "CAD Specialist"
    | "Product Designer"
    | "3D Artist"
  >;
  description: string;
  tags: string[];
  toolsUsed: string[];
  items: Image[];
}

export enum MyRole {
  FURNITURE_DESIGNER = "Furniture Designer",
  THREE_D_MODELER = "3D Modeler",
  CAD_SPECIALIST = "CAD Specialist",
  PRODUCT_DESIGNER = "Product Designer",
  TEXTURE_ARTIST = "3D Artist"
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
