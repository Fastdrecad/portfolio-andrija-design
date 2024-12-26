import AnimatedDots from "./AnimatedDots";

interface LoadingDotsProps {
  projectName?: string;
}

const LoadingDots: React.FC<LoadingDotsProps> = ({ projectName }) => {
  return (
    <div className="loading-dots-container">
      <div className="loading-dots-wrapper">
        <AnimatedDots />

        {projectName && (
          <div className="loading-dots-text">
            Loading{projectName ? ` ${projectName}` : ""}...
          </div>
        )}
      </div>
    </div>
  );
};

export default LoadingDots;
