import { createAnimation } from "@ionic/angular";

export const modalEnterAnimation = (baseEl: HTMLElement) => {
  const root = baseEl.shadowRoot;

  if (root) {
    const backdropElement = root.querySelector("ion-backdrop");
    const modalElements = root.querySelectorAll(
      ".modal-wrapper, .modal-shadow"
    );

    if (backdropElement && modalElements.length > 0) {
      /* Animation for the backdrop element */
      const backdropAnimation = createAnimation()
        .addElement(backdropElement)
        .fromTo("opacity", 0.01, "var(--backdrop-opacity)")
        .beforeStyles({
          "pointer-events": "none",
        })
        .afterClearStyles(["pointer-events"]);

      /* Animation for the modal wrapper elements */
      const wrapperAnimation = createAnimation()
        .addElement(modalElements)
        .beforeStyles({ opacity: 0, transform: "translateY(0)" })
        .fromTo("opacity", 0, 1);

      /* Base animation combining backdrop and wrapper animations */
      const baseAnimation = createAnimation()
        .addElement(baseEl)
        .easing("cubic-bezier(0.32, 0.72, 0, 1)")
        .duration(400)
        .addAnimation([wrapperAnimation, backdropAnimation]);

      return baseAnimation; /* Return the animation */
    }
  }

  return undefined; /* Return undefined if required elements are not found */
};

export const modalLeaveAnimation = (baseEl: HTMLElement) => {
  const root = baseEl.shadowRoot;

  if (root) {
    const backdropElement = root.querySelector("ion-backdrop");
    const modalElements = root.querySelectorAll(
      ".modal-wrapper, .modal-shadow"
    );

    if (backdropElement && modalElements.length > 0) {
      /* Animation for the backdrop element */
      const backdropAnimation = createAnimation()
        .addElement(backdropElement)
        .fromTo("opacity", "var(--backdrop-opacity)", 0.0);

      /* Animation for the modal wrapper elements */
      const wrapperAnimation = createAnimation()
        .addElement(modalElements)
        .beforeStyles({ opacity: 0 })
        .fromTo("opacity", 1, 0);

      /* Base animation combining backdrop and wrapper animations */
      const baseAnimation = createAnimation()
        .addElement(baseEl)
        .easing("ease-out")
        .duration(300)
        .addAnimation([wrapperAnimation, backdropAnimation]);

      return baseAnimation; /* Return the animation */
    }
  }

  return undefined; /* Return undefined if required elements are not found */
};
