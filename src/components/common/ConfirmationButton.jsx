import { useState } from "react";
import { Button } from "./Button";
import { Dialog } from "./Dialog";

export function ConfirmationButton({ error, buttonText, buttonClassName, dialogText, confirmAction, confirmActionText, cancelActionText }) {
  const [showDialog, setShowDialog] = useState(false);

  const handleConfirm = () => {
    confirmAction();
    setShowDialog(false);
  };

  const handleCancel = () => {
    setShowDialog(false);
  };

  return (
    <>
      <Button onClick={() => setShowDialog(true)} className={buttonClassName}>
        {buttonText}
      </Button>
      {showDialog && error === null && (
        <Dialog dialogText={dialogText} confirmAction={handleConfirm} confirmActionText={confirmActionText} cancelAction={handleCancel} cancelActionText={cancelActionText} />
      )}
    </>
  );
}
