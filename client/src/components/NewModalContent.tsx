import GalleryItem from "./GalleryItem";

interface NewModalContentProps {
  onClose: () => void;
  items: { url: string; desc: string }[];
  projectId: number;
}

const NewModalContent: React.FC<NewModalContentProps> = ({ projectId }) => {
  return (
    <div className="new-modal-content__fullscreen-wrapper">
      <GalleryItem projectId={projectId} />
    </div>
  );
};

export default NewModalContent;
