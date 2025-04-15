const GuidedTechnique = ({
  technique,
  onClose,
  onReturnToSpinner,
  onFeedbackSubmit,
}) => {
  const [showFeedback, setShowFeedback] = useState(false); // Add this

  // ... rest of the component code ...

  const renderCustomSummary = ({ resetForm }) => (
    <TechniqueSummary
      title="..."
      description="..."
      onReset={resetForm}
      onReturnToSpinner={onReturnToSpinner}
      showFeedbackOption={true}
      onShowFeedback={() => setShowFeedback(true)}
    />
  );

  return (
    <BaseTechnique
      technique={technique}
      steps={STEPS}
      onClose={onClose}
      onReturnToSpinner={onReturnToSpinner}
      onFeedbackSubmit={onFeedbackSubmit}
      renderCustomProgress={renderCustomProgress}
      renderCustomSummary={renderCustomSummary}
    />
  );
};
